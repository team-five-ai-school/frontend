/** Non-2xx response from the backend. Shared by the server (`api`) and the browser (`apiClient`). */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
