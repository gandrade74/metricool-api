import { v4 as uuidv4 } from 'uuid';

export default class CustomError {
  constructor(type, messages, exception) {
    this.id = uuidv4();
    this.type = type;
    this.messages = Array.isArray(messages) ? messages : [messages];
    this.exception = exception;
  }

  log() {
    console.error({ errorId: this.id, exception: this.exception });
  }
}
