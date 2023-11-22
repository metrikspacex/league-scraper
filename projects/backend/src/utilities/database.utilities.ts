import type { Connection } from "mongoose";
import mongoose from "mongoose";

import { ServerConfigs } from "@/configs";
import { Logger } from "@/utilities";

class Database {
  private static instance: Database | null = null;
  private static _connection: Connection;
  private constructor() {}

  /**
   * @access public
   * @description Get the instance of Database
   */
  public static get(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initialize(): Promise<void> {
    const { databasePass, databaseURL, databaseUser } = ServerConfigs.get();

    try {
      const connect = await mongoose.connect(databaseURL, {
        dbName: "api",
        pass: databasePass,
        user: databaseUser,
      });
      Logger.get().log("#3BB143", "Database", "Connected successfully");
      Logger.get().log("#3BB143", "Database", "Clearing");
      connect.connection.db.dropDatabase({
        dbName: "api",
      });
      const connection = connect.connection.useDb("api");
      Database._connection = connection;
    } catch (error: any) {
      if (error instanceof mongoose.Error) {
        Logger.get().log("#3BB143", "Database", "Connection failed");
        throw new Error(`Database connection failed ${error.message}`);
      }

      Logger.get().log(
        "#3BB143",
        "Database",
        "Connection failed, unknown error"
      );
      throw new Error("Database connection failed", error);
    }
  }

  /**
   * @access public
   * @description Get the connection to the database
   */
  public get connection(): Connection {
    return Database._connection;
  }

  /**
   * @access public
   * @description Set the connection to the database
   */
  private set connection(value) {
    Database._connection = value;
  }
}

export { Database };
