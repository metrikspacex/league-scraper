import bodyParser from "body-parser";
import compression from "compression";
import express from "express";

import { ServerConfigs } from "@/configs";
import { hateos, redirect, routeLog } from "@/middlewares";
import { Logger, pathFrom } from "@/utilities";

class Server {
  private application!: express.Application;
  public constructor() {
    this.application = express();
  }
  public start(callback?: () => void): void {
    this.loadConfigurations();
    this.loadMiddlewares();
    this.loadRoutes();
    this.loadDatabase();
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
    const { hostname, port } = ServerConfigs.get();

    this.application.set("hostname", hostname);
    this.application.set("port", port);
    this.application.set("view engine", "hbs");
    this.application.set("views", pathFrom("./views/", import.meta.url));
  }
  private loadDatabase(): void {
    //
  }
  private loadMiddlewares(): void {
    Logger.get().log("#3BB143", "Server", "Loading middlewares");
    const { base, version } = ServerConfigs.get();

    this.application.use(bodyParser.json({ limit: "50mb" }));
    this.application.use(
      bodyParser.urlencoded({ extended: true, limit: "50mb" })
    );
    this.application.use(compression);

    this.application.use(
      "/static",
      express.static(pathFrom("../public/", import.meta.url))
    );

    this.application.use(`${base}/${version}`, hateos);
    this.application.use(redirect);
    this.application.use(routeLog);
  }
  private loadRoutes(): void {
    Logger.get().log("#3BB143", "Server", "Loading routes");
    const { routes } = ServerConfigs.get();
    for (const [_map, route] of Object.entries(routes)) {
      if (route) this.application.use(route);
    }
  }
}
export default new Server().start();
