from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Create your views here.

@api_view(['POST'])
def login_view(request):
    
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user_obj = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Email não encontrado'}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(request, username=user_obj.username, password=password)

    if user is not None:
        login(request, user)
        return Response({'success': True, 'user': {'username': user.username, 'email': user.email}}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout_view(request):   
 logout(request)
 return Response({'message': 'Logged out successfully'})


@api_view(['POST'])
def signup_view(request):
 email = request.data.get('email')
 username = request.data.get('username')
 password = request.data.get('password')
 if email is None or password is None or username is None:
    return Response({'error': 'Email, username e password são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)
 if User.objects.filter(email=email).exists():
    return Response({'error': 'Email já existe'}, status=status.HTTP_400_BAD_REQUEST)
 if User.objects.filter(username=username).exists():
    return Response({'error': 'Username já existe'}, status=status.HTTP_400_BAD_REQUEST)
 
 user = User.objects.create_user(username=username, email=email, password=password)
 return Response({'success': True, 'user': {'username': user.username, 'email': user.email}, 'message': 'Utilizador criado com sucesso.'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
 return Response({'username': request.user.username})

@api_view(['GET'])
def csrf_view(request):
    return JsonResponse({'csrfToken': get_token(request)})