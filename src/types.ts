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

type AnalyzedInstructionType = {
  name: string;
  steps: [];
};

type RandomRecipeType = {
  aggregateLikes: number;
  analyzedInstructions: AnalyzedInstructionType[];
  cheap: boolean;
  cookingMinutes: number;
  creditsText: string;
  cuisines: [];
  dairyFree: boolean;
  diets: string[];
  dishTypes: string[];
  extendedIngredients: [];
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  instructions: string;
  license: string;
  lowFodmap: boolean;
  occasions: [];
  originalId: number | null;
  preparationMinutes: number;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
};

export type { CategoryType, ResultType, RandomRecipeType };
