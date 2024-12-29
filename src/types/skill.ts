export type Subskills = {
    id: number;
    name: string;
    percentageLevel: number;
}
export type SkillSet = {
    id: number;
    name: string;
    subSkillList: Subskills[];
}