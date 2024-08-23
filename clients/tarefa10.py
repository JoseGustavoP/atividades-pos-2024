import requests
from xml.dom.minidom import parseString

def numero_por_extenso(numero):
    url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso"
    cabecalhos = {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.dataaccess.com/webservicesserver/NumberToWords"
    }

    corpo_solicitacao = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
          <ubiNum>{numero}</ubiNum>
        </NumberToWords>
      </soap:Body>
    </soap:Envelope>"""

    resposta = requests.post(url, data=corpo_solicitacao, headers=cabecalhos)
    resposta_xml = resposta.content.decode()

    dom = parseString(resposta_xml)

    resultado = dom.getElementsByTagName("m:NumberToWordsResult")
    if resultado:
        por_extenso = resultado[0].childNodes[0].nodeValue
        return por_extenso
    else:
        return "'NumberToWordsResult' não foi encontrada"

# Exemplo de uso
numero = int(input("Digite um numero inteiro: "))
numero_extenso = numero_por_extenso(numero)
print(f"O número {numero} por extenso em inglês é: {numero_extenso}")
