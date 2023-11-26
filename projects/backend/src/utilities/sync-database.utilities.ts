import type { RequestOptions } from "node:https";
import { request } from "node:https";
import { brotliDecompressSync, gunzipSync, inflateSync } from "node:zlib";

import { ServerConfigs } from "@/configs";
import { AccountModel, ChampionModel, LanguageModel } from "@/models";
import {
  hashPassword,
  Logger,
  validateEmail,
  validateExistences,
  validatePassword,
  validateUsername,
} from "@/utilities";

const dataDragonSyncChampionsToDatabase = async (): Promise<boolean> => {
  const champions = [
    "Aatrox",
    "Ahri",
    "Akali",
    "Alistar",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "AurelionSol",
    "Azir",
    "Bard",
    "Belveth",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Briar",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Chogath",
    "Corki",
    "Darius",
    "Diana",
    "Draven",
    "DrMundo",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "JarvanIV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Khazix",
    "Kindred",
    "Kled",
    "KogMaw",
    "KSante",
    "Leblanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "MasterYi",
    "Milio",
    "MissFortune",
    "MonkeyKing",
    "Mordekaiser",
    "Morgana",
    "Naafiri",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nilah",
    "Nocturne",
    "Nunu",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renata",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "TwistedFate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Velkoz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Xayah",
    "Xerath",
    "XinZhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra",
  ];

  /**
   * This function is used to request champion data from the Riot Games API.
   * I.E. Data Dragon API.
   *
   * @param `champion` The champion to request data for.
   * @returns A promise that resolves to a `ChampionRequestData` object.
   */
  async function requestChampionData(champion: string) {
    // Throws a TypeError if champion is not a string
    if (typeof champion !== "string") {
      throw new TypeError("Champion must be a string");
    }

    // TODO: Implement database lookup before request->process->store
    // FIXME: Type reimplementation for ChampionModel and ChampionRequestData
    /*
    const exists = await ChampionModel.exists({
      name: champion,
    });

    if (exists) {
      Logger.get().error(
        "Network",
        `Request cancelled: ${champion} exists in database`
      );
      try {
        const _champion = await ChampionModel.findOne({
          champion: { name: champion },
        });
        if (!_champion) {
          throw new Error("Champion not found");
        }

        return await Promise.resolve({
          response: {
            data: _champion.champion,
            format: _champion.format,
            type: _champion.type,
            version: _champion.version,
          },
          result: true,
        });
      } catch (error: any) {
        Logger.get().error("Database", `Database error: ${error.message}`);
        throw error;
      }
    }
    */

    return new Promise<ChampionRequestData>((resolve, reject) => {
      try {
        // _data will hold the response data in chunks
        const _data: Buffer[] = [];

        // _options defines the request options
        const _options: RequestOptions = {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.5",
            connection: "keep-alive",
            host: "ddragon.leagueoflegends.com",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent":
              "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
          },
          host: "ddragon.leagueoflegends.com",
          method: "GET",
          path: `/cdn/13.22.1/data/en_US/champion/${champion}.json`,
          protocol: "https:",
        };

        // _request is the actual HTTP request
        const _request = request(_options, (_response) => {
          // Log the request details
          Logger.get().log(
            "Network",
            `Request to ${_options.protocol}//${_options.host}${_options.path} - ${_response.statusCode}`
          );

          /**
           * If the response status code is not 200, reject the Promise with an
           * error
           */
          if (_response.statusCode !== 200) {
            Logger.get().error(
              "Network",
              `Request failed with status code ${_response.statusCode}`
            );
            return reject(
              new Error(
                `Request failed with status code ${_response.statusCode}`
              )
            );
          }

          // When a chunk of data is received, push it to _data
          _response.on("data", (_chunk: Buffer) => {
            _data.push(_chunk);
          });

          // When the response ends, try to decompress and parse the data
          _response.on("end", () => {
            // Concatenate all chunks into a single buffer
            const buffer = Buffer.concat(_data);
            let decompressedData: Buffer;

            // Try to decompress the data based on the content-encoding header
            try {
              switch (_response.headers["content-encoding"]) {
                // If the content-encoding is br, decompress with brotli
                case "br": {
                  decompressedData = brotliDecompressSync(buffer);
                  break;
                }
                // If the content-encoding is deflate, decompress with deflate
                case "deflate": {
                  decompressedData = inflateSync(buffer);
                  break;
                }
                // If the content-encoding is gzip, decompress with gzip
                case "gzip": {
                  decompressedData = gunzipSync(buffer);
                  break;
                }
                /**
                 * If the content-encoding isn't one of the cases, we don't
                 * support it, so throw an error
                 */
                default: {
                  Logger.get().error(
                    "Network",
                    `Request failed with unsupported content-encoding ${_response.headers["content-encoding"]}`
                  );
                  throw new Error(
                    `Request failed with unsupported content-encoding ${_response.headers["content-encoding"]}`
                  );
                }
              }
            } catch (error) {
              /**
               * If decompression fails or br, deflate, gzip isn't returned
               * set decompressedData to an empty buffer and reject the Promise
               */
              decompressedData = Buffer.alloc(0);
              reject(error);
              return;
            }

            // Try to parse the data received from decompressed data
            try {
              // Convert the decompressed data to a string and parse it as JSON
              const utf8Data = decompressedData.toString("utf8");
              const _jsonData = JSON.parse(utf8Data);

              // Prepare the data to be resolved
              const data: ChampionRequestData = {
                response: {
                  data: _jsonData.data[champion] as Partial<ChampionData>,
                  format: _jsonData.format as string,
                  type: _jsonData.type as string,
                  version: _jsonData.version as string,
                },
                result: true,
              };

              // Resolve the Promise with the data
              resolve(data);
            } catch {
              // If JSON parsing fails, reject the Promise with an error
              Logger.get().error(
                "Network",
                `Failed to parse JSON from ${_options.protocol}//${_options.host}${_options.path}`
              );
              reject(
                new Error(
                  `Failed to parse JSON from ${_options.protocol}//${_options.host}${_options.path}`
                )
              );
            }
          });

          /**
           * If an error occurs during the response, reject the Promise with an
           * error
           */
          _response.on("error", (error) => {
            Logger.get().error("Network", `Request error: ${error.message}`);
            reject(new Error(`Request error: ${error.message}`));
          });
        });

        /**
         * If an error occurs during the request, reject the Promise with an
         * error
         */
        _request.on("error", (error) => {
          Logger.get().error("Network", `Request error: ${error.message}`);
          reject(new Error(`Request error: ${error.message}`));
        });

        // End the request
        _request.end();
      } catch (error: any) {
        /**
         * If an error occurs while setting up the request, reject the Promise
         * with the error
         */
        Logger.get().error("Network", `Request error: ${error.message}`);
        reject(new Error(`Request error: ${error.message}`));
      }
    });
  }

  /**
   * This function is used to process champion data.
   *
   * inputs: `championData`
   * outputs: `null`
   *
   * @param `championData` The champion data to process.
   * @returns A promise that resolves to a `null` object.
   */
  async function processChampionRequest(_championData: Champion) {
    // TODO: Process champion data before passing to storeChampionRequest
  }

  /**
   * This function is used to store champion data to the database.
   *
   * @param `champion` The champion to store data for.
   * @returns A promise that resolves to a `null` object.
   */
  async function storeChampionRequest(
    champion: string,
    championData: Partial<Champion>
  ) {
    try {
      if (!championData.data) {
        Logger.get().error(
          "Database",
          `Database error: storing ${champion} failed`
        );
        throw new Error(`Request error: request for ${champion} failed`);
      }

      await validateExistences(ChampionModel, {
        name: championData.data.name,
      });
      await ChampionModel.create({
        champion: championData.data,
        format: championData.format,
        type: championData.type,
        version: championData.version,
      });
    } catch (error: any) {
      if (!error.message.includes("Record exists on Champion with query")) {
        Logger.get().error("Database", error.message);
        throw error;
      }
    }
  }

  try {
    // Create an array of promises, one for each champion
    const syncPromises = champions.map(async (champion) => {
      // Request data for the current champion
      const requestChampionDataResults = await requestChampionData(champion);

      // If the request fails, log an error and throw an exception
      if (!requestChampionDataResults) {
        Logger.get().error(
          "Network",
          `Request error: request for ${champion} failed`
        );
        throw new Error(`Request error: request for ${champion} failed`);
      }

      // Process the data for the current champion
      await processChampionRequest(requestChampionDataResults.response);

      // Store the request for the current champion into the database
      await storeChampionRequest(champion, requestChampionDataResults.response);
    });

    // Wait for all promises to settle (either resolve or reject)
    await Promise.allSettled(syncPromises);

    // If all promises settle without throwing an exception, return true
    return true;
  } catch {
    // If any promise throws an exception, catch it and return false
    return false;
  }
};

