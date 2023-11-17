/* eslint-disable unicorn/no-await-expression-member */
import type { NextFunction, Request, Response } from "express";
import got from "got";

type ChampionData = {
  blurb: string;
  id: string;
  info: {
    attack: number;
    defense: number;
    difficulty: number;
    magic: number;
  };
  name: string;
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
  };
  tags: string[];
  title: string;
};
type ChampionResponseData = {
  data: {
    [key: string]: ChampionData;
  };
};

type ChampionsResponseData = {
  data: ChampionData[];
};

class ChampionController {
  public async index(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    const version = (
      await got
        .get<string[]>({
          method: "GET",
          responseType: "json",
          url: "https://ddragon.leagueoflegends.com/api/versions.json",
        })
        .json<string[]>()
    )[0] as string;

    const champions = await got
      .get<string[]>({
        method: "GET",
        responseType: "json",
        url: `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
      })
      .json<ChampionsResponseData>();

    const generateChampions = (champions: ChampionsResponseData) => {
      const _champions: Record<string, ChampionData> = {};

      for (const [key, value] of Object.entries(champions.data)) {
        _champions[key] = {
          blurb: value.blurb,
          id: value.id,
          info: value.info,
          name: value.name,
          stats: value.stats,
          tags: value.tags,
          title: value.title,
        };
      }

      return _champions;
    };

    _response.status(200).json({
      response: {
        champions: generateChampions(champions),
        version,
      },
      ..._request.hateos,
    });
    _next();
  }
  public async champion(
    _request: Request,
    _response: Response,
    _next: NextFunction
  ): Promise<void> {
    const { id } = _request.params;
    let _id = id?.toLowerCase() ?? "";
    if (id !== undefined) _id = _id.charAt(0).toUpperCase() + _id.slice(1);

    const version = (
      await got
        .get<string[]>({
          method: "GET",
          responseType: "json",
          url: "https://ddragon.leagueoflegends.com/api/versions.json",
        })
        .json<string[]>()
    )[0] as string;

    console.log(
      `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion/${_id}.json`
    );

    const champion = await got
      .get<string[]>({
        method: "GET",
        responseType: "json",
        url: `https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion/${_id}.json`,
      })
      .json<ChampionResponseData>();

    if (champion.data[_id]) {
      const { id, blurb, info, name, stats, tags, title } = champion.data[_id];
      _response.status(200).json({
        response: {
          champion: {
            [id]: {
              blurb,
              id,
              info,
              name,
              stats,
              tags,
              title,
            },
          },
          version,
        },
        ..._request.hateos,
      });
      _next();
    } else {
      _next();
    }
  }
}

export { ChampionController };
