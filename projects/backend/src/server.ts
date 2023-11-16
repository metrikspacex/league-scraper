import bodyParser from "body-parser";
import express from "express";

import { healthRoutes, userRoutes } from "@/routes";
import { Logger } from "@/utilities";

class Server {
  private readonly application: express.Application;
  private readonly hostname: string;
  private readonly port: number;

  public constructor(host: string, port: number) {
    this.application = express();
    this.hostname = host;
    this.port = port;
  }
  public start(callback: () => void): void {
    this.loadConfigurations();
    this.loadMiddlewares();
    this.loadRoutes();
    this.application.listen(this.port, this.hostname, callback);
  }
  private loadConfigurations(): void {
    Logger.get().info("Server", "Loading configurations");
  }
  private loadMiddlewares(): void {
    Logger.get().info("Server", "Loading middlewares");
    this.application.use(bodyParser.json({ limit: "50mb" }));
  }
  private loadRoutes(): void {
    Logger.get().info("Server", "Loading routes");
    this.application.get("/", healthRoutes);
    this.application.use("/user", userRoutes);
  }
}
export default new Server("127.0.0.1", 3100).start(() => {
  Logger.get().info("Server", "Server is running");
});
