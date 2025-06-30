export interface GetHealthStatusOutput {
  status: string;
  timestamp: string;
}

export function getHealthStatusUseCase(): GetHealthStatusOutput {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
