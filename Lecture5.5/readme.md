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

## Step 2: User Registration

We are going to use Django's built-in UserCreationForm for the registration process. We will extend this form to include an email field.

To implement this, create a `forms.py` file in your accounts app directory and add the following code:

```python
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
```
Next, let's create a view to handle this form. In your views.py file in the accounts app directory, add the following code:
```python
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
            return redirect("main:homepage")
        messages.error(request, "Unsuccessful registration. Invalid information.")
    form = NewUserForm()
    return render (request=request, template_name="main/register.html", context={"register_form":form})
```

## Step 3: Creating the Registration Template
Let's create a template to display our registration form. Create a register.html file in your templates directory and add the following code:

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
## Step 4: Configuring the URLs
Next, configure the URL for our registration view. In your urls.py file in the accounts app directory, add the following code:

````
from django.urls import path
from .views import register_request

app_name = "main"

urlpatterns = [
    path("register", register_request, name="register"),
]
````

## Step 5: User Login and Logout
Now let's implement user login and logout using Django's built-in views. Update your urls.py file with the following code:

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
## Step 6: Creating the Login Template
Next, we need to create a template for the login view. Create a login.html file in your templates directory and add the following code:

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

## Step 7: User Profile View
Next, let's add a profile view that will be accessible only to logged-in users. Update your views.py file with the following code:

````
from django.contrib.auth.decorators import login_required

@login_required
def profile_request(request):
    return render(request, 'main/profile.html')
````

And add the corresponding URL pattern in your urls.py file:

````
from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_request, profile_request

app_name = "main"

urlpatterns = [
    path("register", register_request, name="register"),
    path("login", LoginView.as_view(template_name='main/login.html'), name="login"),
    path("logout", LogoutView.as_view(), name="logout"),
    path("profile", profile_request, name="profile"),
]
````
## Testing the Application
To run the server and test the application, navigate to the root directory of the project where manage.py is located. Then, run the following command:

````
python manage.py runserver
````
Open a web browser and navigate to http://127.0.0.1:8000/. You should be able to see the Django default page. Append /register, /login, or /profile to the URL to access your newly created views.

Congratulations! You've just created a user-authenticated app with Django. In the next exercises, we'll explore how to implement role-based permissions and authorization. But for now, happy coding!