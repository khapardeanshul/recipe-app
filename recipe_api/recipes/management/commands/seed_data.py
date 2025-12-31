import requests
from recipes.models import Ingredient, Recipe, RecipeIngredient, Category
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'seed the database with real data from TheMealDB API'
    
    def handle(self, *args, **kwargs):
        
        self.stdout.write('Clearing existing data...')
        
        # Clear existing data
        RecipeIngredient.objects.all().delete()
        Recipe.objects.all().delete()
        Ingredient.objects.all().delete()
        Category.objects.all().delete()

        
        self.stdout.write('Creating ingredients...')
        # Create ingredients
        ingredients_data = ['Chicken', 'Soy Sauce', 'Honey', 'Garlic', 'Ginger',
                            'Salmon', 'Lemon', 'Butter', 'Pasta', 'Tomato Sauce',
                            'Beef', 'Onion', 'Carrot', 'Potato', 'Rice',
                            'Olive oil', 'Salt', 'Pepper', 'Parmesan Cheese', 'Basil']
        
        ingredients = {}
        for name in ingredients_data:
            ing = Ingredient.objects.create(
                name=name,
                description=f"{name} is a common cooking ingredient.")
            
            ingredients[name] = ing
            
        self.stdout.write('Creating Categories...')
            
        # Create Categories
        chicken_cat = Category.objects.create(name='Chicken')
        seafood_cat = Category.objects.create(name='Seafood')
        pasta_cat = Category.objects.create(name='Pasta')
        beef_cat = Category.objects.create(name='Beef')
        
        
        self.stdout.write('Creating Recipes...')
        # Create Recipes
        recipe1 = Recipe.objects.create(
            name = 'Teriyaki Chicken Casserole',
            category = chicken_cat,
            area = 'Japanese',
            instructions = 'Preheat oven to 350F.\nMix soy sauce and honey in a bowl.\nMarinate chicken for 30 minutes.\nPlace chicken in baking dish.\nBake for 45 minutes until golden brown.\nServe hot with rice.',
            thumbnail = 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
            youtube_link = 'https://www.youtube.com/watch?v=4aZr5hZXP_s'
            
        )
        RecipeIngredient.objects.create(recipe=recipe1, ingredient=ingredients['Chicken'], measure='500g', order=1)
        RecipeIngredient.objects.create(recipe=recipe1, ingredient=ingredients['Soy Sauce'], measure='3 tbsp', order=2)
        RecipeIngredient.objects.create(recipe=recipe1, ingredient=ingredients['Honey'], measure='2 tbsp', order=3)
        RecipeIngredient.objects.create(recipe=recipe1, ingredient=ingredients['Garlic'], measure='2 cloves', order=4)
        RecipeIngredient.objects.create(recipe=recipe1, ingredient=ingredients['Ginger'], measure='1 tbsp', order=5)
           
       
        recipe2 = Recipe.objects.create(
            name='Honey Lemon Chicken',
            category=chicken_cat,
            area='American',
            instructions='Season chicken with salt and pepper.\nHeat oil in a large pan over medium heat.\nPan fry chicken until golden on both sides.\nAdd honey and lemon juice to the pan.\nSimmer for 10 minutes until sauce thickens.\nGarnish with fresh herbs and serve.',
            thumbnail='https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg',
            youtube_link='https://www.youtube.com/watch?v=example2'
        )
        RecipeIngredient.objects.create(recipe=recipe2, ingredient=ingredients['Chicken'], measure='4 pieces', order=1)
        RecipeIngredient.objects.create(recipe=recipe2, ingredient=ingredients['Honey'], measure='4 tbsp', order=2)
        RecipeIngredient.objects.create(recipe=recipe2, ingredient=ingredients['Lemon'], measure='2 pieces', order=3)
        RecipeIngredient.objects.create(recipe=recipe2, ingredient=ingredients['Olive oil'], measure='2 tbsp', order=4)

        
        recipe3 = Recipe.objects.create(
            name='Grilled Salmon with Lemon Butter',
            category=seafood_cat,
            area='Mediterranean',
            instructions='Season salmon fillets with salt and pepper.\nPreheat grill to medium-high heat.\nGrill salmon for 4 minutes on each side.\nMelt butter in a small pan and add lemon juice.\nDrizzle lemon butter sauce over grilled salmon.\nServe immediately with vegetables.',
            thumbnail='https://www.themealdb.com/images/media/meals/1548772327.jpg',
            youtube_link='https://www.youtube.com/watch?v=example3'
        )
        RecipeIngredient.objects.create(recipe=recipe3, ingredient=ingredients['Salmon'], measure='2 fillets', order=1)
        RecipeIngredient.objects.create(recipe=recipe3, ingredient=ingredients['Lemon'], measure='1 piece', order=2)
        RecipeIngredient.objects.create(recipe=recipe3, ingredient=ingredients['Butter'], measure='3 tbsp', order=3)
        RecipeIngredient.objects.create(recipe=recipe3, ingredient=ingredients['Salt'], measure='1 tsp', order=4)
        RecipeIngredient.objects.create(recipe=recipe3, ingredient=ingredients['Pepper'], measure='1/2 tsp', order=5)

       
        recipe4 = Recipe.objects.create(
            name='Classic Tomato Pasta',
            category=pasta_cat,
            area='Italian',
            instructions='Boil pasta in salted water according to package instructions.\nHeat olive oil in a pan and sauté garlic until fragrant.\nAdd tomato sauce and simmer for 10 minutes.\nDrain pasta and add to the sauce.\nToss well to coat pasta with sauce.\nTop with parmesan cheese and fresh basil.',
            thumbnail='https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
            youtube_link='https://www.youtube.com/watch?v=example4'
        )
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Pasta'], measure='400g', order=1)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Tomato Sauce'], measure='2 cups', order=2)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Garlic'], measure='3 cloves', order=3)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Onion'], measure='1 piece', order=4)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Olive oil'], measure='2 tbsp', order=5)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Parmesan Cheese'], measure='50g', order=6)
        RecipeIngredient.objects.create(recipe=recipe4, ingredient=ingredients['Basil'], measure='5 leaves', order=7)

        
        recipe5 = Recipe.objects.create(
            name='Hearty Beef Stew',
            category=beef_cat,
            area='American',
            instructions='Cut beef into cubes and season with salt and pepper.\nBrown beef in a large pot with oil.\nAdd onions, carrots, and potatoes.\nPour in beef broth and bring to boil.\nReduce heat and simmer for 2 hours until tender.\nServe hot with crusty bread.',
            thumbnail='https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
            youtube_link='https://www.youtube.com/watch?v=example5'
        )
        RecipeIngredient.objects.create(recipe=recipe5, ingredient=ingredients['Beef'], measure='800g', order=1)
        RecipeIngredient.objects.create(recipe=recipe5, ingredient=ingredients['Onion'], measure='2 pieces', order=2)
        RecipeIngredient.objects.create(recipe=recipe5, ingredient=ingredients['Carrot'], measure='3 pieces', order=3)
        RecipeIngredient.objects.create(recipe=recipe5, ingredient=ingredients['Potato'], measure='4 pieces', order=4)
        RecipeIngredient.objects.create(recipe=recipe5, ingredient=ingredients['Olive oil'], measure='3 tbsp', order=5)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with 5 recipes!'))
        self.stdout.write(self.style.SUCCESS(f'Total ingredients: {Ingredient.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Total categories: {Category.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Total recipes: {Recipe.objects.count()}'))
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    # def handle(self, *args, **Kwargs):
        
        
    #     # Fetch and Create ingredients
    #     self.stdout.write('Fetching ingredients data from TheMealDB...')
    #     self.fetch_ingredients()
        
    #     # Fetch and create recipes for multiple ingredients
    #     self.stdout.write('Fetching recipes data from TheMealDB...')
    #     sample_ingredients = ['Chicken', 'Beef', 'Salmon', 'pasta', 'Potato']
        
    #     for ingredient in sample_ingredients:
    #         self.stdout.writef(f'Fetching recipes for {ingredient_name}...')
    #         self.fetch_recipes_by_ingredient(ingredient_name)

    #         self.stdout.write(self.style.SUCCESS('Successfully seeded database from TheMealDB!'))
    #         self.stdout.write(self.style.SUCCESS(f'Total ingredients: {Ingredient.objects.count()}'))
    #         self.stdout.write(self.style.SUCCESS(f'Total categories: {Category.objects.count()}'))
    #         self.stdout.write(self.style.SUCCESS(f'Total recipes: {Recipe.objects.count()}'))
            
    #         def fetch_ingredients(self):
                