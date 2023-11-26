import chalk from "chalk";

// TODO -> debug / winson
class Logger {
  private static instance: Logger | null = null;

  private static _database: string = "#ffd700";
  private static _network: string = "#00fa9a";
  private static _routes: string = "#ff8c00";
  private static _server: string = "#0000ff";

  private static _error: string = "#ff0000";
  private static _errorOutput: boolean = false;
  private static _log: string = "#00ffff";
  private static _logOutput: boolean = true;

  private constructor() {
    chalk.level = 3;
  }

  public static get(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public error(from: string, message: string): void {
    if (Logger._errorOutput) {
      switch (from) {
        case "Database": {
          console.info(
            `${chalk.hex(Logger._database)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._error)(message)}`
          );
          break;
        }
        case "Network": {
          console.info(
            `${chalk.hex(Logger._network)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._error)(message)}`
          );
          break;
        }
        case "Server": {
          console.info(
            `${chalk.hex(Logger._server)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._error)(message)}`
          );
          break;
        }
        case "Routes": {
          console.info(
            `${chalk.hex(Logger._routes)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._error)(message)}`
          );
          break;
        }
        // No default
      }
    }
  }

  public log(from: string, message: string): void {
    if (Logger._logOutput) {
      switch (from) {
        case "Database": {
          console.info(
            `${chalk.hex(Logger._database)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._log)(message)}`
          );
          break;
        }
        case "Network": {
          console.info(
            `${chalk.hex(Logger._network)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._log)(message)}`
          );
          break;
        }
        case "Server": {
          console.info(
            `${chalk.hex(Logger._server)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._log)(message)}`
          );
          break;
        }
        case "Routes": {
          console.info(
            `${chalk.hex(Logger._routes)(
              `[${from.toUpperCase()}]:`
            )} ${chalk.hex(Logger._log)(message)}`
          );
          break;
        }
        // No default
      }
    }
  }
}

export { Logger };
