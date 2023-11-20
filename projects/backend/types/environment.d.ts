/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
import type { Router } from "express";

declare global {
  // Application
  type Base = string;
  type CompressLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type CompressMemLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type DatabasePass = string;
  type DatabaseURL = `mongodb://${Hostname}:27017`;
  type DatabaseUser = string;
  type Environment =
    | "development"
    | "development.local"
    | "production"
    | "production.local";
  type Hateoas = boolean;
  type HateoasPath = "/" | "global" | RouteMap<Version>;
  type Hostname = "localhost" | string;
  type ParseLimit = `${number}mb` | `${number}kb`;
  type Port = number;
  type Protocol = "http" | "https";
  type RouteLog = boolean;
  type RouteLogPath = "/" | "global" | RouteMap<Version>;
  type RouteMap<version extends Version> =
    | `/api/${version}`
    | `/api/${version}/account`
    | `/api/${version}/asset`
    | `/api/${version}/challenge`
    | `/api/${version}/champion`
    | `/api/${version}/health`
    | `/api/${version}/item`
    | `/api/${version}/language`
    | `/api/${version}/management`
    | `/api/${version}/mastery`
    | `/api/${version}/public`
    | `/api/${version}/region`
    | `/api/${version}/rune`
    | `/api/${version}/spell`
    | `/api/${version}/version`;
  type Routes = {
    [index in RouteMap<Version>]?: Router;
  };
  type Serve = boolean;
  type ServePath = "global" | RouteMap<Version>;
  type Version = "v1" | "v2";

  // Utilities
  type ValueOf<T> = T[keyof T];

  namespace Express {
    interface Application {}
    interface Locals {}
    interface Request {
      hateos: any;
    }
    interface Response {
      _contentLength: number;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environment;
      base: Base;
      compressLevel: CompressLevel;
      compressMemLevel: CompressMemLevel;
      databasePass: DatabasePass;
      databaseURL: DatabaseURL;
      databaseUser: DatabaseUser;
      environment: Environment;
      hateoas: Hateoas;
      hateoasPath: HateoasPath;
      hostname: Hostname;
      parseLimit: ParseLimit;
      port: Port;
      protocol: Protocol;
      routeLog: RouteLog;
      routeLogPath: RouteLogPath;
      routes: string;
      serve: Serve;
      servePath: ServePath;
      version: Version;
    }
  }
}

export {};
