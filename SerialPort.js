import * as net from "net";
const port = 8080;
const host = "127.0.0.1";

export class SerialPort {
  connected = false;
  closeFunc = null;
  errorFunc = null;
  connectFunc = null;

  constructor() {
    console.log("createdInstance");
    this.client = net.connect(port, host);

    this.client.on("connect", () => {
      if (this.connectFunc != null) this.connectFunc();
    });

    this.client.on("error", (error) => {
      console.log("class", error);
      if (this.errorFunc != null) this.errorFunc(error);
    });

    this.client.on("close", () => {
      if (this.closeFunc != null) this.closeFunc();
    });
  }

  isOpen() {
    return this.connected;
  }

  write(data) {
    console.log("Sending Data", data);
    this.client.write(data);
  }

  close() {
    console.log("End of connection");
    this.client.end();
  }

  on(params, func) {
    if (params === "open") this.connectFunc = func;
    if (params === "error") this.errorFunc = func;
    if (params === "close") this.closeFunc = func;
  }
}
