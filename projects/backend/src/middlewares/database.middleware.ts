import type { NextFunction, Request, Response } from "express";

const database = async (
  _request: Request,
  _response: Response,
  _next: NextFunction
): Promise<void> => {
  _next();
};
export { database };
