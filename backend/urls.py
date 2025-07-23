from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse  # Add this for handling "/"

def home(request):
    return JsonResponse({"message": "API is running"}, status=200)  # Optional root response

urlpatterns = [
    path('',home),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),  # ✅ Include API URLs
]
