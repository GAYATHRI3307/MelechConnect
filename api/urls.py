from django.urls import path
from .views import sign_up,login_user  # Import the sign-up view
from . import views
urlpatterns = [
    path("sign_up/", sign_up), 
    path('login/', login_user), # Ensure this matches frontend API call
    path('User Profiles/', views.user_dashboard, name='user_dashboard'),
]
