from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ingredient_type = models.CharField(max_length=200, blank=True,null=True)


class Category(models.Model):
    name = models.CharField(max_length=50)
    thumbnail = models.URLField(max_length=500, blank=True)
    
    
class Recipe(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name='recipes')
    area = models.CharField(max_length=100, blank=True)
    instructions = models.TextField()
    thumbnail = models.URLField(max_length=500,blank=True)
    youtube_link = models.URLField(max_length=500, blank=True,null=True)
    
    
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE,related_name='recipe_ingredients')
    ingredient = models.ForeignKey(Ingredient,on_delete=models.CASCADE)
    measure = models.CharField(max_length=300)
    order = models.IntegerField()
    
    
    