import users_wrapper as users

def listar_usuarios():
    usuarios = users.listar()
    if usuarios:
        for usuario in usuarios:
            print(f"{usuario['id']}: {usuario['name']} ({usuario['username']}) - {usuario['email']}")
    else:
        print("Erro ao listar usuários.")

def criar_usuario():
    nome = input("Digite o nome: ")
    username = input("Digite o nome de usuário: ")
    email = input("Digite o e-mail: ")
    novo_usuario = users.criar(nome, username, email)
    if novo_usuario:
        print("Usuário criado com sucesso:", novo_usuario)
    else:
        print("Erro ao criar usuário.")

def ler_usuario():
    user_id = input("Digite o ID do usuário: ")
    usuario = users.ler(user_id)
    if usuario:
        print(usuario)
    else:
        print("Usuário não encontrado.")

def atualizar_usuario():
    user_id = input("Digite o ID do usuário: ")
    nome = input("Digite o novo nome: ")
    username = input("Digite o novo nome de usuário: ")
    email = input("Digite o novo e-mail: ")
    usuario_atualizado = users.atualizar(user_id, nome, username, email)
    if usuario_atualizado:
        print("Usuário atualizado com sucesso:", usuario_atualizado)
    else:
        print("Erro ao atualizar usuário.")

def deletar_usuario():
    user_id = input("Digite o ID do usuário: ")
    if users.deletar(user_id):
        print(f"Usuário com ID {user_id} deletado com sucesso.")
    else:
        print("Erro ao deletar usuário.")

def main():
    while True:
        print("\nEscolha uma opção:")
        print("1. Listar todos os usuários")
        print("2. Criar um novo usuário")
        print("3. Ler informações de um usuário")
        print("4. Atualizar informações de um usuário")
        print("5. Deletar um usuário")
        print("6. Sair")

        opcao = input("Digite o número da opção desejada: ")

        if opcao == "1":
            listar_usuarios()
        elif opcao == "2":
            criar_usuario()
        elif opcao == "3":
            ler_usuario()
        elif opcao == "4":
            atualizar_usuario()
        elif opcao == "5":
            deletar_usuario()
        elif opcao == "6":
            print("Saindo...")
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()
