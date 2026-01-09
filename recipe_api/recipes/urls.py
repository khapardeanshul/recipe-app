from django.urls import path
from .views import (
    IngredientListView, 
    RecipesByIngredientView, 
    RecipeDetailView,
    CategoriesListView,
    RecipesByCategoryView,
    )

urlpatterns = [
    path('ingredients/', IngredientListView.as_view(), name='ingredient-list'),
    path('recipes/', RecipesByIngredientView.as_view(), name='recipes-by-ingredient'),
    path('recipes/<int:recipe_id>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('categories/', CategoriesListView.as_view(), name='category-list'),
    path('recipes/category/<str:category_name>/', RecipesByCategoryView.as_view(), name='recipes-by-category'),
]
