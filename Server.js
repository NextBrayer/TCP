import * as net from "net";
// host and port to run the server
const port = 8080;
const host = "127.0.0.1";

let connections_number = 0;
//Create the server
const server = net.createServer(onClientConnection);

server.listen(port, host, function () {
  console.log(`Server started on port ${port} at ${host}`);
});

server.maxConnections = 1;
//Declare connection listener function
function onClientConnection(sock) {
  console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
  connections_number++;

  if (connections_number > 1) {
    console.log("2 client connected");
    sock.destroy("only one client is accepted");
  }
  sock.on("data", function (data) {
    //Log data from the client
    console.log(`${sock.remoteAddress}:${sock.remotePort}  : ${data} `);
  });

  //Handle client connection termination.
  sock.on("close", function () {
    console.log(
      `${sock.remoteAddress}:${sock.remotePort} Terminated the connection`
    );
  });

  //Handle Client connection error.
  sock.on("error", function (error) {
    console.error(
      `${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`
    );
  });
}
