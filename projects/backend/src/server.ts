import bodyParser from "body-parser";
import express from "express";

import { ServerConfigs } from "@/configs";
import { hateos, routeLog } from "@/middlewares";
import { Logger, pathFrom } from "@/utilities";

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
        Logger.get().log(
          "#3BB143",
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
    Logger.get().log("#3BB143", "Server", "Loading configurations");
    this.application.set("hostname", ServerConfigs.get().hostname);
    this.application.set("port", ServerConfigs.get().port);
    this.application.set("view engine", "hbs");
  }
  private loadMiddlewares(): void {
    Logger.get().log("#3BB143", "Server", "Loading middlewares");
    this.application.use(bodyParser.json({ limit: "50mb" }));
    this.application.use(
      bodyParser.urlencoded({ extended: true, limit: "50mb" })
    );
    this.application.use(
      "/static",
      express.static(pathFrom("../public/", import.meta.url))
    );
    this.application.use(hateos);
    this.application.use(routeLog);
  }
  private loadRoutes(): void {
    Logger.get().log("#3BB143", "Server", "Loading routes");
    const { routes } = ServerConfigs.get();
    for (const [map, route] of Object.entries(routes)) {
      if (route) this.application.use(map, route);
    }
  }
}
export default new Server().start();
