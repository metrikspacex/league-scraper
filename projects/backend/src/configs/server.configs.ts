import dotenv from "dotenv";

import {
  accountRoutes,
  assetRoutes,
  challengeRoutes,
  championRoutes,
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

const a: Routes = {
  "/api/v1": rootRoutes,
};
console.log(a);

class ServerConfigs {
  private static instance: ServerConfigs | null = null;
  private static _allRoutes: Routes = {
    "/api/v1": rootRoutes,
    "/api/v1/account": accountRoutes,
    "/api/v1/asset": assetRoutes,
    "/api/v1/challenge": challengeRoutes,
    "/api/v1/champion": championRoutes,
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
  private static _compressLevel: CompressLevel;
  private static _compressMemLevel: CompressMemLevel;
  private static _databasePass: DatabasePass;
  private static _databaseURL: DatabaseURL;
  private static _databaseUser: DatabaseUser;
  private static _environment: Environment;
  private static _hateoas: Hateoas;
  private static _hateoasPath: HateoasPath;
  private static _hostname: Hostname;
  private static _parseLimit: ParseLimit;
  private static _port: Port;
  private static _protocol: Protocol;
  private static _routeLog: RouteLog;
  private static _routeLogPath: RouteLogPath;
  private static _routes: Routes;
  private static _serve: Serve;
  private static _servePath: ServePath;
  private static _version: Version;
  private constructor() {
    // Load environment variables
    dotenv.config({
      path: `${pathFrom(
        "../../environments/",
        import.meta.url
      )}/.env.development.local`,
    });

    // Set Server Configs
    ServerConfigs._base = process.env.base;
    ServerConfigs._compressLevel = Number(
      process.env.compressLevel
    ) as CompressLevel;
    ServerConfigs._compressMemLevel = Number(
      process.env.compressMemLevel
    ) as CompressMemLevel;
    ServerConfigs._databasePass = String(process.env.databasePass);
    ServerConfigs._databaseURL = String(process.env.databaseURL) as DatabaseURL;
    ServerConfigs._databaseUser = String(process.env.databaseUser);
    ServerConfigs._environment = String(process.env.environment) as Environment;
    ServerConfigs._hateoas = Boolean(process.env.hateoas);
    ServerConfigs._hostname = String(process.env.hostname);
    ServerConfigs._parseLimit = String(process.env.parseLimit) as ParseLimit;
    ServerConfigs._port = Number(process.env.port);
    ServerConfigs._protocol = String(process.env.protocol) as Protocol;
    ServerConfigs._routeLog = Boolean(process.env.routeLog);
    ServerConfigs._routes = {};
    ServerConfigs._serve = Boolean(process.env.serve);
    ServerConfigs._servePath = String(process.env.servePath) as ServePath;
    ServerConfigs._version = process.env.version;

    // Set Routes
    ServerConfigs.setHateoasPath();
    ServerConfigs.setRouteLogPath();
    ServerConfigs.setRoutes();
  }

  /**
   * @access public
   * @description Get the instance of ServerConfigs
   */
  public static get(): ServerConfigs {
    if (!ServerConfigs.instance) {
      ServerConfigs.instance = new ServerConfigs();
    }
    return ServerConfigs.instance;
  }

  /**
   * @description Set the hateoas middleware path to run on
   * @access private
   */
  private static setHateoasPath(): void {
    if (process.env.hateoasPath === "global") ServerConfigs._hateoasPath = "/";
    ServerConfigs._hateoasPath = process.env.hateoasPath;
  }

  /**
   * @description Set the routelog middleware path to run on
   * @access private
   */
  private static setRouteLogPath(): void {
    if (process.env.routeLogPath === "global")
      ServerConfigs._routeLogPath = "/";
    ServerConfigs._routeLogPath = process.env.routeLogPath;
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
      const _map = map as RouteMap<Version>;
      if (transform.has(map)) _routes[_map] = route;
    }
  }

  /**
   * @access public
   * @description Get the base route of the server
   * @example "/api"
   */
  public get base(): Base {
    return ServerConfigs._base;
  }

  /**
   * @access private
   * @description Set the base route of the server
   */
  private set base(value: Base) {
    ServerConfigs._base = value;
  }

  /**
   * @access public
   * @description Get the compression level of the server
   * @example 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   */
  public get compressLevel(): CompressLevel {
    return ServerConfigs._compressLevel;
  }

  /**
   * @access private
   * @description Set the compression level of the server
   */
  private set compressLevel(value: CompressLevel) {
    ServerConfigs._compressLevel = value;
  }

  /**
   * @access public
   * @description Get the compression memory level of the server
   * @example 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   */
  public get compressMemLevel(): CompressMemLevel {
    return ServerConfigs._compressMemLevel;
  }

  /**
   * @access private
   * @description Set the compression memory level of the server
   */
  private set compressMemLevel(value: CompressMemLevel) {
    ServerConfigs._compressMemLevel = value;
  }

  /**
   * @access public
   * @description Get the database password of the server
   * @example "password"
   */
  public get databasePass(): DatabasePass {
    return ServerConfigs._databasePass;
  }

  /**
   * @access private
   * @description Set the database password of the server
   */
  private set databasePass(value: DatabasePass) {
    ServerConfigs._databasePass = value;
  }

  /**
   * @access public
   * @description Get the database URL of the server
   * @example "mongodb://localhost:27017"
   */
  public get databaseURL(): DatabaseURL {
    return ServerConfigs._databaseURL;
  }

  /**
   * @access private
   * @description Set the database URL of the server
   */
  private set databaseURL(value: DatabaseURL) {
    ServerConfigs._databaseURL = value;
  }

  /**
   * @access public
   * @description Get the database user of the server
   * @example "user"
   */
  public get databaseUser(): DatabaseUser {
    return ServerConfigs._databaseUser;
  }

  /**
   * @access private
   * @description Set the database user of the server
   */
  private set databaseUser(value: DatabaseUser) {
    ServerConfigs._databaseUser = value;
  }

  /**
   * @access public
   * @summary Get the process.env.NODE_ENV
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
   * @description Get the hateoas of the server
   * @example true | false
   */
  public get hateoas(): Hateoas {
    return ServerConfigs._hateoas;
  }

  /**
   * @access private
   * @description Set the hateoas of the server
   */
  private set hateoas(value: Hateoas) {
    ServerConfigs._hateoas = value;
  }

  /**
   * @access public
   * @description Get the hateoas path of the server
   * @example "global" | "/api/v1"
   */
  public get hateoasPath(): HateoasPath {
    return ServerConfigs._hateoasPath;
  }

  /**
   * @access private
   * @description Set the hateoas path of the server
   */
  private set hateoasPath(value: HateoasPath) {
    ServerConfigs._hateoasPath = value;
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
   * @access private
   * @description Set the hostname of the server
   */
  private set hostname(value: Hostname) {
    ServerConfigs._hostname = value;
  }

  /**
   * @access public
   * @description Get the parse limit of the server
   * @example "50mb" | "50kb"
   */
  public get parseLimit(): ParseLimit {
    return ServerConfigs._parseLimit;
  }

  /**
   * @access private
   * @description Set the parse limit of the server
   */
  private set parseLimit(value: ParseLimit) {
    ServerConfigs._parseLimit = value;
  }

  /**
   * @access public
   * @description Get the port of the server
   * @example 3000
   */
  public get port(): Port {
    return ServerConfigs._port;
  }

  /**
   * @access private
   * @description Set the port of the server
   */
  private set port(value: Port) {
    ServerConfigs._port = value;
  }

  /**
   * @access public
   * @description Get the protocol of the server
   * @example "http" | "https"
   */
  public get protocol(): Protocol {
    return ServerConfigs._protocol;
  }

  /**
   * @access private
   * @description Set the protocol of the server
   */
  private set protocol(value: Protocol) {
    ServerConfigs._protocol = value;
  }

  /**
   * @access public
   * @description Get the route log of the server
   * @example true | false
   */
  public get routeLog(): RouteLog {
    return ServerConfigs._routeLog;
  }

  /**
   * @access private
   * @description Set the route log of the server
   */
  private set routeLog(value: RouteLog) {
    ServerConfigs._routeLog = value;
  }

  /**
   * @access public
   * @description Get the route log path of the server
   * @example "global" | "/api/v1"
   */
  public get routeLogPath(): RouteLogPath {
    return ServerConfigs._routeLogPath;
  }

  /**
   * @access private
   * @description Set the route log path of the server
   */
  private set routeLogPath(value: RouteLogPath) {
    ServerConfigs._routeLogPath = value;
  }

  /**
   * @access public
   * @description Get the routes of the server
   * @example ["/api/v1/account", "/api/v1/asset", ...]
   */
  public get routes(): Routes {
    return ServerConfigs._routes;
  }

  /**
   * @access private
   * @description Set the routes of the server
   */
  private set routes(value: Routes) {
    ServerConfigs._routes = value;
  }

  /**
   * @access public
   * @description Get the static path of the server
   * @example "/public"
   */
  public get serve(): Serve {
    return ServerConfigs._serve;
  }

  /**
   * @access private
   * @description Set the static path of the server
   */
  private set serve(value: Serve) {
    ServerConfigs._serve = value;
  }

  /**
   * @access public
   * @description Get the static path of the server
   * @example "global" | "/api/v1"
   */
  public get servePath(): ServePath {
    return ServerConfigs._servePath;
  }

  /**
   * @access private
   * @description Set the static path of the server
   */
  private set servePath(value: ServePath) {
    ServerConfigs._servePath = value;
  }

  /**
   * @access public
   * @description Get the version of the server
   * @example "v1" | "v2"
   */
  public get version(): Version {
    return ServerConfigs._version;
  }

  /**
   * @access private
   * @description Set the version of the server
   */
  private set version(value: Version) {
    ServerConfigs._version = value;
  }
}
export { ServerConfigs };
