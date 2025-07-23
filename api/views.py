from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import check_password
from .serializers import UserProfileSerializer
from .models import UserProfile
import json
@csrf_exempt
def sign_up(request):
    if request.method == "POST":
        try:
            data = JSONParser().parse(request)

            # Basic validation
            required_fields = ['email', 'password', 'contact_number']
            for field in required_fields:
                if not data.get(field):
                    return JsonResponse({"error": f"{field} is required."}, status=400)
            serializer = UserProfileSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "User registered successfully!"}, status=201)
            else:
                return JsonResponse(serializer.errors, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method."}, status=405)
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')
        password = data.get('password')
        occupation = data.get('occupation')

        try:
            user = UserProfile.objects.get(email=email, occupation=occupation)
        except UserProfile.DoesNotExist:
            return JsonResponse({"error": "Invalid email or occupation"}, status=401)

        if check_password(password, user.password):
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid password"}, status=401)
@csrf_exempt
def user_dashboard(request):
    if request.method == 'GET':
        users = UserProfile.objects.all().values('email', 'occupation', 'contact_number', 'experience', 'age')
        return JsonResponse(list(users), safe=False)