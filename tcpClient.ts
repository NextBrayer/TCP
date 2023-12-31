import { SerialPort } from "./SerialPort";

const serial = new SerialPort();

serial.on("open", () => {
  console.log("this client is connected");
});

serial.on("close", () => {
  console.log("this client is closed");
});

serial.on("error", (error: Error) => {
  console.log("this client has error ", error);
});

serial.on("data", (data: string) => {
  console.log("this client received :", data);
  return;
});
