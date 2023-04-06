from django.urls import path
from .views import release,count_banknotes

app_name = 'atm'
urlpatterns = [
    path('', release,name='release'),
    path('count/', count_banknotes,name='count_banknotes'),
]
