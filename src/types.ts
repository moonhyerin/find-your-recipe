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

type RecipeType = {
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
  nutrition: Object;
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
  winePairing: WinePairingType;
};

type WinePairingType = {
  pairedWines: string[];
  pairingText: string;
  productMatches: WineProductType;
};

type WineProductType = {
  averageRating: number;
  description: string;
  id: number;
  imageUrl: string;
  link: string;
  price: string;
  ratingCount: number;
  score: number;
  title: string;
};

type IngredientType = {
  name: string;
  image: string;
  amount: {
    metric: { unit: string; value: number };
    us: { unit: string; value: number };
  };
};

type NutritionType = {
  calories: string;
  carbs: string;
  fat: string;
  protein: string;
  good: NutritionDetailType[];
  bad: NutritionDetailType[];
};

type NutritionDetailType = {
  amount: string;
  indented: boolean;
  title: string;
  percentOfDailyNeeds: number;
};

export type {
  CategoryType,
  ResultType,
  RecipeType,
  IngredientType,
  NutritionType,
};
