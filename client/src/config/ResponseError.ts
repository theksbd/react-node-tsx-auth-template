class ResponseError extends Error {
  response: Response;

  constructor(message: string | undefined, response: Response) {
    super(message);
    this.response = response;
  }
}

export default ResponseError;
