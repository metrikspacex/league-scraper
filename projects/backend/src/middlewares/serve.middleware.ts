import type { Application, NextFunction, Request, Response } from "express";
import { static as _static } from "express";

import { pathFrom } from "@/utilities";

const serve = async (application: Application, path: string): Promise<void> => {
  application.use(path, _static(pathFrom("../../public/", import.meta.url)));
};
export { serve };
