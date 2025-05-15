from .models import CustomUser as User
from .models import Product, Category, Review, Order, OrderItem, Cart, CartItem
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from .serializers import LoginSerializer, UserSerializer, ProductSerializer, CategorySerializer, ReviewSerializer, OrderSerializer, CartSerializer


# Create your views here.

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        user_data = UserSerializer(user).data
        return Response({'success': True, 'user': user_data})
    return Response({'success': False, 'message': serializer.errors}, status=400)

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({'error': 'Senha atual incorreta.'}, status=400)

    if len(new_password) < 6:
        return Response({'error': 'A nova senha deve ter pelo menos 6 caracteres.'}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({'message': 'Senha alterada com sucesso.'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username})

# --- Produto ---
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# --- Categoria ---
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# --- Avaliações ---
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --- Pedidos ---
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --- Carrinho ---
class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def perform_update(self, serializer):
        if serializer.validated_data.get("email"):
            serializer.validated_data.pop("email")  # impedir update de email
        serializer.save()
        
        
# --- Novidades ---
@api_view(['GET'])  
@permission_classes([IsAuthenticated])
def novidades_view(request):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    return Response(serializer_class(queryset, many=True).data) 