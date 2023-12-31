"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerialPort_1 = require("./SerialPort");
const serial = new SerialPort_1.SerialPort();
serial.on("open", () => {
    console.log("this client is connected");
});
serial.on("close", () => {
    console.log("this client is closed");
});
serial.on("error", (error) => {
    console.log("this client has error ", error);
});
serial.on("data", (data) => {
    console.log("this client received :", data);
    return;
});
