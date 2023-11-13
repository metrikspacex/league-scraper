import { createConnection } from "node:net";

const client = createConnection(3100, "127.0.0.1", () => {
  client.write("Hello from client");
  client.write("again again again byte hi");
});
