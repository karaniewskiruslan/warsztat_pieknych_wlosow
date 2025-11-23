export const timeLast = (last: number) =>
  last === 0 ? "Od razu" : `${last * 15} minut`;

export const masterText = (masters: string[]) =>
  masters.length === 1 ? "Mistrz" : "Mistrzowie";
