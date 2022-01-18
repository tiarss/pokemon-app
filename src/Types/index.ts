import { ChangeEvent } from "react";

export type dataCatchType = {
  data: [
    {
      name: string;
      url: string;
    }
  ];
  prev: string | null;
  next: string | null;
  count: number;
};

type photoType = {
  depan: string | null | undefined;
  belakang: string | null | undefined;
};

type abilitiesType = {
  ability: {
    name: string;
  };
};

type moveType = {
  move: {
    name: string;
  };
};

type statsType = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type typesType = {
  type: {
    name: string;
  };
};

export type cardPropsType = {
  name: string;
  photos: photoType;
  abilities: abilitiesType[];
  moves: moveType[];
  stats: statsType[];
  types: typesType[];
  play: () => void;
  isDisable: boolean
};

export type dataDetailsType = {
  name: string;
  photos: photoType;
  abilities: abilitiesType[];
  moves: moveType[];
  stats: statsType[];
  types: typesType[];
};

export type alertType = {
  message: string;
  status: "error" | "info" | "success" | "warning" | undefined;
};

export type catchFormPropsType = {
  saveClick: () => void;
  saveName: (e: ChangeEvent<HTMLInputElement>) => void;
  isExist: boolean
};

export type saveLocalType = {
   nickname: string,
   data: dataDetailsType[]
}