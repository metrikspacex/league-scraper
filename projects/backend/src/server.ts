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
import {
  Database,
  dataDragonSyncChampionsToDatabase,
  dataDragonSyncLanguagesToDatabase,
  dataDragonSyncVersionsToDatabase,
  leagueScraperSyncAccountsToDatabase,
  Logger,
  pathFrom,
} from "@/utilities";

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
    Logger.get().log("Server", "Loading configurations");
    const { hostname, port } = ServerConfigs.get();

    this.application.set("hostname", hostname);
    this.application.set("port", port);
    this.application.set("view engine", "hbs");
    this.application.set("views", pathFrom("./views/", import.meta.url));
  }

  private async initializeDatabase(): Promise<void> {
    Logger.get().log("Database", "Initializing database");
    await Database.get().initialize();

    const healthDatabase = {
      account: true,
      asset: false,
      challenge: false,
      champion: true,
      health: true,
      item: false,
      language: true,
      management: false,
      mastery: false,
      region: false,
      role: false,
      rune: false,
      spell: false,
      version: true,
    };

    Logger.get().log("Database", "Syncing accounts");
    healthDatabase.account = await leagueScraperSyncAccountsToDatabase();

    Logger.get().log("Database", "Syncing champions");
    healthDatabase.champion = await dataDragonSyncChampionsToDatabase();

    Logger.get().log("Database", "Syncing languages");
    healthDatabase.language = await dataDragonSyncLanguagesToDatabase();

    Logger.get().log("Database", "Syncing versions");
    healthDatabase.version = await dataDragonSyncVersionsToDatabase();
  }

  private async loadMiddlewares(): Promise<void> {
    Logger.get().log("Server", "Loading middlewares");
    const {
      base,
      compressLevel,
      compressMemLevel,
      compressOn,
      hateoasOn,
      hateoasPath,
      parseLimit,
      parseOn,
      redirectOn,
      routeLogOn,
      routeLogPath,
      serveOn,
      servePath,
      version,
    } = ServerConfigs.get();

    if (compressOn)
      compress(this.application, {
        level: compressLevel,
        memLevel: compressMemLevel,
      });

    if (parseOn)
      parse(this.application, {
        extended: true,
        limit: parseLimit,
      });

    if (serveOn)
      serve(this.application, {
        path: servePath,
      });

    if (redirectOn)
      redirect(this.application, {
        from: `${base}/${version}`,
        to: `${base}/${version}`,
      });

    if (hateoasOn)
      hateos(this.application, {
        path: hateoasPath,
      });

    if (routeLogOn)
      routeLog(this.application, {
        path: routeLogPath,
      });
  }

  private async loadRoutes(): Promise<void> {
    Logger.get().log("Server", "Loading routes");
    const { routes } = ServerConfigs.get();
    for (const [_map, route] of Object.entries(routes)) {
      if (route) this.application.use(route);
    }
  }
}

const server = new Server();
server.start();
