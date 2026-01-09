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
    Fetches ingredients from TheMealDB API
    """
    
    def get(self, request):

        try:
            # Fetch from TheMealDB
            response = requests.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'meals': None}, status=500)



class RecipesByIngredientView(APIView):
    """
    GET /api/recipes/?ingredient={ingredient_name}
    Fetches recipes by ingredient from TheMealDB API
    """
    
    def get(self, request):
        
        ingredient_name = request.query_params.get('ingredient', None)
        
        if not ingredient_name:
            return Response({'meals': None})
        
        try:
            # Fetch from TheMealDB
            url = f'https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient_name}'
            response = requests.get(url)
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'meals': None}, status=500)
            


class RecipeDetailView(APIView):
    """
    GET /api/recipes/{id}/
    Fetches full recipe details from the TheMealDB API
    """

    def get(self, request, recipe_id):
        
        try:
            # Fetch from TheMealDB
            url = f'https://www.themealdb.com/api/json/v1/1/lookup.php?i={recipe_id}'
            response = requests.get(url)
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'meals': None}, status=500)
        

class CategoriesListView(APIView):
    """
    Get/api/categories/
    Fetch all categories from TheMealDB
    """
    
    def get(self, request):
        
        try:
            # Fetch from TheMealDB
            url = f'https://www.themealdb.com/api/json/v1/1/categories.php'
            response = requests.get(url)
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'categories': None}, status=500)
        

class RecipesByCategoryView(APIView):
    """
    GET /api/recipes/category/{category_name}/
    Fetch recipes by category from TheMEalDB API
    """        
    def get(self, request, category_name):
        try:
            # Fetch from TheMealDB
            url = f'https://www.themealdb.com/api/json/v1/1/filter.php?c={category_name}' 
            response = requests.get(url)
            data = response.json()
            return Response(data)
        except Exception as e:
            return Response({'meals': None}, status=500)
        
           
    
