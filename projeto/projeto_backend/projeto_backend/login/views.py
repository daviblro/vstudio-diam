from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from django.http import JsonResponse


# Create your views here.

@api_view(['POST'])
def login_view(request):
 username = request.data.get('username')
 password = request.data.get('password')
 user = authenticate(request, username=username, password=password)
 print(f"Username: {username}, Password: {password}")
 if user is not None:
    login(request, user) # Criação da sessão
    return Response({'message': 'Logged in successfully'})
 else:
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def logout_view(request):   
 logout(request)
 return Response({'message': 'Logged out successfully'})


@api_view(['POST'])
def signup_view(request):
 username = request.data.get('username')
 password = request.data.get('password')
 if username is None or password is None:
    return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
 if User.objects.filter(username=username).exists():
    return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
 user = User.objects.create_user(username=username, password=password)
 return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
 return Response({'username': request.user.username})

@api_view(['GET'])
def csrf_view(request):
    return JsonResponse({'csrfToken': get_token(request)})