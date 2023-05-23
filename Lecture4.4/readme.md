# Django User Input: Building a Book Review App

Welcome to our tutorial on handling user input in Django! Today, we'll be creating a practical application where users can submit book reviews and rate books. This exercise will give us hands-on experience with Django models, forms, views, and templates.

## Getting Started

To start, please clone the linked GitHub repository which contains all the code we'll be working with today. It's recommended to also view the screen recording of the working application to understand the flow and functionality of the app.

## Prerequisites

Ensure that you have Django installed on your machine. If not, install Django by running:

    pip install django

## Step 1: Setting up the Project

First, we need to create a new Django project and an app within this project. Open your terminal and run the following commands:

    django-admin startproject reviewApp
    cd reviewApp
    python manage.py startapp review

This will create a new Django project "reviewApp" and a new app "review".

## Step 2: Creating a Django Model

Create a model named `BookReview` in the `models.py` file in your `review` app. This model will be used to store the reviews and ratings:

```python
from django.db import models

class BookReview(models.Model):
    review = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return self.review
```
After creating the model, run the following command to create the database table for the model:
````
python manage.py makemigrations review
python manage.py migrate
````
## Step 3: Creating a Django Form

Our next step is creating a Django form for users to input their book review and rating. The form is defined in `forms.py` as follows:

```python
from django import forms
from .models import BookReview

class ReviewForm(forms.ModelForm):
    class Meta:
        model = BookReview
        fields = ['review', 'rating']

```
This form includes a textarea for the review and an integer field for the rating.

## Step 4: Creating a Django View
Next, we need to create a Django view to handle form submissions. We use a function-based view in views.py to handle the POST request when the form is submitted and render the form when the page is first loaded:
````
from django.shortcuts import render, redirect
from .forms import ReviewForm
from .models import BookReview

def review(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('review')
    else:
        form = ReviewForm()

    reviews = BookReview.objects.all()
    return render(request, 'review.html', {'form': form, 'reviews': reviews})

````
## Step 5: Setting up the URLs
Now, we need to tell Django to use the view we created when the user navigates to a certain path. Update urls.py in your review app to look like this:
````
from django.urls import path
from .views import review

urlpatterns = [
    path('', review, name='review'),
]

````
Then, include the review URLs in your project's urls.py:
````
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('review/', include('review.urls')),
]
````
## Step 6: Creating a Django Template
Lastly, we need to create a Django template to display our form to the user. We use Django's form rendering in our template review.html:

````
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit review</button>
</form>

{% for review in reviews %}
    <p>{{ review.review }} - Rating: {{ review.rating }}</p>
{% endfor %}

````
## Step 7: Run the Server
Now we're ready to run the server. Use the following command to start the server:
````
python manage.py runserver
````
You should see output telling you that the server is running, along with the address where you can access it, which is usually http://127.0.0.1:8000/review.

## Step 8: Open the Application in a Browser
Open a web browser and navigate to the address of the running server. You should see the form for submitting a book review.

Experiment and Learn
You now have a fully functional Django application where users can submit book reviews and rate books. Try running the application locally, submitting a review, and exploring the codebase. Feel free to tweak the code and experiment with Django's form handling capabilities.

Remember, learning is about understanding and doing. Don't hesitate to break the code and fix it again, as this is a great way to learn and understand how things work.

If you encounter any issues or have questions, feel free to ask them in our course discussion forum. Happy coding!