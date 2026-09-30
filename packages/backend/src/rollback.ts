import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import express from 'express';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runGit(repoPath: string, args: string[]) {
  const command = `git ${args.join(' ')}`;
  console.log(`[rollback] Running ${command} in ${repoPath}`);

  try {
    const result = await execFileAsync('git', args, {
      cwd: repoPath,
      timeout: 60_000,
      maxBuffer: 1024 * 1024,
    });
    console.log(`[rollback] Completed ${command}`, {
      stdout: result.stdout.trim(),
      stderr: result.stderr.trim(),
    });
    return result;
  } catch (error) {
    const commandError = error as NodeJS.ErrnoException & {
      stderr?: string;
    };
    console.error(`[rollback] Failed ${command}`, {
      error: commandError.stderr?.trim() || commandError.message,
    });
    throw error;
  }
}

async function rollbackWithReset(
  repoPath: string,
  branch: string,
  commitId: string,
) {
  await runGit(repoPath, ['checkout', branch]);
  await runGit(repoPath, ['reset', '--hard', commitId]);
  await runGit(repoPath, [
    'push',
    '--force',
    'origin',
    '--',
    `refs/heads/${branch}:refs/heads/${branch}`,
  ]);
}

async function rollbackWithRevert(
  repoPath: string,
  branch: string,
  commitId: string,
) {
  await runGit(repoPath, ['checkout', branch]);
  await runGit(repoPath, ['revert', '--no-commit', commitId]);
  await runGit(repoPath, ['commit', '-m', `Rollback para commit ${commitId}`]);
  await runGit(repoPath, ['push', 'origin', branch]);
}

async function rollbackTag(repoPath: string, tag: string, commitId: string) {
  await runGit(repoPath, ['tag', '-f', '--', tag, commitId]);
  await runGit(repoPath, [
    'push',
    '--force',
    'origin',
    '--',
    `refs/tags/${tag}`,
  ]);
}

async function createRouter() {
  const router = express.Router();
  router.use(express.json());

  router.post('/', async (request, response) => {
    const {
      repoPath,
      commitId,
      branch,
      tag,
      mode: requestedMode,
    } = request.body ?? {};
    const mode = requestedMode === undefined ? 'reset' : requestedMode;

    if (
      typeof repoPath !== 'string' ||
      !repoPath.trim() ||
      typeof commitId !== 'string' ||
      !/^[0-9a-f]{7,64}$/i.test(commitId) ||
      (mode !== 'reset' && mode !== 'revert') ||
      (mode === 'revert' && !branch) ||
      (branch !== undefined &&
        (typeof branch !== 'string' || !branch.trim())) ||
      (tag !== undefined && (typeof tag !== 'string' || !tag.trim())) ||
      (!branch && !tag)
    ) {
      return response.status(400).json({
        message:
          'repoPath and a valid commitId are required; branch or tag must be provided; mode must be reset or revert, and revert requires a branch',
      });
    }

    try {
      await runGit(repoPath, ['cat-file', '-e', `${commitId}^{commit}`]);

      if (branch) {
        await runGit(repoPath, ['check-ref-format', '--branch', branch]);
      }
      if (tag) {
        await runGit(repoPath, ['check-ref-format', `refs/tags/${tag}`]);
      }

      if (branch) {
        if (mode === 'reset') {
          await rollbackWithReset(repoPath, branch, commitId);
        } else {
          await rollbackWithRevert(repoPath, branch, commitId);
        }
      }

      if (tag) {
        await rollbackTag(repoPath, tag, commitId);
      }

      return response.status(200).json({
        message: `Rollback completed successfully using ${mode} mode for commit ${commitId}${
          branch ? ` on branch ${branch}` : ''
        }${tag ? ` and tag ${tag}` : ''}`,
        branch: branch || undefined,
        tag: tag || undefined,
        commitId,
        mode,
      });
    } catch (error) {
      const commandError = error as NodeJS.ErrnoException & {
        stderr?: string;
      };

      return response.status(500).json({
        message: 'Rollback failed',
        error: commandError.stderr?.trim() || commandError.message,
      });
    }
  });

  return router;
}

export const rollbackPlugin = createBackendPlugin({
  pluginId: 'rollback',
  register(env) {
    env.registerInit({
      deps: { httpRouter: coreServices.httpRouter },
      async init({ httpRouter }) {
        httpRouter.use(
          (await createRouter()) as unknown as Parameters<
            typeof httpRouter.use
          >[0],
        );
      },
    });
  },
});
