from django.urls import path
from django_app import views

urlpatterns = [
    path("api/book/", views.get_books, name="book_list"),
    path("api/book/<str:book_id>/", views.get_book, name="book_detail"),
]
