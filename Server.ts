import * as net from "net";
import express from "express";

// host and port to run the server
const port: number = 5000;
const host: string = "127.0.0.1";

//handel express
const app = express();
app.use(express.json());
const expressPort = 3000;

let connections_number: number = 0;
let currentClient: net.Socket;
//Create the server
const server = net.createServer(onClientConnection);

server.listen(port, host, () => {
  console.log(`Server started on port ${port} at ${host}`);
});

server.maxConnections = 1;
//Declare connection listener function
function onClientConnection(sock: net.Socket) {
  console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
  connections_number++;
  currentClient = sock;
  console.log("connections_number opened", connections_number);
  if (connections_number > 1) {
    console.log("2 client connected");
    sock.destroy();
  }
  sock.on("data", (data: any) => {
    //Log data from the client
    console.log(`${sock.remoteAddress}:${sock.remotePort}  : ${data} `);
  });

  //Handle client connection termination.
  sock.on("close", () => {
    console.log(
      `${sock.remoteAddress}:${sock.remotePort} Terminated the connection`
    );
    connections_number--;
    console.log("connections_number closed", connections_number);
  });

  //Handle Client connection error.
  sock.on("error", (error: Error) => {
    console.error(
      `${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`
    );
  });
}

// handel express route

app.listen(expressPort, () => {
  console.log("express Server started at port", expressPort);
});

app.post("/send", (req: express.Request, res: express.Response) => {
  res.send("ok");
  console.log(req.body);
  if (currentClient) currentClient.write(req.body.data.toString());
});