const dataDragonSyncLanguagesToDatabase = async () => {
  try {
    const _request = new Promise<string[]>((resolve, reject) => {
      const data: Uint8Array[] = [];
      Logger.get().log(
        "Network",
        "Request to https://ddragon.leagueoflegends.com/cdn/languages.json"
      );
      request(
        "https://ddragon.leagueoflegends.com/cdn/languages.json",
        (_response) => {
          let isSettled = false;
          if (_response.statusCode !== 200) {
            reject(
              new Error(
                `Request failed with status code ${_response.statusCode}`
              )
            );
            isSettled = true;
            return;
          }

          _response.on("data", (chunk) => {
            if (!isSettled) data.push(chunk);
          });

          _response.on("end", () => {
            if (!isSettled) {
              try {
                const buffer = Buffer.concat(data);
                const utf8Data = buffer.toString("utf8");
                const jsonData = JSON.parse(utf8Data);
                const stringArray: string[] = Object.values(jsonData);
                resolve(stringArray);
              } catch {
                reject(
                  new Error(
                    "Failed to parse JSON from https://ddragon.leagueoflegends.com/cdn/languages.json"
                  )
                );
                isSettled = true;
              }
            }
          });

          _response.on("error", (_error) => {
            reject(_error);
            isSettled = true;
          });
        }
      ).end();
    });

    const languages = await _request;
    const languagesAsPromised = languages.map(async (language) => {
      try {
        await validateExistences(LanguageModel, { language });
        await LanguageModel.create({ language });
        Logger.get().log("Database", `Loaded language ${language}`);
      } catch (_error: any) {
        Logger.get().error("Database", _error.message);
        if (!_error.message.includes("Record exists on Language with query")) {
          throw _error;
        }
      }
    });

    const results = await Promise.allSettled(languagesAsPromised);
    const anyRejected = results.some((result) => result.status === "rejected");
    return !anyRejected;
  } catch (_error: any) {
    Logger.get().error("Network", _error.message);
    return false;
  }
};

