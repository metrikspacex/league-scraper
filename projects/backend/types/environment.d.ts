/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
declare namespace Express {
  interface Application {}
  interface Locals {}
  interface Request {
    hateos: Record<
      string,
      {
        href?: string;
        methods?: any;
      }
    >;
  }
  interface Response {}
}
