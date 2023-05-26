# 6.5 Hands-on: Building a RESTful API with Django

Welcome, scholars! In this hands-on session, we're diving into the practical world by creating a RESTful API using Django and Django REST Framework (DRF). We're building a 'Blog' application with functionalities for posts and comments. The aim is to help you comfortably design, implement, and test a RESTful API with Django.

## Objective:
By the end of this session, you'll have a running Blog API capable of performing CRUD (Create, Read, Update, Delete) operations for posts and comments.

## Prerequisites:
You need Python 3 installed on your computer. You also need to install Django and Django REST Framework. 

Use the following commands to install these packages:

```bash
pip install django
pip install djangorestframework
```
## Getting Started:
We'll begin by setting up a new Django project and creating a new app within it. Run the following commands to create your project and app:

````
django-admin startproject BlogAPI
cd BlogAPI
python manage.py startapp blog
````

After creating your new app, make sure to add it and the Django REST Framework to the INSTALLED_APPS list in the BlogAPI/settings.py file:

````
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'blog',
]
````

## Creating Models:
Within the 'blog' app, let's create our Post and Comment models. Update the blog/models.py file with the following code:

````
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text
````

After defining the models, it's time to create the database schema. Run the following commands:

````
python manage.py makemigrations blog
python manage.py migrate
````

## Creating Serializers:
Serializers allow complex data types, like querysets and model instances, to be converted into Python data types that can be easily rendered into JSON. Let's create serializers for our models. Update blog/serializers.py file with the following code:

````
from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['author', 'text', 'created_date']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'pub_date', 'comments']
````
## Creating Views:
Let's use Django's generic views to write our views. Here's how it's done. Update blog/views.py file with the following code:

````
from rest_framework import generics
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
````

## Setting Up URL Routing:
Let's create URL routes for our views. In the blog/urls.py file, add the following:

````
from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostList.as_view(), name='post_list'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('comments/', views.CommentList.as_view(), name='comment_list'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment_detail'),
]
````
Include the URLs of the 'blog' app in BlogAPI/urls.py:
````
from django.urls import include, path

urlpatterns = [
    path('', include('blog.urls')),
]
````

## Testing Our API:
Now, it's time to test our API. First, run the server:
````
python manage.py runserver
````
Test the API using a tool like curl, Postman, or even the built-in DRF browsable API. Access the API at http://127.0.0.1:8000/posts/ and http://127.0.0.1:8000/comments/.

If you encounter any issues or have questions, don't hesitate to reach out. Happy coding!