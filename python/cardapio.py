import xml
from xml.dom.minidom import parse

dom = xml.dom.minidom.parse("xml\cardapio.xml")

# Elemento raiz do XML (cardapio)
cardapio = dom.documentElement

# Recebe uma lista dos elementos com tag "prato"
pratos = cardapio.getElementsByTagName('prato')
x = 1
for prato in pratos:
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    print(nome, "id =",x)
    x = x + 1
id_prato = input("selecione o id do prato que deseja:")


    
for prato in pratos:
    break
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    elemento_descricao = prato.getElementsByTagName('descricao')[0]
    descricao = elemento_descricao.firstChild.nodeValue
    ingredientes = prato.getElementsByTagName('ingrediente')
    preco = prato.getElementsByTagName('preco')[0].firstChild.nodeValue
    calorias = prato.getElementsByTagName('calorias')[0].firstChild.nodeValue
    tempo = prato.getElementsByTagName('tempo')[0].firstChild.nodeValue

    print("nome:", nome)
    print("descricao:", descricao)
    print("ingredientes:")
    for ingrediente in ingredientes:
        ingrediente_value = ingrediente.firstChild.nodeValue
        print(ingrediente_value)  
    print("preco:", preco, "R$")
    print("calorias:", calorias)
    print("tempo:", tempo)
    print("")