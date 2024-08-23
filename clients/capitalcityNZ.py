import requests
from xml.dom.minidom import parseString

def buscar_capital_pais(codigo_pais):
    url = "http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso"
    cabecalhos = {
        "Content-Type": "text/xml; charset=utf-8",
        "SOAPAction": "http://www.oorsprong.org/websamples.countryinfo/CapitalCity"
    }
    
    corpo_solicitacao = f"""<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>{codigo_pais}</sCountryISOCode>
        </CapitalCity>
      </soap:Body>
    </soap:Envelope>"""
    
    resposta = requests.post(url, data=corpo_solicitacao, headers=cabecalhos)
    resposta_xml = resposta.content.decode()
    
    # Analisa o XML de resposta
    dom = parseString(resposta_xml)
    
    # Verifica se a tag 'CapitalCityResult' foi encontrada
    capitais_encontradas = dom.getElementsByTagName("m:CapitalCityResult")
    if capitais_encontradas:
        capital = capitais_encontradas[0].childNodes[0].nodeValue
        return capital
    else:
        return "'CapitalCityResult' não foi encontrada"

# Exemplo de uso
capital_nova_zelandia = buscar_capital_pais("NZ")
print(f"A capital da Nova Zelândia é {capital_nova_zelandia}")
