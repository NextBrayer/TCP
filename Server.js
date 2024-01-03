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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const express_1 = __importDefault(require("express"));
// host and port to run the server
const port = 5000;
const host = "127.0.0.1";
//handel express
const app = (0, express_1.default)();
app.use(express_1.default.json());
const expressPort = 3000;
let connections_number = 0;
let currentClient;
//Create the server
const server = net.createServer(onClientConnection);
server.listen(port, host, () => {
    console.log(`Server started on port ${port} at ${host}`);
});
server.maxConnections = 2;
//Declare connection listener function
function onClientConnection(sock) {
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
    connections_number++;
    console.log("connections_number opened", connections_number);
    if (connections_number > 1) {
        console.log("2 client connected");
        sock.destroy();
        return;
    }
    currentClient = sock;
    sock.on("data", (data) => {
        //Log data from the client
        console.log(`${sock.remoteAddress}:${sock.remotePort}  : ${data} `);
    });
    //Handle client connection termination.
    sock.on("close", () => {
        console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`);
        connections_number--;
        console.log("connections_number closed", connections_number);
    });
    //Handle Client connection error.
    sock.on("error", (error) => {
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
}
// handel express route
app.listen(expressPort, () => {
    console.log("express Server started at port", expressPort);
});
app.post("/send", (req, res) => {
    res.send("ok");
    console.log(req.body);
    if (currentClient)
        currentClient.write(req.body.data.toString());
});
