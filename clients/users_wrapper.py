import requests

BASE_URL = "https://jsonplaceholder.typicode.com/users"

def listar():
    response = requests.get(BASE_URL)
    if response.status_code == 200:
        return response.json()
    else:
        return []

def criar(nome, username, email):
    dados_usuario = {
        "name": nome,
        "username": username,
        "email": email
    }
    response = requests.post(BASE_URL, json=dados_usuario)
    if response.status_code == 201:
        return response.json()
    else:
        return None

def ler(user_id):
    response = requests.get(f"{BASE_URL}/{user_id}")
    if response.status_code == 200:
        return response.json()
    else:
        return None

def atualizar(user_id, nome, username, email):
    dados_usuario = {
        "name": nome,
        "username": username,
        "email": email
    }
    response = requests.put(f"{BASE_URL}/{user_id}", json=dados_usuario)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def deletar(user_id):
    response = requests.delete(f"{BASE_URL}/{user_id}")
    return response.status_code == 200