// Ingredient interface (from /api/ingredients/ response)
export interface Ingredient{
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: string | null;
}

// Meal interface (from /api/recipes/?ingredient= response)
export interface MealSummary {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}

// Meal detail interface (from /api/recipes/{id}/ response)
export interface MealDetail {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    strIngredient1?: string;
    strMeasure1?: string;
    strIngredient2?: string;
    strMeasure2?: string;
    strIngredient3?: string;
    strMeasure3?: string;
    strIngredient4?: string;
    strMeasure4?: string;
    strIngredient5?: string;
    strMeasure5?: string;
    strIngredient6?: string;
    strMeasure6?: string;
    strIngredient7?: string;
    strMeasure7?: string;
    strIngredient8?: string;
    strMeasure8?: string;
    strIngredient9?: string;
    strMeasure9?: string;
    strIngredient10?: string;
    strMeasure10?: string;
    strIngredient11?: string;
    strMeasure11?: string;
    strIngredient12?: string;
    strMeasure12?: string;
    strIngredient13?: string;
    strMeasure13?: string;
    strIngredient14?: string;
    strMeasure14?: string;
    strIngredient15?: string;
    strMeasure15?: string;
    strIngredient16?: string;   
    strMeasure16?: string;
    strIngredient17?: string;
    strMeasure17?: string;
    strIngredient18?: string;
    strMeasure18?: string;
    strIngredient19?: string;
    strMeasure19?: string;
    strIngredient20?: string;
    strMeasure20?: string;

    [key: string]: string | null | undefined;
}

// Category interface (from /api/categories/ response)
export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface IngredientResponse {
    message: string;
    meals: Ingredient[];
    total_pages: number;
    total_count: number;
}

export interface RecipesResponse {
    meals: MealSummary[] | null;
    total: number;
    page: number;
    page_size: number;
}

export interface RecipeDetailResponse {
    meals: MealDetail[] | null;
}

export interface CategoriesResponse {
    categories: Category[] ;
}