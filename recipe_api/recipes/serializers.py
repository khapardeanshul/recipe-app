from rest_framework import serializers
from .models import Ingredient, Category, Recipe, RecipeIngredient

class IngredientSerializer(serializers.ModelSerializer):
    idIngredient = serializers.IntegerField(source='id', read_only=True)
    strIngredient = serializers.CharField(source='name')
    strDescription = serializers.CharField(source='description', allow_null=True)
    strType = serializers.CharField(source='ingredient_type', allow_null=True)
    
    class Meta:
        model = Ingredient
        fields = ['idIngredient', 'strIngredient', 'strDescription', 'strType']
        
class CategorySerializer(serializers.ModelSerializer):
    idCategory = serializers.IntegerField(source='id', read_only=True)
    strCategory = serializers.CharField(source='name')
    strCategoryThumb = serializers.URLField(source='thumbnail')
    class Meta:
        model = Category
        fields = ['idCategory', 'strCategory', 'strCategoryThumb']        
        

class RecipeListSerializer(serializers.ModelSerializer):
    idMeal = serializers.IntegerField(source='id', read_only=True)
    strMeal = serializers.CharField(source = 'name')
    strMealThumb = serializers.URLField(source = 'thumbnail')
    
    class Meta:
        model = Recipe
        fields = ['idMeal', 'strMeal', 'strMealThumb']
        

class RecipeDetailSerializer(serializers.ModelSerializer):
    idMeal = serializers.IntegerField(source='id',read_only=True)
    strMeal = serializers.CharField(source='name')
    strCategory = serializers.CharField(source='category.name', read_only=True)
    strArea = serializers.CharField(source='area')
    strInstructions = serializers.CharField(source='instructions')
    strMealThumb = serializers.URLField(source='thumbnail')
    strYoutube = serializers.URLField(source='youtube_link', allow_null=True)
    
    class Meta:
         model = Recipe
         fields = ['idMeal', 'strMeal', 'strCategory', 'strArea', 'strInstructions', 'strMealThumb', 'strYoutube']
         
         
    def to_representation(self, instance):
        details = super().to_representation(instance)
        
        # get related RecipeIngredient objects ordered by 'order' field
        recipe_ingredients = instance.recipe_ingredients.all().order_by('order')
        
        # iterate through related RecipeIngredient objects to add ingredients and measures
        for i in range(1, 21):
           details[f'strIngredient{i}'] = ''
           details[f'strMeasure{i}'] = ''
           
        # Populate ingredients and measures   
        for ri in recipe_ingredients:    #ri is short for RecipeIngredient
            if 1 <= ri.order <=20:
                details[f'strIngredient{ri.order}'] = ri.ingredient.name
                details[f'strMeasure{ri.order}'] = ri.measure
        
        return details
        
       
       
       
         