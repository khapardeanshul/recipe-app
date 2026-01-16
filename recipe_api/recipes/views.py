from django.shortcuts import render
from rest_framework.views import APIView
from .models import Ingredient, Category, Recipe, RecipeIngredient
from .serializers import IngredientSerializer, RecipeListSerializer, RecipeDetailSerializer
from rest_framework.response import Response
import requests

# Create your views here.

class IngredientListView(APIView):
    """
    GEt /api/ingredients/
    Returns all ingredients from the Database
    """
    
    def get(self, request):
        ingredients = Ingredient.objects.all().order_by('name')
        serializer = IngredientSerializer(ingredients, many=True)
        return Response({'meals': serializer.data})

     

class RecipesByIngredientView(APIView):
    """
    GET /api/recipes/?ingredient={ingredient_name}
    Returns Recipes from the Database 
    """
    
    def get(self, request):
        
        ingredient_name = request.query_params.get('ingredient', None)
        
        if not ingredient_name:
            recipes = Recipe.objects.all()
        else:
            recipes = Recipe.objects.filter(recipe_ingredients__ingredient__name__iexact=ingredient_name).distinct()    
        
        if not recipes.exists():
            return Response({'meals': None})
       
        serializer = RecipeListSerializer(recipes, many=True)
        return Response({'meals': serializer.data})            


class RecipeDetailView(APIView):
    """
    GET /api/recipes/{id}/
    Fetches full recipe details from the TheMealDB API
    """

    def get(self, request, recipe_id):
        
        try:
            recipe = Recipe.objects.get(id=recipe_id)
            serializer = RecipeDetailSerializer(recipe)
            return Response({'meals': [serializer.data]})
        except Recipe.DoesNotExist:
            return Response({'meals': None})
        

class CategoriesListView(APIView):
    """
    Get/api/categories/
    Returns all categories from Database
    """
    
    def get(self, request):
        categories = Category.objects.all().order_by('name')
        
        categories_data = []
        for item in categories:
            categories_data.append({
                'strCategory': item.name, 
                'strCategoryThumb': item.thumbnail,
            })
        
        return Response({'categories': categories_data})
        

class RecipesByCategoryView(APIView):
    """
    GET /api/recipes/category/{category_name}/
    Returns all Recipes by categories from the Database
    """        
    def get(self, request, category_name):
        try:
            category = Category.objects.get(name__iexact=category_name)
            recipes = Recipe.objects.filter(category=category)
            
            if not recipes.exists():
                return Response({'meals': None})
            
            serializer = RecipeListSerializer(recipes, many=True)
            return Response({'meals': serializer.data})
            
        except Category.DoesNotExist:
            return Response({'meals': None})

        
           
    
