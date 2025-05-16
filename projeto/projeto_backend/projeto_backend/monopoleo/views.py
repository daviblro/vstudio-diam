from .models import CustomUser as User
from .models import Product, Category, Review, Order, OrderItem, Cart, CartItem
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.db.models import Avg
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from .serializers import LoginSerializer, UserSerializer, ProductSerializer, CartItemSerializer, CategorySerializer, ReviewSerializer, OrderSerializer, CartSerializer


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
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Product.objects.all()  # Admin vê tudo
        return Product.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def update(self, request, *args, **kwargs):
        product = self.get_object()
        if request.user != product.owner and not request.user.is_staff:
            return Response({'error': 'Sem permissão para editar este produto.'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        if request.user != product.owner and not request.user.is_staff:
            return Response({'error': 'Sem permissão para apagar este produto.'}, status=status.HTTP_403_FORBIDDEN)
        # Deleta a imagem associada, se existir
        if product.image and default_storage.exists(product.image.name):
            product.image.delete(save=False)
        return super().destroy(request, *args, **kwargs)


class ProductPublicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class MaisVendidosViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    queryset = Product.objects.all().order_by('times_purchased')

    def get_queryset(self):
        queryset = Product.objects.all().order_by('times_purchased')
        return queryset[:10]


# --- Categoria ---
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


# --- Avaliações ---
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Garante que o utilizador veja apenas o seu carrinho
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Não é esperado criar carrinhos manualmente via API, pois o signal já cuida disso
        serializer.save(user=self.request.user)


class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    queryset = Cart.objects.all()

    def get_queryset(self):
        user = self.request.user
        cart = Cart.objects.get(user=user)
        return CartItem.objects.filter(cart=cart)

    def create(self, request, *args, **kwargs):
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)

        product_id = request.data.get('product_id') or request.data.get('product')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "Produto é obrigatório"}, status=status.HTTP_400_BAD_REQUEST)

        # Obter o objeto produto
        try:
            product_obj = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Produto não existe."}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica se já existe item no carrinho para esse produto
        existing_item = CartItem.objects.filter(cart=cart, product=product_obj).first()

        if existing_item:
            existing_item.quantity += quantity
            existing_item.save()
            serializer = self.get_serializer(existing_item)
            return Response({
                "message": "Quantidade atualizada no carrinho.",
                "item": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(cart=cart, product=product_obj, quantity=quantity)
            return Response({
                "message": "Produto adicionado ao carrinho com sucesso.",
                "item": serializer.data
            }, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['patch'])
    def decrement(self, request, pk=None):
        cart_item = self.get_object()
        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


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
class NovidadesViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        return Product.objects.all().order_by('-created_at')[:5] # Retorna os 5 produtos mais recentes
    
# --- Destaques ---
class DestaquesViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        return (
            Product.objects.annotate(avg_rating=Avg('reviews__rating'))
            .order_by('-avg_rating')[:5]
        ) # Retorna os 5 produtos mais bem avaliados