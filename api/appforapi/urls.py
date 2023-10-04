from django.urls import path,include
from . import views

urlpatterns = [
    path('get-auth-url/',views.get_auth_url),
    path('redirect/',views.redirectView),
    path('get-top-artists/',views.get_top_artists),
    path('get-top-tracks/',views.get_top_tracks),
    path('get-user-authenticated/',views.get_user_authenticated),
    path('logout/',views.logout),
    path('get-audio-features/',views.get_audio_features),
]