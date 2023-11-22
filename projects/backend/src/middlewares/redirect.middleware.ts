import type { Application, NextFunction, Request, Response } from "express";

const redirect = async (application: Application): Promise<void> => {
  application.use(
    (_request: Request, _response: Response, _next: NextFunction) => {
      if (_request.url.includes("/api/v1")) {
        _next();
      } else {
        _response.redirect("/api/v1");
      }
    }
  );
};
export { redirect };
