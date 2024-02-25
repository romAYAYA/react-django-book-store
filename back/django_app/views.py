from django.core.paginator import Paginator
from django.db.models import QuerySet
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from django_app import serializers
from django_app.models import Book


@api_view(['GET'])
def get_books(request: Request) -> Response:
    sort = request.GET.get("sort", "desc")

    books = Book.objects.all()

    match sort:
        case "name_asc":
            books = books.order_by("title")
        case "name_desc":
            books = books.order_by("-title")
        case _:
            books = books.order_by("title")

    selected_page = request.GET.get(key="page", default=1)
    pages = Paginator(object_list=books, per_page=20)
    page = pages.page(number=selected_page)

    serialized_books = serializers.BookSerializer(page, many=True if isinstance(books, QuerySet) else False).data
    total_count = len(books)
    return Response({"serialized_books": serialized_books, "total_count": total_count, "sort": sort})


@api_view(['GET'])
def get_book(request: Request, book_id: str) -> Response:
    book = Book.objects.get(id=int(book_id))
    serialized_book = serializers.BookSerializer(book, many=True if isinstance(book, QuerySet) else False).data
    return Response({"data": serialized_book})
