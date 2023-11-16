import bodyParser from "body-parser";
import express from "express";

import { ServerConfigs } from "@/configs";
import { healthRoutes, userRoutes } from "@/routes";
import { Logger } from "@/utilities";

class Server {
  private readonly application: express.Application;
  private readonly hostname: string;
  private readonly port: number;

  public constructor() {
    this.application = express();
    this.hostname = ServerConfigs.get().hostname;
    this.port = ServerConfigs.get().port;
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
export default new Server().start(() => {
  Logger.get().info("Server", "Server is running");
});
