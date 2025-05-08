import { SkillSet } from 'src/types/api';
  
  export function transformToDynamicSkillSeries(
    skillSets: SkillSet[] = [], 
    seriesLength: number = 0, 
    subSkills: string[] = []
  ): any[] {
    if (!Array.isArray(skillSets) || seriesLength <= 0 || !Array.isArray(subSkills)) {
      return [];
    }
  
    return skillSets.map(skillSet => ({
      year: skillSet.name,
      data: skillSet.subSkillList.map(subskill => {
        const position = subSkills.indexOf(subskill.name);    
        const data = Array(seriesLength).fill(0);
        if (position !== -1) {
          data[position] = subskill.percentageLevel;
        }
        
        return {
          name: subskill.name,
          data,
        };
      }),
    }));
  }
  