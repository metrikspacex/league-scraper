/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import compression from "compression";
import type { Application, Request, Response } from "express";

const compress = async (
  application: Application,
  level: number,
  memLevel: number
): Promise<void> => {
  const shouldCompress = (_request: Request, _response: Response) => {
    if (_request.headers["x-no-compression"]) return false;
    return compression.filter(_request, _response);
  };

  application.use(
    compression({
      filter: shouldCompress,
      level,
      memLevel,
    })
  );
};
export { compress };
