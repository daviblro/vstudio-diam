from rest_framework import serializers
from .models import CustomUser, Category, Product, Review, Order, OrderItem, Cart, CartItem
from django.contrib.auth import authenticate

# Serializer para mostrar dados do utilizador
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff']

# Serializer para autenticação (login)
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Utilizador com este email não existe.")

        user = authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError("Credenciais inválidas.")

        if not user.is_active:
            raise serializers.ValidationError("Credenciais válidas, mas a conta está desativada.")

        data['user'] = user
        return data

# --- Category ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# --- Product ---
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

# --- Review ---
class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['id', 'user', 'created_at']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'username': obj.user.username,
            'email': obj.user.email
        } if obj.user else None

# --- OrderItem ---
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

# --- Order ---
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

# --- CartItem ---
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product', 'product_id', 'cart']
        read_only_fields = ['id', 'cart']

# --- Cart ---
class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)  # Importante para listar os itens

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']
