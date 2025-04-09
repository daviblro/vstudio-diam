from django.urls import path
from . import views

urlpatterns = [
    path('api/questions/', views.questions),
    path('api/question/<int:question_id>', views.question_detail),
    path('api/options/<int:question_id>', views.options),
    path('api/option/<int:option_id>', views.option_detail),
]