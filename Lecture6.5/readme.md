# 6.5 Hands-on: Building a RESTful API with Django

Welcome, scholars! In this hands-on session, we're diving into the practical world by creating a RESTful API using Django and Django REST Framework (DRF). We're building a 'Blog' application with functionalities for posts and comments. The aim is to help you comfortably design, implement, and test a RESTful API with Django.

## Objective:
By the end of this session, you'll have a running Blog API capable of performing CRUD (Create, Read, Update, Delete) operations for posts and comments.

## Getting Started:

1. We'll begin by setting up a new Django project and creating a new app within it. Run the following commands to create your project and app:

    ```bash
    django-admin startproject BlogAPI
    cd BlogAPI
    python manage.py startapp blog
    ```

## Creating Models:

2. Within the 'blog' app, let's create our `Post` and `Comment` models. Update the `blog/models.py` file with the following code:

    ```python
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
    ```

## Creating Serializers:

3. Serializers allow complex data types, like querysets and model instances, to be converted into Python data types that can be easily rendered into JSON. Let's create serializers for our models. Update `blog/serializers.py` file with the following code:

    ```python
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
    ```

In the next steps, we'll focus on creating views, setting up URL routing, and testing our API. We'll also explore handling POST and PUT requests in DRF. 

## Creating Views:

4. Let's use Django's generic views to write our views. Here's how it's done. Update `blog/views.py` file with the following code:

    ```python
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
    ```

## Setting Up URL Routing:

5. Let's create URL routes for our views. In the `blog/urls.py` file, add the following:

    ```python
    from django.urls import path
    from . import views

    urlpatterns = [
        path('posts/', views.PostList.as_view(), name='post_list'),
        path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
        path('comments/', views.CommentList.as_view(), name='comment_list'),
        path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment_detail'),
    ]
    ```

6. Include the URLs of the 'blog' app in `BlogAPI/urls.py`:

    ```python
    from django.urls import include, path

    urlpatterns = [
        path('', include('blog.urls')),
    ]
    ```

## Testing Our API:

7. Now, it's time to test our API. First, run the server:

    ```bash
    python manage.py runserver
    ```

8. Test the API using a tool like curl, Postman, or even the built-in DRF browsable API. Access the API at `http://127.0.0.1:8000/posts/` and `http://127.0.0.1:8000/comments/`.

If you encounter any issues or have questions, don't hesitate to reach out. Happy coding!
