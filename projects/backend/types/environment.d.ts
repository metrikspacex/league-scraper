/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
declare namespace Express {
  interface Application {}
  interface Locals {}
  interface Request {
    hateos: {
      _links: {
        [key: string]: {
          href: string;
        };
      };
    };
  }
  interface Response {}
}
