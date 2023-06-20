type CategoryType = {
  [key: string]: string[];
};

type ResultType = {
  id: number;
  title: string;
  image: string;
  imageType: string;
  nutrition: Object;
};

export type { CategoryType, ResultType };
