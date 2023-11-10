// thanks to @Souperman at https://stackoverflow.com/questions/73825273/creating-a-zod-enum-from-an-object
export const extractValue = (target: { value: string; label: string }[]) => {
  type property = (typeof target)[number]["value"];
  const valueArray: [property, ...property[]] = [
    target[0].value,
    ...target.slice(1).map((item) => item.value),
  ];
  return valueArray;
};
