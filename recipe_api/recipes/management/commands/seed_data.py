import requests
import time
from django.core.management.base import BaseCommand
from recipes.models import Ingredient, Category, Recipe, RecipeIngredient


class Command(BaseCommand):
    help = "Seed database from TheMealDB API"

    def handle(self, *args, **kwargs):
        print("\n This will delete all existing data.")
        if input("Continue? (yes/no): ") != "yes":
            print("Cancelled.")
            return

        self.clear_data()
        self.seed_ingredients()
        self.seed_categories()
        self.seed_recipes()

        print("\n Seeding completed!")
        print(f"Ingredients: {Ingredient.objects.count()}")
        print(f"Categories: {Category.objects.count()}")
        print(f"Recipes: {Recipe.objects.count()}")


    def clear_data(self):
        RecipeIngredient.objects.all().delete()
        Recipe.objects.all().delete()
        Ingredient.objects.all().delete()
        Category.objects.all().delete()
        print(" Database cleared")

    def seed_ingredients(self):
        print("\n Fetching ingredients...")
        url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        data = requests.get(url).json()

        for item in data["meals"]:
            Ingredient.objects.create(
                name=item["strIngredient"],
                description=item.get("strDescription") or "",
                ingredient_type=item.get("strType") or "",
            )
            
            time.sleep(0.2)

        print(f" {Ingredient.objects.count()} ingredients saved")

    def seed_categories(self):
        print("\n Fetching categories...")
        url = "https://www.themealdb.com/api/json/v1/1/categories.php"
        data = requests.get(url).json()

        for item in data["categories"]:
            Category.objects.create(
                name=item["strCategory"],
                thumbnail=item.get("strCategoryThumb"),
                )

            time.sleep(0.2)
        print(f" {Category.objects.count()} categories saved")

    def seed_recipes(self):
        print("\n Fetching recipes...")

        for category in Category.objects.all():
            print(f"  → {category.name}")
            url = f"https://www.themealdb.com/api/json/v1/1/filter.php?c={category.name}"
            data = requests.get(url).json()

            if not data.get("meals"):
                continue

            for meal in data["meals"]:
                meal_id = meal["idMeal"]
                detail_url = f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}"
                detail_data = requests.get(detail_url).json()

                if detail_data.get("meals"):
                    self.create_recipe(detail_data["meals"][0], category)

                time.sleep(0.2)
        

    def create_recipe(self, meal, category):
        name = (meal.get("strMeal") or "").strip()
        instructions = (meal.get("strInstructions") or "").strip()
        youtube_link = (meal.get("strYoutube") or "").strip()
        area = (meal.get("strArea") or "").strip()

        if not name:
            self.stdout.write(self.style.WARNING("Skipping: empty name"))
            return

        if not instructions:
            self.stdout.write(self.style.WARNING(f"Skipping '{name}': empty instructions"))
            return

        if Recipe.objects.filter(name=name).exists():
            self.stdout.write(self.style.WARNING(f"Skipping '{name}': already exists"))
            return

        if len(name) > 255:
            self.stdout.write(self.style.WARNING(f"Skipping '{name}': name too long ({len(name)})"))
            return

        if len(youtube_link) > 500:
            self.stdout.write(self.style.WARNING(f"Skipping '{name}': youtube link too long ({len(youtube_link)})"))
            return

        if len(area) > 100:
            self.stdout.write(self.style.WARNING(f"Skipping '{name}': area too long ({len(area)})"))
            return

        self.stdout.write(self.style.SUCCESS(f"Saving recipe: {name}"))

        recipe = Recipe.objects.create(
        name=name,
        category=category,
        area=area,
        instructions=instructions,
        thumbnail=meal.get("strMealThumb") or "",
        youtube_link=youtube_link,
    )

        for i in range(1, 21):
            ingredient_name = (meal.get(f"strIngredient{i}") or "").strip()
            measure = (meal.get(f"strMeasure{i}") or "").strip()

            if not ingredient_name:
                continue

            ingredient, _ = Ingredient.objects.get_or_create(
                name__iexact=ingredient_name,
                defaults={"name": ingredient_name, "description": "", "ingredient_type": ""},
            )

            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient=ingredient,
                measure=measure,
                order=i,
            )

