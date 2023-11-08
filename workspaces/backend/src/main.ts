/* eslint-disable */ // <- use this if you get annoyed by eslint
                     //    until I fix it up properly
import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer } from "node:http";

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    if (request.url === "/") {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("Hello, World!");
      return;
    } else if (request.url === "/html") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Hello, World! changed again!!!!</h1>");
      return;
    } else if (request.url === "/json") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Hello, World!" }));
    }
  }
);

server.listen(3000, () => {
  console.info("Server is listening on port 3000");
});
