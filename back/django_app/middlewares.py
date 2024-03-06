import datetime
from django.utils import timezone

from django_app.models import LoginLogs
from django_app.utils import get_client_ip


class CheckRequestsCount(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_ip = get_client_ip(request)
        second_ago = timezone.now() - datetime.timedelta(seconds=1)
        LoginLogs.objects.create(user=None, ip_address=user_ip, date=timezone.now())

        login_count = LoginLogs.objects.filter(
            ip_address=user_ip, date__gt=second_ago
        ).count()

        if login_count > 10:
            raise Exception("Too many requests per second")

        response = self.get_response(request)

        return response
