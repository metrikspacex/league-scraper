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
  private static _compressOn: CompressOn;
  private static _databasePass: DatabasePass;
  private static _databaseURL: DatabaseURL;
  private static _databaseUser: DatabaseUser;
  private static _environment: Environment;
  private static _hateoasOn: HateoasOn;
  private static _hateoasPath: HateoasPath;
  private static _hostname: Hostname;
  private static _parseLimit: ParseLimit;
  private static _parseOn: ParseOn;
  private static _port: Port;
  private static _protocol: Protocol;
  private static _redirectOn: RedirectOn;
  private static _routeLogOn: RouteLogOn;
  private static _routeLogPath: RouteLogPath;
  private static _routes: Routes;
  private static _serveOn: ServeOn;
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
    ServerConfigs._compressOn = Boolean(process.env.compressOn);
    ServerConfigs._databasePass = String(process.env.databasePass);
    ServerConfigs._databaseURL = String(process.env.databaseURL) as DatabaseURL;
    ServerConfigs._databaseUser = String(process.env.databaseUser);
    ServerConfigs._environment = String(process.env.environment) as Environment;
    ServerConfigs._hateoasOn = Boolean(process.env.hateoasOn);
    ServerConfigs._hostname = String(process.env.hostname);
    ServerConfigs._parseLimit = String(process.env.parseLimit) as ParseLimit;
    ServerConfigs._parseOn = Boolean(process.env.parseOn);
    ServerConfigs._port = Number(process.env.port);
    ServerConfigs._protocol = String(process.env.protocol) as Protocol;
    ServerConfigs._redirectOn = Boolean(process.env.redirectOn);
    ServerConfigs._routeLogOn = Boolean(process.env.routeLog);
    ServerConfigs._routes = {};
    ServerConfigs._serveOn = Boolean(process.env.serveOn);
    ServerConfigs._servePath = String(process.env.servePath) as ServePath;
    ServerConfigs._version = process.env.version;

    // Set Routes
    ServerConfigs.setHateoasPath();
    ServerConfigs.setRouteLogPath();
    ServerConfigs.setRoutes();
  }

  /**
   * @access public
   * @description
   */
  public static get(): ServerConfigs {
    if (!ServerConfigs.instance) {
      ServerConfigs.instance = new ServerConfigs();
    }
    return ServerConfigs.instance;
  }

  /**
   * @access private
   * @description
   */
  private static setHateoasPath(): void {
    ServerConfigs._hateoasPath =
      process.env.hateoasPath === "global" ? "/" : process.env.hateoasPath;
  }

  /**
   * @access private
   * @description
   */
  private static setRouteLogPath(): void {
    ServerConfigs._routeLogPath =
      process.env.routeLogPath === "global" ? "/" : process.env.routeLogPath;
  }

  /**
   * @access private
   * @description
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
   * @description
   * @example "/api"
   */
  public get base(): Base {
    return ServerConfigs._base;
  }

  /**
   * @access private
   * @description
   */
  private set base(value: Base) {
    ServerConfigs._base = value;
  }

  /**
   * @access public
   * @description
   * @example 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   */
  public get compressLevel(): CompressLevel {
    return ServerConfigs._compressLevel;
  }

  /**
   * @access private
   * @description
   */
  private set compressLevel(value: CompressLevel) {
    ServerConfigs._compressLevel = value;
  }

  /**
   * @access public
   * @description
   * @example 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   */
  public get compressMemLevel(): CompressMemLevel {
    return ServerConfigs._compressMemLevel;
  }

  /**
   * @access private
   * @description
   */
  private set compressMemLevel(value: CompressMemLevel) {
    ServerConfigs._compressMemLevel = value;
  }

  /**
   * @access public
   * @description
   * @example true | false
   */
  public get compressOn(): CompressOn {
    return ServerConfigs._compressOn;
  }

  /**
   * @access private
   * @description
   */
  private set compressOn(value: CompressOn) {
    ServerConfigs._compressOn = value;
  }

  /**
   * @access public
   * @description
   * @example "password"
   */
  public get databasePass(): DatabasePass {
    return ServerConfigs._databasePass;
  }

  /**
   * @access private
   * @description
   */
  private set databasePass(value: DatabasePass) {
    ServerConfigs._databasePass = value;
  }

  /**
   * @access public
   * @description
   * @example "mongodb://localhost:27017"
   */
  public get databaseURL(): DatabaseURL {
    return ServerConfigs._databaseURL;
  }

  /**
   * @access private
   * @description
   */
  private set databaseURL(value: DatabaseURL) {
    ServerConfigs._databaseURL = value;
  }

  /**
   * @access public
   * @description
   * @example "user"
   */
  public get databaseUser(): DatabaseUser {
    return ServerConfigs._databaseUser;
  }

  /**
   * @access private
   * @description
   */
  private set databaseUser(value: DatabaseUser) {
    ServerConfigs._databaseUser = value;
  }

  /**
   * @access public
   * @summary
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
   * @description
   */
  private set environment(value: Environment) {
    ServerConfigs._environment = value;
  }

  /**
   * @access public
   * @description
   * @example true | false
   */
  public get hateoasOn(): HateoasOn {
    return ServerConfigs._hateoasOn;
  }

  /**
   * @access private
   * @description
   */
  private set hateoasOn(value: HateoasOn) {
    ServerConfigs._hateoasOn = value;
  }

  /**
   * @access public
   * @description
   * @example "global" | "/api/v1"
   */
  public get hateoasPath(): HateoasPath {
    return ServerConfigs._hateoasPath;
  }

  /**
   * @access private
   * @description
   */
  private set hateoasPath(value: HateoasPath) {
    ServerConfigs._hateoasPath = value;
  }

  /**
   * @access public
   * @description
   * @example "localhost" -> 127.0.0.1
   */
  public get hostname(): Hostname {
    return ServerConfigs._hostname;
  }

  /**
   * @access private
   * @description
   */
  private set hostname(value: Hostname) {
    ServerConfigs._hostname = value;
  }

  /**
   * @access public
   * @description
   * @example "50mb" | "50kb"
   */
  public get parseLimit(): ParseLimit {
    return ServerConfigs._parseLimit;
  }

  /**
   * @access private
   * @description
   */
  private set parseLimit(value: ParseLimit) {
    ServerConfigs._parseLimit = value;
  }

  /**
   * @access public
   * @description
   * @example true | false
   */
  public get parseOn(): ParseOn {
    return ServerConfigs._parseOn;
  }

  /**
   * @access private
   * @description
   */
  private set parseOn(value: ParseOn) {
    ServerConfigs._parseOn = value;
  }

  /**
   * @access public
   * @description
   * @example 3000
   */
  public get port(): Port {
    return ServerConfigs._port;
  }

  /**
   * @access private
   * @description
   */
  private set port(value: Port) {
    ServerConfigs._port = value;
  }

  /**
   * @access public
   * @description
   * @example "http" | "https"
   */
  public get protocol(): Protocol {
    return ServerConfigs._protocol;
  }

  /**
   * @access private
   * @description
   */
  private set protocol(value: Protocol) {
    ServerConfigs._protocol = value;
  }

  /**
   * @access public
   * @description
   * @example true | false
   */
  public get redirectOn(): RedirectOn {
    return ServerConfigs._redirectOn;
  }

  /**
   * @access private
   * @description
   */
  private set redirectOn(value: RedirectOn) {
    ServerConfigs._redirectOn = value;
  }

  /**
   * @access public
   * @description
   * @example true | false
   */
  public get routeLogOn(): RouteLogOn {
    return ServerConfigs._routeLogOn;
  }

  /**
   * @access private
   * @description
   */
  private set routeLogOn(value: RouteLogOn) {
    ServerConfigs._routeLogOn = value;
  }

  /**
   * @access public
   * @description
   * @example "global" | "/api/v1"
   */
  public get routeLogPath(): RouteLogPath {
    return ServerConfigs._routeLogPath;
  }

  /**
   * @access private
   * @description
   */
  private set routeLogPath(value: RouteLogPath) {
    ServerConfigs._routeLogPath = value;
  }

  /**
   * @access public
   * @description
   * @example ["/api/v1/account", "/api/v1/asset", ...]
   */
  public get routes(): Routes {
    return ServerConfigs._routes;
  }

  /**
   * @access private
   * @description
   */
  private set routes(value: Routes) {
    ServerConfigs._routes = value;
  }

  /**
   * @access public
   * @description
   * @example "/public"
   */
  public get serveOn(): ServeOn {
    return ServerConfigs._serveOn;
  }

  /**
   * @access private
   * @description
   */
  private set serveOn(value: ServeOn) {
    ServerConfigs._serveOn = value;
  }

  /**
   * @access public
   * @description
   * @example "global" | "/api/v1"
   */
  public get servePath(): ServePath {
    return ServerConfigs._servePath;
  }

  /**
   * @access private
   * @description
   */
  private set servePath(value: ServePath) {
    ServerConfigs._servePath = value;
  }

  /**
   * @access public
   * @description
   * @example "v1" | "v2"
   */
  public get version(): Version {
    return ServerConfigs._version;
  }

  /**
   * @access private
   * @description
   */
  private set version(value: Version) {
    ServerConfigs._version = value;
  }
}
export { ServerConfigs };
