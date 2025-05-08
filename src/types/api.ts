export type Link = {
  id?: number;
  name: string;
};

export type Contact = {
  id?: number;
  medium: string;
  contactLink: string;
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
  repository: string;
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
  skillId?: number;
};

export type SkillSet = {
  id: number;
  name: string;
  subSkillList: SubSkill[];
}

export type RowObject = Record<string,unknown>;


