import datetime
from django.utils import timezone

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.db.models import QuerySet

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django_app import serializers, utils
from django_app.models import Book, CustomUser, Logs
from django_app.utils import password_check, get_client_ip
from django.views.decorators.cache import cache_page


@api_view(["POST"])
@permission_classes([AllowAny])
def user_login(request: Request) -> Response:
    username = request.data.get("username", None)
    password = request.data.get("password", None)

    if not username or not password:
        return Response(
            {"error": "Username, password or email not provided"}, status=400
        )

    user = authenticate(request, username=username, password=password)

    login_count = Logs.objects.filter(
        user=user, date__gt=timezone.now() - datetime.timedelta(minutes=10)
    ).count()

    if login_count > 10:
        return Response({"error": "AYAYA, dont ddose"}, status=401)

    Logs.objects.create(
        user=user, ip_address=get_client_ip(request), date=timezone.now()
    )

    serialized_user = serializers.CustomUserSerializer(
        CustomUser.objects.get(user=user), many=False
    ).data
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": serialized_user,
        },
        status=201,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request: Request) -> Response:
    username = request.data.get("username", None)
    email = request.data.get("email", None)
    password = request.data.get("password", None)
    avatar = request.data.get("avatar", None)

    if not username or not email or not password:
        return Response(
            {"error": "Username, password or email not provided"}, status=400
        )

    if not password_check(password):
        return Response({"error": "Password is invalid"}, status=400)

    user = User.objects.create(
        username=username,
        email=email,
        password=make_password(password),
    )
    CustomUser.objects.create(user=user, avatar=avatar)
    refresh = RefreshToken.for_user(user)

    serialized_user = serializers.CustomUserSerializer(
        CustomUser.objects.get(user=user), many=False
    ).data

    return Response(
        {
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "serialized_user": serialized_user,
        },
        status=201,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_user(request: Request) -> Response:
    try:
        refresh_token = request.data["refresh_token"]
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful"}, status=200)
    except Exception as error:
        return Response({"error": str(error)}, status=400)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_users(request: Request) -> Response:
    users = CustomUser.objects.all()
    serialized_users = serializers.CustomUserSerializer(instance=users, many=True).data
    return Response(serialized_users)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@cache_page(60 * 15)
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

    serialized_books = serializers.BookSerializer(
        page, many=True if isinstance(books, QuerySet) else False
    ).data
    total_count = len(books)
    return Response(
        {"serialized_books": serialized_books, "total_count": total_count, "sort": sort}
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_book(request: Request, book_id: str) -> Response:
    book = Book.objects.get(id=int(book_id))
    serialized_book = serializers.BookSerializer(
        book, many=True if isinstance(book, QuerySet) else False
    ).data
    return Response({"data": serialized_book})
