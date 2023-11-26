import { model, Schema } from "mongoose";

const ChampionSchema = new Schema(
  {
    champion: {
      allytips: {
        type: [String],
      },
      blurb: { type: String },
      enemytips: { type: [String] },
      id: { type: String },
      image: {
        full: { type: String },
        group: { type: String },
        h: { type: Number },
        sprite: { type: String },
        w: { type: Number },
        x: { type: Number },
        y: { type: Number },
      },
      info: {
        attack: { type: Number },
        defense: { type: Number },
        difficulty: { type: Number },
        magic: { type: Number },
      },
      key: { type: String },
      lore: { type: String },
      name: { type: String },
      partype: { type: String },
      passive: {
        description: { type: String },
        image: {
          full: { type: String },
          group: { type: String },
          h: { type: Number },
          sprite: { type: String },
          w: { type: Number },
          x: { type: Number },
          y: { type: Number },
        },
        name: { type: String },
      },
      recommended: {
        type: [
          {
            blocks: {
              type: [
                {
                  items: {
                    type: [
                      {
                        count: { type: Number },
                        id: { type: String },
                      },
                    ],
                  },
                  recMath: { type: Boolean },
                  type: { type: String },
                },
              ],
            },
            champion: { type: String },
            map: { type: String },
            mode: { type: String },
            priority: { type: Boolean },
            title: { type: String },
            type: { type: String },
          },
        ],
      },
      skins: {
        type: [
          {
            chromas: { type: Boolean },
            id: { type: String },
            name: { type: String },
            num: { type: Number },
          },
        ],
      },
      spells: {
        type: [
          {
            cooldown: { type: [Number] },
            cooldownBurn: { type: String },
            cost: { type: [Number] },
            costBurn: { type: String },
            costType: { type: String },
            datavalues: { type: Object },
            description: { type: String },
            effect: { type: [[Number]] },
            effectBurn: { type: [String] },
            id: { type: String },
            image: {
              full: { type: String },
              group: { type: String },
              h: { type: Number },
              sprite: { type: String },
              w: { type: Number },
              x: { type: Number },
              y: { type: Number },
            },
            key: { type: String },
            leveltip: {
              effect: { type: [String] },
              label: { type: [String] },
            },
            maxrank: { type: Number },
            name: { type: String },
            range: { type: [Number] },
            rangeBurn: { type: String },
            resource: { type: String },
            tooltip: { type: String },
            vars: {
              type: [
                {
                  coeff: { type: [Number] },
                  dyn: { type: String },
                  key: { type: String },
                  link: { type: String },
                  ranksWith: { type: String },
                },
              ],
            },
          },
        ],
      },
      stats: {
        armor: { type: Number },
        armorperlevel: { type: Number },
        attackdamage: { type: Number },
        attackdamageperlevel: { type: Number },
        attackrange: { type: Number },
        attackspeed: { type: Number },
        attackspeedperlevel: { type: Number },
        crit: { type: Number },
        critperlevel: { type: Number },
        hp: { type: Number },
        hpperlevel: { type: Number },
        hpregen: { type: Number },
        hpregenperlevel: { type: Number },
        movespeed: { type: Number },
        mp: { type: Number },
        mpperlevel: { type: Number },
        mpregen: { type: Number },
        mpregenperlevel: { type: Number },
        spellblock: { type: Number },
        spellblockperlevel: { type: Number },
      },
      tags: { type: [String] },
      title: { type: String },
    },
    format: {
      type: String,
    },
    type: {
      type: String,
    },
    version: {
      type: String,
    },
  },
  {
    methods: {},
    query: {},
    statics: {},
  }
);
const ChampionModel = model("Champion", ChampionSchema);
export { ChampionModel };
