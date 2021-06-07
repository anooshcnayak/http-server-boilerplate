import {VError} from "@netflix/nerror";

export default class DBError extends VError {
  private errorName: string;
  private errorMsg: string;
  constructor(message: string, cause?: any) {
    super(
        {
          name: 'DBError',
          cause,
        },
        message,
    );
    this.errorName = cause.name;
    this.errorMsg = cause.message;
  }

  getName(): string {
    return this.errorName;
  }

  getMessage(): string {
    return this.errorMsg;
  }
}