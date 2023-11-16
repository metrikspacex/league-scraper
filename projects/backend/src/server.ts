import bodyParser from "body-parser";
import express from "express";

import { ServerConfigs } from "@/configs";
import { hateos } from "@/middlewares";
import {
  healthRoutes,
  managementRoutes,
  rootRoutes,
  userRoutes,
} from "@/routes";
import { Logger } from "@/utilities";

class Server {
  private readonly application: express.Application;

  public constructor() {
    this.application = express();
  }
  public start(callback?: () => void): void {
    this.loadConfigurations();
    this.loadMiddlewares();
    this.loadRoutes();
    this.application.listen(
      this.application.get("port"),
      this.application.get("hostname"),
      () => {
        Logger.get().info(
          "Server",
          `Server is running ${this.application.get(
            "hostname"
          )}:${this.application.get("port")}`
        );
        if (callback) callback();
      }
    );
  }
  private loadConfigurations(): void {
    Logger.get().info("Server", "Loading configurations");
    this.application.set("hostname", ServerConfigs.get().hostname);
    this.application.set("port", ServerConfigs.get().port);
  }
  private loadMiddlewares(): void {
    Logger.get().info("Server", "Loading middlewares");
    this.application.use(bodyParser.json({ limit: "50mb" }));
    this.application.use(
      bodyParser.urlencoded({ extended: true, limit: "50mb" })
    );
    this.application.use("/*", hateos);
  }
  private loadRoutes(): void {
    Logger.get().info("Server", "Loading routes");
    this.application.use("/", rootRoutes);
    this.application.use("/health", healthRoutes);
    this.application.use("/management", managementRoutes);
    this.application.use("/user", userRoutes);
  }
}
export default new Server().start();
