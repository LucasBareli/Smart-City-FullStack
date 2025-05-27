from django.db import models

class Sensores(models.Model):
    SENSOR_TYPES = [
        ('temperatura', 'Temperatura (°C)'),
        ('umidade', 'Umidade (%)'),
        ('luminosidade', 'Luminosidade (lux)'),
        ('contador', 'Contador (num)'),
    ]
    sensor = models.CharField(max_length=20, choices=SENSOR_TYPES)
    mac_address = models.CharField(max_length=256)
    unidade_med = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=False)

class Ambientes(models.Model):
    sig = models.IntegerField()
    descricao = models.CharField(max_length=256)
    ni = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)

class Historicos(models.Model):
    sensor = models.ForeignKey('Sensores', on_delete=models.CASCADE)
    ambiente = models.ForeignKey('Ambientes', on_delete=models.CASCADE)
    valor = models.FloatField()
    timestamp = models.DateTimeField()