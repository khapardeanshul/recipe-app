from django.shortcuts import render
from rest_framework.views import APIView
from .models import Ingredient, Category, Recipe, RecipeIngredient
from .serializers import IngredientSerializer, RecipeListSerializer, RecipeDetailSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator
import requests

# Create your views here.

class IngredientListView(APIView):
    """
    GEt /api/ingredients/
    Returns all ingredients from the Database
    """
    
    def get(self, request):
        try:
            search = request.query_params.get('search','')
            page_number = int(request.query_params.get('page', 1))
            page_size = 20
            
            # 1. Filter 
            if search:
                ingredients = Ingredient.objects.filter(name__icontains=search).order_by('name')
            else:    
                ingredients = Ingredient.objects.all().order_by('name')
                
            # 2. Paginate
            paginator = Paginator(ingredients, page_size) 
            page_obj = paginator.get_page(page_number)
            
            serializer = IngredientSerializer(page_obj.object_list, many=True)
            
            return Response(
                {
                    "message": "Ingredients Fetched Successfully.",
                    "total_pages": paginator.num_pages,
                    "page": page_number,
                    "total_count": paginator.count,
                    "meals": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
            
        except Exception as e:
            return Response (
               {
                "message": "Failed to fetch ingredients.",
                "error": str(e),
               },
               status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )    

     

class RecipesByIngredientView(APIView):
    """
    GET /api/recipes/?ingredient={ingredient_name}
    Returns Recipes from the Database 
    """
    
    def get(self, request):
        
        ingredient_name = request.query_params.get('ingredient', None)
        search = request.query_params.get('search', '')
       
        try:
            if not ingredient_name:
                recipes = Recipe.objects.all()
                
            else:
                recipes = Recipe.objects.filter(recipe_ingredients__ingredient__name__iexact=ingredient_name).distinct()  
                
            
            if search:
                recipes = recipes.filter(name__icontains=search)    
            
            if not recipes.exists():
                return Response(
                    {
                        "message": "No recipes found.",
                        "meals": [],
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        
            serializer = RecipeListSerializer(recipes, many=True)
            return Response(
                {
                    "message": "Recipes fetched successfully",
                    "meals": serializer.data, 
                },
                status=status.HTTP_200_OK,
            )  
        except Exception as e:
            return Response (
                {
                    "message": "Failed to fetch recipes.",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )              


class RecipeDetailView(APIView):
    """
    GET /api/recipes/{id}/
    Fetches full recipe details from the TheMealDB API
    """

    def get(self, request, recipe_id):
        
        try:
            recipe = Recipe.objects.get(id=recipe_id)
            serializer = RecipeDetailSerializer(recipe)
            return Response(
                {
                    "message": "Recipe fetched successfully.",
                    "meals": [serializer.data],
                },
                status=status.HTTP_200_OK
            )
        except Recipe.DoesNotExist:
            return Response(
                {
                    "meals": "Recipe not found",
                    
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response (
                {
                    "message": "Failed to fetch recipe.",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )    
        

class CategoriesListView(APIView):
    """
    Get/api/categories/
    Returns all categories from Database
    """
    
    def get(self, request):
        try:
            categories = Category.objects.all().order_by('name')
            serializer = CategorySerializer(categories, many=True)
        
            return Response(
                {
                    "message": "Categories fetched successfully",
                    "categories": serializer.data,
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response (
                {
                    "message": "Failed to fetch Categories.",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )    

        
        

class RecipesByCategoryView(APIView):
    """
    GET /api/recipes/category/{category_name}/
    Returns all Recipes by categories from the Database
    """        
    def get(self, request, category_name):
        search = request.query_params.get('search', None)
        try:
            category = Category.objects.get(name__iexact=category_name)
            recipes = Recipe.objects.filter(category=category)
            
            if search:
                recipes = recipes.filter(name__icontains=search )
            
            if not recipes.exists():
                return Response(
                    {
                        "message": "Recipe not found for this Category.",
                        "meals": [],
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
            
            serializer = RecipeListSerializer(recipes, many=True)
            return Response(
                {
                    "message": "Recipes fetched Successfully.",
                    "meals": serializer.data,
                },
                status=status.HTTP_200_OK,
            )
            
        except Category.DoesNotExist:
            return Response(
                {
                    "message": "Category not found",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        
        except Exception as e:
            return Response (
                {
                    "message": "Failed to fetch recipes.",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )    

        
           
    
