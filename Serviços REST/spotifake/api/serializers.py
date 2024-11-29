from rest_framework import serializers
from .models import Artista, Album, Musica

class ArtistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artista
        fields = ['id', 'nome', 'local', 'ano_criacao']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'artista', 'nome', 'ano']

class MusicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musica
        fields = ['id', 'album', 'nome', 'segundos']
