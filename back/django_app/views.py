from django.core.paginator import Paginator
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

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

    serialized_books = [{"id": x.id, "title": x.title, 'description': x.description} for x in page.object_list]
    # "book_file": x.book_file
    total_count = len(books)
    return Response({"serialized_books": serialized_books, "total_count": total_count, "sort": sort})


@api_view(['GET'])
def get_book(request: Request, book_id: str) -> Response:
    book = Book.objects.get(id=int(book_id))
    serializer_book = {"id": book.id, "title": book.title, 'description': book.description}
    return Response({"data": serializer_book})
