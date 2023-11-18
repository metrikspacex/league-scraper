import type { Router } from "express";

import {
  accountRoutes,
  assetRoutes,
  challengeRoutes,
  healthRoutes,
  itemRoutes,
  languageRoutes,
  managementRoutes,
  masteryRoutes,
  regionRoutes,
  rootRoutes,
  runeRoutes,
  spellRoutes,
  versionRoutes,
} from "@/routes";

class ServerConfigs {
  private static readonly _env: string[] = [];
  private static readonly _hostname: string = "127.0.0.1";
  private static readonly _routes: Router[] = [
    rootRoutes,
    accountRoutes,
    assetRoutes,
    challengeRoutes,
    healthRoutes,
    itemRoutes,
    languageRoutes,
    managementRoutes,
    masteryRoutes,
    regionRoutes,
    runeRoutes,
    spellRoutes,
    versionRoutes,
  ];
  private static readonly _port: number = 3000;
  private static readonly _protocol: string = "http";
  private static readonly _version: string = "v1";
  private static instance: ServerConfigs | null = null;
  private constructor() {}
  public static get(): ServerConfigs {
    if (!ServerConfigs.instance) {
      ServerConfigs.instance = new ServerConfigs();
    }
    return ServerConfigs.instance;
  }
  public get env(): string[] {
    return ServerConfigs._env;
  }
  public get hostname(): string {
    return ServerConfigs._hostname;
  }
  public get routes(): Router[] {
    return ServerConfigs._routes;
  }
  public get port(): number {
    return ServerConfigs._port;
  }
  public get protocol(): string {
    return ServerConfigs._protocol;
  }
  public get version(): string {
    return ServerConfigs._version;
  }
}

export { ServerConfigs };
