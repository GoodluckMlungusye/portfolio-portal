export type Link = {
  id?: number;
  name: string;
};

export type Contact = {
  id?: number;
  medium: string;
  contactLink: string;
};

export type Education = {
  id?: number;
  duration: string;
  institute: string;
  programme: string;
  description: string;
};

export type Explore = {
  id?: number;
  counts: number;
  description: string;
  image: File | string | null;
};

export type Project = {
  id?: number;
  name: string;
  technology: string;
  rate: number;
  projectLink: string;
  colorCode: string;
  image: File | string | null;
  isHosted: boolean;
};

export type Service = {
  id?: number;
  name: string;
  description: string;
  image: File | string | null;
};

export type Skill = {
  id?: number;
  name: string;
};

export type SubSkill = {
  id?: number;
  name: string;
  percentageLevel: number;
  skill: {
    id: number;
  };
};


