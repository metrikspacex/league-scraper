import { createServer } from "node:net";

const server = createServer((socket) => {
  socket.on("data", (data) => {
    console.info("Server received data:", data.toString("utf8"));
  });
});

server.listen(3100, "127.0.0.1", () => {
  console.info("Server is listening on port 3100");
});
