class Exception extends Error {
  error: Error;

  constructor(msg: string, error: Error) {
    super(msg);
    this.error = error;
  }
}
