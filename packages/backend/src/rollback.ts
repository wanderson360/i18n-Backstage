import {
  createBackendPlugin,
  coreServices,
} from '@backstage/backend-plugin-api';
import express from 'express';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runGit(repoPath: string, args: string[]) {
  return execFileAsync('git', args, {
    cwd: repoPath,
    timeout: 60_000,
    maxBuffer: 1024 * 1024,
  });
}

async function createRouter() {
  const router = express.Router();
  router.use(express.json());

  router.post('/', async (request, response) => {
    const { repoPath, commitId, branch, tag } = request.body ?? {};

    if (
      typeof repoPath !== 'string' ||
      !repoPath.trim() ||
      typeof commitId !== 'string' ||
      !/^[0-9a-f]{7,64}$/i.test(commitId) ||
      (branch !== undefined &&
        (typeof branch !== 'string' || !branch.trim())) ||
      (tag !== undefined && (typeof tag !== 'string' || !tag.trim())) ||
      (!branch && !tag)
    ) {
      return response.status(400).json({
        message:
          'repoPath and a valid commitId are required, and branch or tag must be provided',
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

      if (tag) {
        await runGit(repoPath, ['tag', '-f', '--', tag, commitId]);
        await runGit(repoPath, [
          'push',
          '--force',
          'origin',
          '--',
          `refs/tags/${tag}`,
        ]);
      }

      return response.status(200).json({
        message: 'Rollback completed successfully',
        branch: branch || undefined,
        tag: tag || undefined,
        commitId,
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