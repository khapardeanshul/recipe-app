export interface RecipeIngredient {
    ingredient: string;
    measure: string;
}

export const extractIngredients = (recipe:any):
RecipeIngredient[] => {
    const ingredients : RecipeIngredient[] = []

    for (let i =1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient,
                measure,
            
        });
        }
    }

    return ingredients
}
