import type { Application } from "express";
import { static as _static } from "express";

import { pathFrom } from "@/utilities";

const serve = async (
  application: Application,
  options: {
    path: string;
  }
): Promise<void> => {
  const { path } = options;

  application.use(path, _static(pathFrom("../../public/", import.meta.url)));
};
export { serve };
