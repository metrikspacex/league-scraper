/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
import type { Router } from "express";

declare global {
  // Application
  type Base = string;
  type Environment =
    | "development"
    | "development.local"
    | "production"
    | "production.local";
  type Hostname = string;
  type RouteMap<version extends Version> =
    | `/api/${version}/`
    | `/api/${version}/account`
    | `/api/${version}/asset`
    | `/api/${version}/challenge`
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
    [index in ValueOf<RouteMap<Version>>]?: Router;
  };
  type Port = number;
  type Protocol = "http" | "https";
  type Version = "v1" | "v2";

  // Utilities
  type ValueOf<T> = T[keyof T];

  namespace Express {
    interface Application {}
    interface Locals {}
    interface Request {
      hateos: any;
    }
    interface Response {}
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: Environment;
      base: Base;
      environment: Environment;
      hostname: Hostname;
      port: Port;
      protocol: Protocol;
      routes: string;
      version: Version;
    }
  }
}

export {};
