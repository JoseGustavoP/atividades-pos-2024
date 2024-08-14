import xml
from xml.dom.minidom import parse

dom = xml.dom.minidom.parse("xml/imobiliaria.xml")

imobiliaria = dom.documentElement

imoveis = imobiliaria.getElementsByTagName('imovel')

for i, imovel in enumerate(imoveis):
    descricao = imovel.getElementsByTagName('descricao')[0].firstChild.nodeValue
    print(f"{descricao} - id = {i+1}")

id_imovel = int(input("Selecione o ID do imóvel que deseja:"))

if 1 <= id_imovel <= len(imoveis):
    imovel = imoveis[id_imovel - 1]
    descricao = imovel.getElementsByTagName('descricao')[0].firstChild.nodeValue
    proprietario_nome = imovel.getElementsByTagName('nome')[0].firstChild.nodeValue
    proprietario_contatos = imovel.getElementsByTagName('telefone') + imovel.getElementsByTagName('email')
    endereco_rua = imovel.getElementsByTagName('rua')[0].firstChild.nodeValue
    endereco_bairro = imovel.getElementsByTagName('bairro')[0].firstChild.nodeValue
    endereco_cidade = imovel.getElementsByTagName('cidade')[0].firstChild.nodeValue
    endereco_numero = imovel.getElementsByTagName('numero')[0].firstChild.nodeValue if imovel.getElementsByTagName('numero') else "Não informado"
    tamanho = imovel.getElementsByTagName('tamanho')[0].firstChild.nodeValue
    numerodequartos = imovel.getElementsByTagName('numerodequartos')[0].firstChild.nodeValue
    numerodebanheiros = imovel.getElementsByTagName('numerodebanheiros')[0].firstChild.nodeValue
    valor = imovel.getElementsByTagName('valor')[0].firstChild.nodeValue
    print(f"\nDescrição: {descricao}")
    print(f"Proprietário: {proprietario_nome}")
    print("Contatos:")
    for contato in proprietario_contatos:
        print(f"  - {contato.firstChild.nodeValue}")
    print(f"Endereço: {endereco_rua}, {endereco_bairro}, {endereco_cidade}, {endereco_numero}")
    print(f"Tamanho: {tamanho}")
    print(f"Número de quartos: {numerodequartos}")
    print(f"Número de banheiros: {numerodebanheiros}")
    print(f"Valor: {valor}")
else:
    print("ID do imóvel não encontrado.")
