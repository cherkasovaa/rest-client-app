export const formatDuration = (ms: number) => {
  if (ms < 1000) {
    return `${ms} ms`;
  }

  return `${(ms / 1000).toFixed()} s`;
};
