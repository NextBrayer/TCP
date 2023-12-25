import { SerialPort } from "./SerialPort.js";
const serial = new SerialPort();

serial.on("open", function () {
  console.log("this client is connected");
});

serial.on("close", function () {
  console.log("this client is closed");
});

serial.on("error", function (error) {
  console.log("this client has error ", error);
});
