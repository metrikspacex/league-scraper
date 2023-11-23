import type { Application, NextFunction, Request, Response } from "express";

const redirect = async (
  application: Application,
  options: {
    from: string;
    to: string;
  }
): Promise<void> => {
  const { from, to } = options;

  application.use(
    (_request: Request, _response: Response, _next: NextFunction) => {
      if (_request.url.includes(from)) {
        _next();
      } else {
        _response.redirect(to);
      }
    }
  );
};
export { redirect };
