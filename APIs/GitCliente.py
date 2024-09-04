import requests

GITHUB_API_URL = 'https://api.github.com'

def obter_cabecalho_autenticacao(token):
    return {'Authorization': f'token {token}'}

def listar_seguidores(nome_usuario, token):
    url = f'{GITHUB_API_URL}/users/{nome_usuario}/followers'
    resposta = requests.get(url, headers=obter_cabecalho_autenticacao(token))
    if resposta.status_code == 200:
        seguidores = resposta.json()
        print("Seus seguidores:")
        for seguidor in seguidores:
            print(seguidor['login'])
    else:
        print(f'Falha ao obter seguidores: {resposta.status_code}')

def seguir_usuario(nome_usuario_alvo, token):
    url = f'{GITHUB_API_URL}/user/following/{nome_usuario_alvo}'
    resposta = requests.put(url, headers=obter_cabecalho_autenticacao(token))
    if resposta.status_code == 204:
        print(f'Seguindo {nome_usuario_alvo} com sucesso!')
    else:
        print(f'Falha ao seguir usuário: {resposta.status_code}')

def parar_de_seguir_usuario(nome_usuario_alvo, token):
    url = f'{GITHUB_API_URL}/user/following/{nome_usuario_alvo}'
    resposta = requests.delete(url, headers=obter_cabecalho_autenticacao(token))
    if resposta.status_code == 204:
        print(f'Parou de seguir {nome_usuario_alvo} com sucesso!')
    else:
        print(f'Falha ao parar de seguir usuário: {resposta.status_code}')

def main():
    nome_usuario = input('Digite seu nome de usuário do GitHub: ')
    acao = input('Digite a ação desejada (listar/seguir/parar_de_seguir): ')
    token = input('Digite seu token do GitHub: ')

    if acao == 'listar':
        listar_seguidores(nome_usuario, token)
    elif acao == 'seguir':
        nome_usuario_alvo = input('Digite o nome de usuário a ser seguido: ')
        seguir_usuario(nome_usuario_alvo, token)
    elif acao == 'parar_de_seguir':
        nome_usuario_alvo = input('Digite o nome de usuário a ser deixado de seguir: ')
        parar_de_seguir_usuario(nome_usuario_alvo, token)
    else:
        print('Ação inválida. Use "listar", "seguir" ou "parar_de_seguir".')

if __name__ == '__main__':
    main()
