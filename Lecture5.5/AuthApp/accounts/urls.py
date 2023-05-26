from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_request, profile_request, home_request

app_name = "main"

urlpatterns = [
    path("", home_request, name="home"),
    path("register", register_request, name="register"),
    path("login", LoginView.as_view(template_name='main/login.html'), name="login"),
    path("logout", LogoutView.as_view(next_page='/'), name="logout"),
    path("profile", profile_request, name="profile"),
]