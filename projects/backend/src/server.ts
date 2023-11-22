/* eslint-disable eqeqeq */
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
import { AccountModel } from "@/models";
import { Database, Logger, pathFrom } from "@/utilities";

class Server {
  private application!: Application;
  public constructor() {
    this.application = express();
  }
  public async start(callback?: () => void): Promise<void> {
    await this.loadConfigurations();
    await this.initializeDatabase();
    await this.loadMiddlewares();
    await this.loadRoutes();
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
  private async loadConfigurations(): Promise<void> {
    Logger.get().log("#3BB143", "Server", "Loading configurations");
    const { hostname, port } = ServerConfigs.get();

    this.application.set("hostname", hostname);
    this.application.set("port", port);
    this.application.set("view engine", "hbs");
    this.application.set("views", pathFrom("./views/", import.meta.url));
  }
  private async initializeDatabase(): Promise<void> {
    Logger.get().log("#3BB143", "Server", "Initializing database");
    const { databaseUser, databasePass } = ServerConfigs.get();

    const db = Database.get();
    await db.initialize().finally(async () => {
      Logger.get().log("#3BB143", "Database", "Creating account");

      const _id = AccountModel.exists({
        where: {
          email: `${databaseUser}@gmail.com`,
          password: `${databasePass}`,
          username: `${databaseUser}`,
        },
      });
      if (_id === null) {
        AccountModel.create({
          email: `${databaseUser}@gmail.com`,
          password: `${databasePass}`,
          username: `${databaseUser}`,
        });
      }
    });
  }
  private async loadMiddlewares(): Promise<void> {
    Logger.get().log("#3BB143", "Server", "Loading middlewares");
    const {
      compressLevel,
      compressMemLevel,
      hateoasOn,
      // @ts-expect-error
      hateoasPath,
      parseLimit,
      routeLogOn,
      // @ts-expect-error
      routeLogPath,
      serveOn,
      servePath,
    } = ServerConfigs.get();

    parse(this.application, parseLimit);
    compress(this.application, compressLevel, compressMemLevel);
    redirect(this.application);

    if (serveOn) serve(this.application, servePath);
    if (hateoasOn) this.application.use(hateos);
    if (routeLogOn) this.application.use(routeLog);
  }
  private async loadRoutes(): Promise<void> {
    Logger.get().log("#3BB143", "Server", "Loading routes");
    const { routes } = ServerConfigs.get();
    for (const [_map, route] of Object.entries(routes)) {
      if (route) this.application.use(route);
    }
  }
}
const server = new Server();
server.start();