const dataDragonSyncVersionsToDatabase = async () => {
  return false;
};

const leagueScraperSyncAccountsToDatabase = async () => {
  const { databaseUser, databasePass } = ServerConfigs.get();

  const accounts = [
    {
      email: `${databaseUser}@gmail.com`,
      password: `${databasePass}`,
      username: `${databaseUser}`,
    },
    {
      email: "dustin1818@gmail.com",
      password: "dustin1818",
      username: "dustin1818",
    },
    {
      email: "metrikspacex@gmail.com",
      password: "metrikspacex",
      username: "metrikspacex",
    },
  ];

  const accountsAsPromised = accounts.map(async (account) => {
    const { email, password, username } = account;

    try {
      await validateEmail(email);
      await validatePassword(password);
      await validateUsername(username);

      const hashedPassword = await hashPassword(password);
      await AccountModel.create({
        email,
        password: hashedPassword,
        username,
      });
      Logger.get().log("Database", `Loaded account ${username}`);
    } catch (error: any) {
      if (!error.message.includes("Record exists on Account with query")) {
        Logger.get().error("Database", error.message);
      }
    }
  });

  const results = await Promise.allSettled(accountsAsPromised);
  const anyRejected = results.some((result) => result.status === "rejected");
  return !anyRejected;
};

export {
  dataDragonSyncChampionsToDatabase,
  dataDragonSyncLanguagesToDatabase,
  dataDragonSyncVersionsToDatabase,
  leagueScraperSyncAccountsToDatabase,
};
