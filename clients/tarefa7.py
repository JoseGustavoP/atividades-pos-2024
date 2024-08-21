import requests

BASE_URL = "https://jsonplaceholder.typicode.com"

def listar_usuarios():
    response = requests.get(f"{BASE_URL}/users")
    if response.status_code == 200:
        usuarios = response.json()
        for usuario in usuarios:
            print(f"{usuario['id']}: {usuario['name']} ({usuario['username']}) - {usuario['email']}")
    else:
        print("Erro ao listar usuários.")

def listar_tarefas_usuario():
    user_id = input("Digite o ID do usuário: ")
    response = requests.get(f"{BASE_URL}/users/{user_id}/todos")
    if response.status_code == 200:
        tarefas = response.json()
        for tarefa in tarefas:
            status = "✔" if tarefa['completed'] else "✘"
            print(f"[{status}] {tarefa['title']}")
    else:
        print("Erro ao listar as tarefas do usuário.")

def criar_usuario():
    nome = input("Digite o nome: ")
    username = input("Digite o nome de usuário: ")
    email = input("Digite o e-mail: ")

    dados_usuario = {
        "name": nome,
        "username": username,
        "email": email
    }

    response = requests.post(f"{BASE_URL}/users", json=dados_usuario)
    if response.status_code == 201:
        print("Usuário criado com sucesso:", response.json())
    else:
        print("Erro ao criar usuário.")

def ler_usuario():
    user_id = input("Digite o ID do usuário: ")
    response = requests.get(f"{BASE_URL}/users/{user_id}")
    if response.status_code == 200:
        usuario = response.json()
        print(usuario)
    else:
        print("Usuário não encontrado.")

def atualizar_usuario():
    user_id = input("Digite o ID do usuário: ")
    nome = input("Digite o novo nome: ")
    username = input("Digite o novo nome de usuário: ")
    email = input("Digite o novo e-mail: ")

    dados_usuario = {
        "name": nome,
        "username": username,
        "email": email
    }

    response = requests.put(f"{BASE_URL}/users/{user_id}", json=dados_usuario)
    if response.status_code == 200:
        print("Usuário atualizado com sucesso:", response.json())
    else:
        print("Erro ao atualizar usuário.")

def deletar_usuario():
    user_id = input("Digite o ID do usuário: ")
    response = requests.delete(f"{BASE_URL}/users/{user_id}")
    if response.status_code == 200:
        print(f"Usuário com ID {user_id} deletado com sucesso.")
    else:
        print("Erro ao deletar usuário.")

def main():
    while True:
        print("\nEscolha uma opção:")
        print("1. Listar todos os usuários")
        print("2. Listar tarefas de um usuário específico")
        print("3. Criar um novo usuário")
        print("4. Ler informações de um usuário")
        print("5. Atualizar informações de um usuário")
        print("6. Deletar um usuário")
        print("7. Sair")

        opcao = input("Digite o número da opção desejada: ")

        if opcao == "1":
            listar_usuarios()
        elif opcao == "2":
            listar_tarefas_usuario()
        elif opcao == "3":
            criar_usuario()
        elif opcao == "4":
            ler_usuario()
        elif opcao == "5":
            atualizar_usuario()
        elif opcao == "6":
            deletar_usuario()
        elif opcao == "7":
            print("Saindo...")
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()