type dataResponse = object | null;

export default class ResponseData {
  private success;
  private payload;
  private error;

  constructor(success: boolean, payload: dataResponse, error: dataResponse) {
    this.success = success;
    this.payload = payload;
    this.error = error;
  }

  getResponse() {
    return {
      success: this.success,
      payload: this.payload,
      error: this.error,
    };
  }
}
