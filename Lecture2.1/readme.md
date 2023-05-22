# Lecture 2.1: Setting up a Django project

This lecture will guide you through the steps to set up a new Django project. Django is a robust, high-level Python web framework that promotes rapid development and clean, pragmatic design. 

## Project Structure
A Django project can be thought of as a blueprint for a specific web application, comprising one or more Django apps. Each app serves as a reusable module catering to a particular functionality. Here's a brief overview of the major components:

- **manage.py**: A command-line utility that lets you manage various aspects of your Django project.
- **__init__.py**: An empty file signifying that this directory should be considered a Python package.
- **asgi.py and wsgi.py**: Entry points for ASGI and WSGI servers, respectively. They are the interfaces between your web server and Python web applications.
- **settings.py**: Contains all your Django project's settings and configurations.
- **urls.py**: Defines the URL routes for your project.

## Setup Instructions

Follow these steps to set up your Django environment and create the project:

1. **Navigate to your desired directory**:
    Open your terminal or command prompt and navigate to the directory where you want to create your project.

2. **Install Django**:
    If you haven't installed Django yet, you can do so using pip, the Python package installer:

    ```bash
    pip install django
    ```

3. **Create a new Django project**:
    Use the following command to create a new Django project named "myproject". You can replace 'myproject' with your preferred project name.

    ```bash
    django-admin startproject myproject
    ```

4. **Navigate to your project directory**:
    Change your current directory to the new Django project:

    ```bash
    cd myproject
    ```

5. **Run the development server**:
    To ensure that everything is set up correctly, start the Django development server using the following command:

    ```bash
    python manage.py runserver
    ```

    You can now open a web browser and navigate to 'http://127.0.0.1:8000/'. If you see the default Django welcome page, congratulations! You've successfully set up your Django project.

Enjoy your journey into Django development!
