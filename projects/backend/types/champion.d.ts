type ChampionRequestData = {
  response: Champion;
  result: boolean;
};

type Champions = Champion[];

type Champion = {
  data: Partial<ChampionData>;
  format: string;
  type: string;
  version: string;
};

type ChampionData = {
  allytips: string[];
  blurb: string;
  enemytips: string[];
  id: string;
  image: Image;
  info: Info;
  key: string;
  lore: string;
  name: string;
  partype: string;
  passive: Passive;
  recommended: any[];
  skins: Skin[];
  spells: Spell[];
  stats: Stats;
  tags: string[];
  title: string;
};

type Image = {
  full: string;
  group: string;
  h: number;
  sprite: string;
  w: number;
  x: number;
  y: number;
};

type Skin = {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
};

type Info = {
  attack: number;
  defense: number;
  difficulty: number;
  magic: number;
};

type Stats = {
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

type Spell = {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  datavalues: {};
  description: string;
  effect: number[][];
  effectBurn: string[];
  id: string;
  image: Image;
  key: string;
  leveltip: LevelTip;
  maxrank: number;
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
  vars: Var[];
};

type LevelTip = {
  effect: string[];
  label: string[];
};

type Passive = {
  description: string;
  image: Image;
  name: string;
};

type Vars = {
  coeff: number[];
  dyn: string;
  key: string;
  link: string;
  ranksWith: string;
};
