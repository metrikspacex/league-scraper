import type { NextFunction, Request, Response } from "express";

class RootController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    const a = "string";

    _response.status(200).json({
      response: {},
      ..._request.hateos,
    });
    console.log("called?");
    _next(() => {});
  }
}
export { RootController };
