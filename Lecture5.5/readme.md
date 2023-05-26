# 5.5 Hands-On: Building a User-Authenticated App

Welcome to our hands-on exercise on Django Authentication. In this exercise, we will create a new Django application, "AuthApp", that implements a user authentication system complete with user registration, login, logout functionalities, and a user profile view. 

## Prerequisites

Ensure that you have Django installed on your machine. If not, install Django by running:

    pip install django

## Step 1: Setting up the Project

First, we need to create a new Django project and an app within this project. Open your terminal and run the following commands:

    django-admin startproject AuthApp
    cd AuthApp
    python manage.py startapp accounts

This will create a new Django project "AuthApp" and a new app "accounts".

## Step 2: Configuration
Before we proceed, let's confirm that `AuthenticationMiddleware` is included in your settings. Open `settings.py` in the `AuthApp` directory and check the `MIDDLEWARE` configuration. It should look something like this:

````python
MIDDLEWARE = [
    '...',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    '...',
]
````

Next, open AuthApp/settings.py again and add accounts to the INSTALLED_APPS list. This is to ensure Django recognizes the accounts app:
````
INSTALLED_APPS = [
    '...',
    'accounts',
]
````
Also in settings.py, specify URLs where Django should redirect after successful login and where to redirect for login respectively:
````
LOGIN_REDIRECT_URL = 'main:profile'
LOGIN_URL = 'main:login'
````
Now, let's set up URLs for our application. Open AuthApp/urls.py and add the path to include accounts.urls. It should look like this:

````
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),  # Include URLs from the accounts app
]
````

## Step 3: User Registration
We are going to use Django's built-in UserCreationForm for the registration process. We will extend this form to include an email field.

To implement this, create a forms.py file in your accounts app directory and add the following code:

````
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NewUserForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
````

Next, let's create a view to handle this form. In your views.py file in the accounts app directory, add the following code:
````
from django.shortcuts import render, redirect
from .forms import NewUserForm
from django.contrib.auth import login
from django.contrib import messages

def register_request(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful." )
            return redirect("main:home")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render (request=request, template_name="main/register.html", context={"register_form":form})
````

## Step 4: Creating the Registration Template
Let's create a template to display our registration form. Create a register.html file in your accounts/templates/main directory and add the following code:

````
{% extends "main/header.html" %}

{% block content %}
    <h2>Register</h2>
    <form method="POST">
        {% csrf_token %}
        {{ register_form.as_p }}
        <button type="submit">Register</button>
    </form>
{% endblock %}
````
## Step 5: Configuring the URLs
Next, configure the URL for our registration view. In your accounts/urls.py file, add the following code:

````
from django.urls import path
from .views import register_request

app_name = "main"

urlpatterns = [
    path("register", register_request, name="register"),
]
````
## Step 6: User Login and Logout
Now let's implement user login and logout using Django's built-in views. Update your accounts/urls.py file with the following code:

````
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_request

app_name = "main"

urlpatterns = [
    path("register", register_request, name="register"),
    path("login", LoginView.as_view(template_name='main/login.html'), name="login"),
    path("logout", LogoutView.as_view(), name="logout"),
]
````

Next, we need to create a template for the login view. Create a login.html file in your accounts/templates/main directory and add the following code:

````
{% extends "main/header.html" %}

{% block content %}
    <h2>Login</h2>
    <form method="POST">
        {% csrf_token %}
        {{ form.as_p }}
        <button type="submit">Login</button>
    </form>
{% endblock %}
````
## Step 7: User Logout
We will use Django's built-in LogoutView. Add the import statement and the URL pattern in your accounts/urls.py file.

````
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path("logout", LogoutView.as_view(next_page='/'), name="logout"),
    # ...
]
````
## Step 8: User Profile View
Next, let's add a profile view that will be accessible only to logged-in users. Update your views.py file with the following code:

````
from django.contrib.auth.decorators import login_required

@login_required
def profile_request(request):
    return render(request, 'main/profile.html')
````
Create a profile.html file in your accounts/templates/main directory.

````
{% extends "main/header.html" %}

{% block content %}
    <h2>Profile</h2>
    <p>User: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
{% endblock %}

````
And add the corresponding URL pattern in your accounts/urls.py file:
````
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_request, profile_request

app_name = "main"

urlpatterns = [
    path("register", register_request, name="register"),
    path("login", LoginView.as_view(template_name='main/login.html'), name="login"),
    path("logout", LogoutView.as_view(next_page='/'), name="logout"),
    path("profile", profile_request, name="profile"),
]
````

## Step 9: Home View and Template
We create a home view for the root ('/') URL and a template for it.

Add this function to views.py:

````
def home_request(request):
    return render(request, 'main/home.html')
````
Create a home.html file in your accounts/templates/main directory.
````
{% extends "main/header.html" %}

{% block content %}
    <h2>Welcome to the Home Page</h2>
{% endblock %}
````
Update urls.py with a URL pattern for the new view:

````
urlpatterns = [
    path("", home_request, name="home"),
    # ...
]
````

## Step 8: Create a Base Template
Create a new file called header.html in the accounts/templates/main directory. This will be the base template for your application. You can include common elements like navigation links here. For instance:
````
<!DOCTYPE html>
<html>
<head>
    <title>Django Auth App</title>
</head>
<body>
    <nav>
        <a href="{% url 'main:home' %}">Home</a> |
        {% if user.is_authenticated %}
            <a href="{% url 'main:profile' %}">Profile</a> |
            <a href="{% url 'main:logout' %}">Logout</a>
        {% else %}
            <a href="{% url 'main:login' %}">Login</a> |
            <a href="{% url 'main:register' %}">Register</a>
        {% endif %}
    </nav>
    {% block content %}{% endblock %}
</body>
</html>

````

## Testing the Application
To run the server and test the application, navigate to the root directory of the project where manage.py is located. Then, run the following command:

````
python manage.py makemigrations
python manage.py migrate

python manage.py runserver
````
Open a web browser and navigate to http://127.0.0.1:8000/. You should be able to see the Django default page. Append /register, /login, or /profile to the URL to access your newly created views.

Congratulations! You've just created a user-authenticated app with Django. In the next exercises, we'll explore how to implement role-based permissions and authorization. But for now, happy coding!