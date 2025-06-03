PARA RODAR A APLICAÇÃO :

Comandos via CMD:

cd back

py -m venv env

env\scripts\activate

pip install -r requirements.txt

py manage.py runserver

---------------------------------------------------------------- TESTES DOS REQUISITOS DO INTEGRADOR PBE ------------------------------------------------------------------
1 - Localizar por id de SENSOR:

http://127.0.0.1:8000/api/sensores/{id}
http://127.0.0.1:8000/api/sensores/6

2 - Localizar por TIPO de SENSOR:
http://127.0.0.1:8000/api/sensores/search?search={tipo_sensor}
http://127.0.0.1:8000/api/sensores/search?search=temperatura

3 - Localizar por STATUS do SENSOR:
http://127.0.0.1:8000/api/sensores/search?status=true
http://127.0.0.1:8000/api/sensores/search?status=false

4 - Localizar AMBIENTE por SIG:
http://127.0.0.1:8000/api/ambientes/search?search={numero_sigla}
http://127.0.0.1:8000/api/ambientes/search?search=20400003

5 - Localizar por ID de HISTÓRICO:
http://127.0.0.1:8000/api/historicos/{id}
http://127.0.0.1:8000/api/historicos/3

6 - Filtro duplo por DATA e SENSOR:
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor={sensor_id}&data_inicial={data_inicial}&data_final={data_final}
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor=6&data_inicial=2025-02-01T00:00:00&data_final=2025-02-28T23:59:59


7 - Filtro triplo por DATA, SENSOR e HORA
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data?sensor={sensor_id}&data_inicial={data_inicial}&data_final={data_final}
http://127.0.0.1:8000/api/historicos/filtrar/sensor-data-hora?sensor=6&data_inicial=2025-02-27T00:00:00&data_final=2025-02-28T23:59:59


8 - Exportação de arquivo Excel com filtros
http://127.0.0.1:8000/api/exportar_historicos/


---------------------------------------------------------------- TESTES EXTRAS (Caso queira) ------------------------------------------------------------------

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
