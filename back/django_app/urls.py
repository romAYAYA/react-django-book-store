from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from django_app import views

urlpatterns = [
    # user
    path("api/users/", views.get_users, name="get_users"),
    # authorization / registration
    path("api/register", views.register, name="register"),
    path("api/login/", views.user_login, name="user_login"),
    #
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    # book
    path("api/book/", views.get_books, name="book_list"),
    path("api/book/<str:book_id>/", views.get_book, name="book_detail"),
]
