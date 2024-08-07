import xml
from xml.dom.minidom import parse

dom = xml.dom.minidom.parse("xml/cardapio.xml")

cardapio = dom.documentElement

pratos = cardapio.getElementsByTagName('prato')

for prato in pratos:
    nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
    prato_id = prato.getAttribute('id')
    print(f"{nome} - id = {prato_id}")

id_prato = input("Selecione o ID do prato que deseja:")

for prato in pratos:
    prato_id = prato.getAttribute('id')
    if prato_id == id_prato:
        nome = prato.getElementsByTagName('nome')[0].firstChild.nodeValue
        descricao = prato.getElementsByTagName('descricao')[0].firstChild.nodeValue
        ingredientes = prato.getElementsByTagName('ingrediente')
        preco = prato.getElementsByTagName('preco')[0].firstChild.nodeValue
        calorias = prato.getElementsByTagName('calorias')[0].firstChild.nodeValue
        tempo = prato.getElementsByTagName('tempo')[0].firstChild.nodeValue

        print(f"Nome: {nome}")
        print(f"Descrição: {descricao}")
        print("Ingredientes:")
        for ingrediente in ingredientes:
            ingrediente_value = ingrediente.firstChild.nodeValue
            print(f"  - {ingrediente_value}")
        print(f"Preço: {preco} R$")
        print(f"Calorias: {calorias}")
        print(f"Tempo: {tempo} min")
        break
else:
    print("ID do prato não encontrado.")
