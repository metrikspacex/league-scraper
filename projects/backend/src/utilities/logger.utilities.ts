import chalk from "chalk";

class Logger {
  private static instance: Logger | null = null;
  private constructor() {
    chalk.level = 3;
  }
  public static get(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public log(fromColor: string, from: string, message: string): void {
    console.info(
      `${chalk.hex(fromColor)(`[${from.toUpperCase()}]:`)} ${chalk.hex(
        "#0080FE"
      )(message)}`
    );
  }
}

export { Logger };
