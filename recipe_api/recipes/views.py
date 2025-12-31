from django.shortcuts import render
from rest_framework.views import APIView
from .models import Ingredient, Category, Recipe, RecipeIngredient
from .serializers import IngredientSerializer, RecipeListSerializer, RecipeDetailSerializer
from rest_framework.response import Response

# Create your views here.

class IngredientListView(APIView):
    """
    GEt /api/ingredients/
    Retrieve a list of all ingredients.
    """
    
    def get(self, request):
        ingredients = Ingredient.objects.all() 
        serializer = IngredientSerializer(ingredients, many=True)
        return Response({'meals': serializer.data})



class RecipesByIngredientView(APIView):
    """
    GET /api/recipes/?ingredient={name}
    Returns recipes containing the specific ingredient name.
    """
    
    def get(self, request):
        # Get the ingredient name from URL
        ingredient_name = request.GET.get('ingredient')
        
        if not ingredient_name:
            # Return all recipes if no ingredient specified
            recipes = Recipe.objects.all()
        else:
           # Filter recipes that contain the specified ingredient
            recipes = Recipe.objects.filter(
                recipe_ingredients__ingredient__name__iexact=ingredient_name
            ).distinct()
            
         #Check if we found any recipes
        if not recipes.exists():
            return Response({'meals': None})
        
        #Serialize and return
        serializer = RecipeListSerializer(recipes, many=True)
        return Response({'meals': serializer.data})
            


class RecipeDetailView(APIView):
    """
    GET /api/recipes/{id}/
    Retrieve details of a specific recipe by ID.
    """

    def get(self, request, recipe_id):
        try:
            recipe = Recipe.objects.get(id=recipe_id)
            serializer = RecipeDetailSerializer(recipe)
            return Response({'meals': [serializer.data]})
        
        except Recipe.DoesNotExist:
            return Response({'meals': None})
        
        
    
