import requests
from tabulate import tabulate

# Credenciais do SUAP
username = input("Digite sua Matricula: ")
password = input("Digite sua Senha: ") 

# URL do endpoint de autenticação
auth_url = "https://suap.ifrn.edu.br/api/v2/autenticacao/token/"

# Requisição para obter o token
response = requests.post(auth_url, data={"username": username, "password": password})

if response.status_code == 200:
    token_data = response.json()
    api_key = token_data.get("access")
    refresh_token = token_data.get("refresh")
    print("Token obtido com sucesso.")
else:
    print("Erro ao obter o token:", response.status_code, response.text)
    exit(1)

# Função para renovar o token
def refresh_token():
    refresh_url = "https://suap.ifrn.edu.br/api/v2/autenticacao/token/refresh/"
    response = requests.post(refresh_url, data={"refresh": refresh_token})

    if response.status_code == 200:
        token_data = response.json()
        return token_data.get("access")
    else:
        print("Erro ao renovar o token:", response.status_code, response.text)
        return None

# Exemplo de como usar a função para renovar o token
def get_boletim(ano_letivo, periodo_letivo):
    global api_key
    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    boletim_url = f"https://suap.ifrn.edu.br/api/v2/minhas-informacoes/boletim/{ano_letivo}/{periodo_letivo}/"
    response = requests.get(boletim_url, headers=headers)

    if response.status_code == 401:  # Se o token estiver expirado
        api_key = refresh_token()
        if api_key:  # Se a renovação do token foi bem-sucedida
            headers["Authorization"] = f"Bearer {api_key}"
            response = requests.get(boletim_url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Erro ao obter o boletim:", response.status_code)
        return None

def format_boletim(boletim_data):
    if not boletim_data:
        print("Nenhum dado encontrado.")
        return

    tabela = []
    for disciplina in boletim_data:
        linha = [
            disciplina.get("disciplina", "N/A"),
            disciplina.get("nota_etapa_1", "N/A"),
            disciplina.get("nota_etapa_2", "N/A"),
            disciplina.get("nota_etapa_3", "N/A"),
            disciplina.get("nota_etapa_4", "N/A"),
            disciplina.get("media_final", "N/A")
        ]
        tabela.append(linha)

    print(tabulate(tabela, headers=["Disciplina", "Nota 1", "Nota 2", "Nota 3", "Nota 4", "Média Final"], tablefmt="pretty"))

# Testar o endpoint de boletim
ano_letivo = 2024  # Substitua pelo ano letivo desejado
periodo_letivo = 1  # Substitua pelo período letivo desejado

boletim_data = get_boletim(ano_letivo, periodo_letivo)
if boletim_data:
    print("Boletim obtido com sucesso.")
    format_boletim(boletim_data=boletim_data)
else:
    print("Nenhum dado encontrado.")
