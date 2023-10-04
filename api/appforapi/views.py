from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from spotipy.oauth2 import CacheHandler,CacheFileHandler
from . import credentials as cd

sp_oauth = SpotifyOAuth(
        client_id = cd.CLIENT_ID,
        client_secret = cd.CLIENT_SECRET,
        redirect_uri = cd.REDIRECT_URI,
        scope = "user-top-read user-read-email user-read-private user-read-currently-playing"
    )

@api_view(['GET'])
def get_auth_url(request):
    auth_url = sp_oauth.get_authorize_url()
    # print(auth_url)
    data = {
        'auth_url' : auth_url
    }
    return Response(data)

@api_view(['GET','POST'])
def redirectView(request):
    code = request.GET.get('code')
    # print('############# Code :',code,"#################")
    token_info = sp_oauth.get_access_token(code,check_cache=False)
    token = token_info['access_token']
    global sp
    sp = spotipy.Spotify(auth=token)
    user_id = sp.current_user()['uri']
    request.session['token_info'] = token_info
    return redirect("http://localhost:5173/home")
    # return Response(
    #     {
    #         'token_info' : token_info,
    #         'sp' : user_id
    #     }
    # )

@api_view(['GET'])
def get_top_artists(request):
    top_tracks = sp.current_user_top_artists(limit=100,time_range="long_term")
    toptracks_list = []
    for ele in top_tracks['items']:
        toptracks_list.append(ele['album']['images'][0]['url'])
    return Response({
        'data' : toptracks_list
    })

@api_view(['GET'])
def get_top_tracks(request):
    data = sp.current_user_top_tracks(limit=100,time_range="short_term")
    return Response({
        'data' : data
    })

@api_view(['GET'])
def get_user_authenticated(request):
    try:
        data = sp.current_user()
        return Response({
            'data' : data,
            'Authenticated' : "True"
        })
    except NameError:
        return Response({
            'Authenticated' : 'False'
        }) 

@api_view(['GET'])
def logout(request):
    global sp
    sp = ""
    return Response({
        'Authenticated' : 'False'
    })

@api_view(['GET'])
def get_audio_features(request):
    data = sp.current_user_top_tracks(limit=100)
    audio_features_data = []
    dance_sum = 0.0
    acoust_sum = 0.0
    energy_sum = 0.0
    instrument_sum = 0.0
    liveness_sum = 0.0
    loudness_sum = 0.0
    speech_sum = 0.0
    tempo_sum = 0.0
    valence_sum = 0.0
    for ele in data['items']:
        audio_features_data.append(sp.audio_features(ele['uri']))
    length = len(audio_features_data)
    for element in audio_features_data:
        dance_sum += float(element[0]['danceability'])
        acoust_sum += float(element[0]['acousticness'])
        energy_sum += float(element[0]['energy'])
        instrument_sum += float(element[0]['instrumentalness'])
        liveness_sum += float(element[0]['liveness'])
        loudness_sum += float(element[0]['loudness'])
        speech_sum += float(element[0]['speechiness'])
        tempo_sum += float(element[0]['tempo'])
        valence_sum += float(element[0]['valence'])
    
    dance_mean = dance_sum/length
    energy_mean = energy_sum/length
    loudness_mean = loudness_sum/length
    speech_mean = speech_sum/length
    acoust_mean = acoust_sum/length
    instrument_mean = instrument_sum/ length
    liveness_mean = liveness_sum/length
    valence_mean = valence_sum/length
    tempo_mean = tempo_sum/length

    mean_audio_features = {
        'danceability' : round(dance_mean,2),
        'energy' : round(energy_mean,2),
        'loudness' : round(loudness_mean,2),
        'speechiness' : round(speech_mean,2),
        'acousticness' :  round(acoust_mean,2),
        'instrumentalness' : round(instrument_mean,2),
        'liveness' : round(liveness_mean,2),
        'valence' : round(valence_mean,2),
        'tempo' : round(tempo_mean,2),
    }
    print(dance_sum)
    return Response({
        'response_data' : mean_audio_features,
    })