import { MissingAnnotationEmptyState } from '@backstage/core-components';
import {
  discoveryApiRef,
  fetchApiRef,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Button, MenuItem, TextField, Typography } from '@material-ui/core';
import {
  EntityArgoCDHistoryCard,
  isArgocdAvailable,
} from '@roadiehq/backstage-plugin-argo-cd';
import { useState, type FormEvent } from 'react';

type Feedback = {
  severity: 'success' | 'error';
  message: string;
};

type RollbackMode = 'reset' | 'revert';

function RollbackForm({
  repoPath,
  branch,
}: {
  repoPath: string;
  branch: string;
}) {
  const discoveryApi = useApi(discoveryApiRef);
  const fetchApi = useApi(fetchApiRef);
  const identityApi = useApi(identityApiRef);
  const [commitId, setCommitId] = useState('');
  const [mode, setMode] = useState<RollbackMode>('reset');
  const [feedback, setFeedback] = useState<Feedback>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedCommit = commitId.trim();
    if (!selectedCommit || loading) return;

    setLoading(true);
    setFeedback(undefined);

    try {
      const rollbackUrl = await discoveryApi.getBaseUrl('rollback');
      const { token } = await identityApi.getCredentials();
      const response = await fetchApi.fetch(rollbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          repoPath,
          commitId: selectedCommit,
          branch,
          mode,
        }),
      });
      const result = await response.json().catch(() => undefined);

      if (!response.ok) {
        const details =
          typeof result?.error === 'string'
            ? result.error
            : typeof result?.message === 'string'
            ? result.message
            : response.statusText || `HTTP ${response.status}`;
        throw new Error(details);
      }

      setFeedback({
        severity: 'success',
        message: `Rollback alternativo aplicado com sucesso usando ${
          mode === 'reset' ? 'reset (push --force)' : 'revert (commit novo)'
        } para commit ${selectedCommit}`,
      });
    } catch (error) {
      const details = error instanceof Error ? error.message : String(error);
      setFeedback({
        severity: 'error',
        message: `Erro ao aplicar rollback: ${details}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="argocd-rollback-title" style={{ marginTop: 24 }}>
      <Typography id="argocd-rollback-title" variant="h6" component="h2">
        Rollback alternativo
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'flex-start',
          marginTop: 16,
        }}
      >
        <TextField
          label="Commit ID"
          value={commitId}
          onChange={event => setCommitId(event.target.value)}
          required
          fullWidth
          autoComplete="off"
          style={{ flex: '1 1 280px' }}
        />
        <TextField
          select
          label="Modo de rollback"
          value={mode}
          onChange={event => setMode(event.target.value as RollbackMode)}
          disabled={loading}
          style={{ flex: '0 1 240px', minWidth: 220 }}
        >
          <MenuItem value="reset">Reset (push --force)</MenuItem>
          <MenuItem value="revert">Revert (commit novo)</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!commitId.trim() || loading}
          style={{ minHeight: 56 }}
        >
          {loading ? 'Aplicando...' : 'Rollback Alternativo'}
        </Button>
      </form>
      {feedback && (
        <Typography
          role={feedback.severity === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          color={feedback.severity === 'error' ? 'error' : 'primary'}
          style={{ marginTop: 16 }}
        >
          {feedback.message}
        </Typography>
      )}
    </section>
  );
}

export function ArgoCDPageWithRollback() {
  const { entity } = useEntity();
  const annotations = entity.metadata.annotations ?? {};
  const repoPath = annotations['argocd/repo-path'] || '/repos/minha-app';
  const branch = annotations['argocd/branch'] || 'main';

  if (!isArgocdAvailable(entity)) {
    return <MissingAnnotationEmptyState annotation="argocd/app-name" />;
  }

  return (
    <>
      <EntityArgoCDHistoryCard />
      <RollbackForm repoPath={repoPath} branch={branch} />
    </>
  );
}
