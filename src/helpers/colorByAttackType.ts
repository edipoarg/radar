const defaultAttackColor = "#8f8f8f";
export const getColorByAttack = (
  colorByAttackType: Record<string, string>,
  attackType: string,
) => {
  return colorByAttackType[attackType] ?? defaultAttackColor;
};
