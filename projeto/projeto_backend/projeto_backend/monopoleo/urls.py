from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    CategoryViewSet,
    ReviewViewSet,
    OrderViewSet,
    CartViewSet,
    UserViewSet,
    login_view,
    logout_view,
    signup_view,
    change_password_view,
    NovidadesViewSet,
    DestaquesViewSet,
    CartItemViewSet,
    ProductPublicViewSet,
    MaisVendidosViewSet,
    finalizar_compra,
    PromocoesViewSet,
    UsersManagementViewSet,
    ResultadosPesquisaViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'cart', CartViewSet)
router.register(r'users', UserViewSet)
router.register(r'novidades', NovidadesViewSet, basename='novidades')
router.register(r'destaques', DestaquesViewSet, basename='destaques')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')
router.register(r'products-public', ProductPublicViewSet, basename='products-public')
router.register(r'mais-vendidos', MaisVendidosViewSet, basename='mais-vendidos')
router.register(r'promocoes', PromocoesViewSet, basename='promocoes')
router.register(r'resultados-pesquisa', ResultadosPesquisaViewSet, basename='resultados-pesquisa')
router.register(r'users-management', UsersManagementViewSet, basename='users-management')

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('signup/', signup_view),
    path('change-password/', change_password_view),
    path('checkout/', finalizar_compra, name='checkout'),
    path('', include(router.urls)),
]
