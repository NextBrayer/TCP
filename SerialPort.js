"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerialPort = void 0;
const net = __importStar(require("net"));
const port = 5000;
const host = "127.0.0.1";
class SerialPort {
    constructor() {
        this.connected = false;
        this.closeFunc = null;
        this.errorFunc = null;
        this.connectFunc = null;
        this.dataFunc = null;
        console.log("createdInstance");
        this.client = net.connect(port, host);
        this.client.on("connect", () => {
            if (this.connectFunc !== null)
                this.connectFunc();
        });
        this.client.on("error", (error) => {
            console.log("class", error);
            if (this.errorFunc !== null)
                this.errorFunc(error);
        });
        this.client.on("close", () => {
            if (this.closeFunc !== null)
                this.closeFunc();
        });
        this.client.on("data", (data) => {
            if (this.dataFunc !== null)
                this.dataFunc(data.toString());
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
    on(event, func) {
        if (event === "open")
            this.connectFunc = func;
        if (event === "error")
            this.errorFunc = func;
        if (event === "close")
            this.closeFunc = func;
        if (event === "data")
            this.dataFunc = func;
    }
}
exports.SerialPort = SerialPort;
