PARA RODAR A APLICAÇÃO :

Comandos via CMD:

cd back

py -m venv env

env\scripts\activate

pip install -r requirements.txt

py manage.py runserver


TESTAR A APLICAÇÃO:

http://127.0.0.1:8000/admin/

para pegar o token e ter funções administrativas:
http://127.0.0.1:8000/api/token/
usuario = lin
senha = 123

GET:
http://127.0.0.1:8000/api/ambientes
http://127.0.0.1:8000/api/sensores
http://127.0.0.1:8000//api/historicos


Outros métodos (POST, PUT, DELETE):
http://127.0.0.1:8000//api/historicos/{id}
http://127.0.0.1:8000//api/sensores/{id}
http://127.0.0.1:8000//api/ambientes/{id}

PARA LER OS ARQUIVOS.XLSX
http://127.0.0.1:8000/api/leitura_arquivos


Ultimas 24hrs
http://127.0.0.1:8000/api/historicos/ultimas24h

Ex:http://127.0.0.1:8000/api/historicos/search?data_inicial=2025-05-19T00:00:00&data_final=2025-05-20T23:59:59


Para fazer filtragens:
http://127.0.0.1:8000/api/historicos/search
http://127.0.0.1:8000/api/ambientes/search
http://127.0.0.1:8000/api/sensores/search

Ex:http://127.0.0.1:8000/api/ambientes/search?search=CESAR AUGUSTO DA COSTA 


Localizar por ID de sensor

http://127.0.0.1:8000/api/sensores/{id}
http://127.0.0.1:8000/api/sensores/1

Localizar por TIPO de SENSOR:

http://127.0.0.1:8000/api/sensores/search?search={tipo_temperatura}
http://127.0.0.1:8000/api/sensores/search?search=temperatura

Localizar por código "SIG":

http://127.0.0.1:8000/api/ambientes/search?search={sig}
http://127.0.0.1:8000/api/ambientes/search?search=20400001


---------------------------------------------------------------- TESTES DOS REQUISITOS DO INTEGRADOR PBE ------------------------------------------------------------------


Localizar por ID de histórico:

http://127.0.0.1:8000/api/historicos/{id}
http://127.0.0.1:8000/api/historicos/3


Filtro duplo por DATA e SENSOR

http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor={sensor_id}&data_inicial={data_inicial}&data_final={data_final}
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor=1&data_inicial=2025-05-01T00:00:00&data_final=2025-05-26T23:59:59


Filtro triplo por DATA, SENSOR e HORA

http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor={sensor_id}&data_inicial={data_inicial}&data_final={data_final}
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor=1&data_inicial=2025-05-16T02:00:00Z&data_final=2025-05-16T03:00:00Z


Exportação de arquivo Excel com filtros

http://127.0.0.1:8000/api/exportar_historicos/
