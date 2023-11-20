/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Application } from "express";
import express from "express";

import { ServerConfigs } from "@/configs";
import {
  compress,
  hateos,
  parse,
  redirect,
  routeLog,
  serve,
} from "@/middlewares";
import { Logger, pathFrom } from "@/utilities";

class Server {
  private application!: Application;
  public constructor() {
    this.application = express();
  }
  public start(callback?: () => void): void {
    this.loadConfigurations();
    this.loadDatabase();
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
    const { hostname, port } = ServerConfigs.get();

    this.application.set("hostname", hostname);
    this.application.set("port", port);
    this.application.set("view engine", "hbs");
    this.application.set("views", pathFrom("./views/", import.meta.url));
  }
  private async loadDatabase(): Promise<void> {
    Logger.get().log("#3BB143", "Server", "Loading database");
  }
  private loadMiddlewares(): void {
    Logger.get().log("#3BB143", "Server", "Loading middlewares");
    const { compressLevel, compressMemLevel, parseLimit, servePath } =
      ServerConfigs.get();

    parse(this.application, parseLimit);
    compress(this.application, compressLevel, compressMemLevel);
    serve(this.application, servePath);

    this.application.use(redirect);
    this.application.use(hateos);
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
const server = new Server();
server.start();
