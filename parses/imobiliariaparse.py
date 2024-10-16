import xml.etree.ElementTree as ET
import json

file_path = r'C:\Users\20211181110013\atividades-pos-2024-1\xml\imobiliaria.xml'

with open(file_path, 'r', encoding='utf-8') as file:
    xml_data = file.read()

root = ET.fromstring(xml_data)

def xml_to_dict(element):
    data_dict = {}
    if len(element):
        for child in element:
            if len(child) > 0:  
                if child.tag not in data_dict:
                    data_dict[child.tag] = []
                data_dict[child.tag].append(xml_to_dict(child))
            else:
                data_dict[child.tag] = child.text
    return data_dict
imoveis = []
for imovel in root.findall('imovel'):
    imoveis.append(xml_to_dict(imovel))
imobiliaria = {"imobiliaria": imoveis}
json_data = json.dumps(imobiliaria, indent=4, ensure_ascii=False)

print(json_data)