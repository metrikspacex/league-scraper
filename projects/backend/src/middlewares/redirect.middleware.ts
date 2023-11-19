import type { NextFunction, Request, Response } from "express";

// TODO: anything like /api/v1/hi isn't redirected
const redirect = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  _next();
};
export { redirect };
