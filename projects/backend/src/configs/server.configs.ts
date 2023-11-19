import dotenv from "dotenv";

import {
  accountRoutes,
  assetRoutes,
  challengeRoutes,
  healthRoutes,
  itemRoutes,
  languageRoutes,
  managementRoutes,
  masteryRoutes,
  publicRoutes,
  regionRoutes,
  rootRoutes,
  runeRoutes,
  spellRoutes,
  versionRoutes,
} from "@/routes";
import { pathFrom } from "@/utilities";

// TODO: possible make a dotenv replica -> array of strings
class ServerConfigs {
  private static _allRoutes: Routes = {
    "/api/v1": rootRoutes,
    "/api/v1/account": accountRoutes,
    "/api/v1/asset": assetRoutes,
    "/api/v1/challenge": challengeRoutes,
    "/api/v1/health": healthRoutes,
    "/api/v1/item": itemRoutes,
    "/api/v1/language": languageRoutes,
    "/api/v1/management": managementRoutes,
    "/api/v1/mastery": masteryRoutes,
    "/api/v1/public": publicRoutes,
    "/api/v1/region": regionRoutes,
    "/api/v1/rune": runeRoutes,
    "/api/v1/spell": spellRoutes,
    "/api/v1/version": versionRoutes,
  };

  private static _base: Base;
  private static _environment: Environment;
  private static _hostname: Hostname;
  private static _routes: Routes;
  private static _port: Port;
  private static _protocol: Protocol;
  private static _version: Version;
  private static instance: ServerConfigs | null = null;
  private constructor() {
    // Load environment variables
    dotenv.config({
      path: `${pathFrom(
        "../../environments/",
        import.meta.url
      )}/.env.production`,
    });

    // Set Server Configs
    ServerConfigs._base = process.env.base;
    ServerConfigs._environment = process.env.environment;
    ServerConfigs._hostname = process.env.hostname;
    ServerConfigs._port = Number(process.env.port);
    ServerConfigs._protocol = process.env.protocol;
    ServerConfigs._routes = {};
    ServerConfigs._version = process.env.version;

    // Set Routes
    ServerConfigs.setRoutes();
  }

  /**
   * @description Get the instance of ServerConfigs
   * @access public
   */
  public static get(): ServerConfigs {
    if (!ServerConfigs.instance) {
      ServerConfigs.instance = new ServerConfigs();
    }
    return ServerConfigs.instance;
  }

  /**
   * @description Set routes for the server based on the process.env.routes,
   *              filtering what is allowed to be used
   * @access private
   */
  private static setRoutes(): void {
    const { _allRoutes, _base, _routes, _version } = ServerConfigs;

    const transform = new Set(
      process.env.routes
        .trim()
        .replaceAll("  ", "")
        .split(",\n")
        .map((route) => {
          if (route === "/") return `${_base}/${_version}`;
          return `${_base}/${_version}/${route.slice(1)}`;
        })
    );

    for (const [map, route] of Object.entries(_allRoutes)) {
      if (transform.has(map)) _routes[map] = route;
    }
  }

  /**
   * @description Get the base route of the server
   * @access public
   * @example "/api"
   */
  public get base(): Base {
    return ServerConfigs._base;
  }

  /**
   * @description Set the base route of the server
   * @access private
   */
  private set base(value: Base) {
    ServerConfigs._base = value;
  }

  /**
   * @summary Get the process.env.NODE_ENV
   * @access public
   * @example
   *  | "development"
   *  | "development.local"
   *  | "production"
   *  | "production.local"
   */
  public get environment(): Environment {
    return ServerConfigs._environment;
  }

  /**
   * @access private
   * @description Set the environment of the server
   */
  private set environment(value: Environment) {
    ServerConfigs._environment = value;
  }

  /**
   * @access public
   * @description Get the hostname of the server
   * @example "localhost" -> 127.0.0.1
   */
  public get hostname(): Hostname {
    return ServerConfigs._hostname;
  }

  /**
   * @description Set the hostname of the server
   * @access private
   */
  private set hostname(value: Hostname) {
    ServerConfigs._hostname = value;
  }

  /**
   * @description Get the routes of the server
   * @access public
   * @example ["/api/v1/account", "/api/v1/asset", ...]
   */
  public get routes(): Routes {
    return ServerConfigs._routes;
  }
  private set routes(value: Routes) {
    ServerConfigs._routes = value;
  }
  public get port(): Port {
    return ServerConfigs._port;
  }
  private set port(value: Port) {
    ServerConfigs._port = value;
  }
  public get protocol(): Protocol {
    return ServerConfigs._protocol;
  }
  private set protocol(value: Protocol) {
    ServerConfigs._protocol = value;
  }
  public get version(): Version {
    return ServerConfigs._version;
  }
  private set version(value: Version) {
    ServerConfigs._version = value;
  }
}

export { ServerConfigs };
