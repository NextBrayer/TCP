import * as net from "net";

const port: number = 5000;
const host: string = "127.0.0.1";

export class SerialPort {
  private connected: boolean = false;
  closeFunc: (() => void) | null = null;
  errorFunc: ((error: Error) => void) | null = null;
  connectFunc: (() => void) | null = null;
  dataFunc: ((data: string) => void) | null = null;
  private client: net.Socket;

  constructor() {
    console.log("createdInstance");
    this.client = net.connect(port, host);

    this.client.on("connect", () => {
      if (this.connectFunc !== null) this.connectFunc();
    });

    this.client.on("error", (error: Error) => {
      console.log("class", error);
      if (this.errorFunc !== null) this.errorFunc(error);
    });

    this.client.on("close", () => {
      if (this.closeFunc !== null) this.closeFunc();
    });

    this.client.on("data", (data: Buffer) => {
      if (this.dataFunc !== null) this.dataFunc(data.toString());
    });
  }

  isOpen(): boolean {
    return this.connected;
  }

  write(data: string): void {
    console.log("Sending Data", data);
    this.client.write(data);
  }

  close(): void {
    console.log("End of connection");
    this.client.end();
  }

  on(
    event: "open" | "close" | "error" | "data",
    func: (() => void) | ((error: Error) => void) | ((data: string) => void)
  ): void {
    if (event === "open") this.connectFunc = func as () => void;
    if (event === "error") this.errorFunc = func as (error: Error) => void;
    if (event === "close") this.closeFunc = func as () => void;
    if (event === "data") this.dataFunc = func as (data: string) => void;
  }
}
