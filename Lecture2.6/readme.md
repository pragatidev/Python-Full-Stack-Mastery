# Lecture 2.6: Building a simple Django app

In this lecture, we will be walking through the process of building a simple Django application from the ground up.

## Setup Instructions

Follow these steps to set up your Django environment and create the app:

1. **Install Django**:
    You'll first need to install Django if you haven't done so yet. This can be done using pip, the Python package installer. Open your terminal and type the following command:

    ```bash
    pip install django
    ```

2. **Start a new Django project**:
    We'll create a new Django project named "HelloWorld". You can replace 'HelloWorld' with your project's name.

    ```bash
    django-admin startproject HelloWorld
    ```

3. **Navigate to your project directory**:
    Change your current directory to the new Django project:

    ```bash
    cd HelloWorld
    ```

4. **Create a new app within your project**:
    We'll create a new app within our project named "Greetings". Think of 'Greetings' as the name of our dish.

    ```bash
    python manage.py startapp Greetings
    ```

5. **Define a view in your app**:
    In the views.py file of our app, we'll create a simple view that returns a warm greeting, like a steaming cup of tea.

    ```python
    from django.http import HttpResponse

    def greeting(request):
        return HttpResponse("Hello, World!")
    ```

6. **Set URL patterns**:
    We'll add a URL pattern for our view in our app's urls.py file. They are like the kitchen timer that tells Django when our greeting is ready.

    ```python
    from django.urls import path
    from . import views

    urlpatterns = [
        path('', views.greeting, name='greeting'),
    ]
    ```

7. **Include the app's URLs in the project's URLs**:
    Finally, we'll tell Django about our new app by including our app's URLs in our project's urls.py file. It's like presenting our dish to the world.

    ```python
    from django.contrib import admin
    from django.urls import include, path

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('greeting/', include('Greetings.urls')),
    ]
    ```

8. **Start the Django development server**:
    Finally, start the Django development server using the following command:

    ```bash
    python manage.py runserver
    ```

    You can now open a web browser and go to 'http://localhost:8000/greeting/' to see your greeting.

Enjoy your journey into Django development!

