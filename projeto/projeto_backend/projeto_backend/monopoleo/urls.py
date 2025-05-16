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

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('signup/', signup_view),
    path('change-password/', change_password_view),
    path('', include(router.urls)),
]
