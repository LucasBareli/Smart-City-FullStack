from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)  

urlpatterns = [
    path('signup', SignUpView.as_view(), name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sensores', SensoresView.as_view(), name='sensores'),
    path('sensores/<int:pk>', SensoresAPIView.as_view(), name='sensores-detail'),
    path('sensores/search', SensoresSearchView.as_view(), name='sensores-search'),
    path('ambientes', AmbientesView.as_view(), name='ambientes'),
    path('ambientes/<int:pk>', AmbientesAPIView.as_view(), name='ambientes-detail'),
    path('ambientes/search', AmbientesSearchView.as_view(), name='ambientes-search'),
    path('historicos', HistoricosView.as_view(), name='historicos'),
    path('historicos/<int:pk>', HistoricosAPIView.as_view(), name='historicos-detail'),
    path('historicos/search', HistoricosSearchView.as_view(), name='historicos-search'),
    path('historicos/filtrar/sensor-data', HistoricosSensorDataView.as_view(), name='historicos-sensor-data'),
    path('historicos/filtrar/sensor-data-hora', HistoricosSensorDataHoraView.as_view(), name='historicos-sensor-data-status'),
    path('historicos/ultimas24h', HistoricosUltimas24hView.as_view(), name='historicos-ultimas-24h'),
    path('leitura_arquivos', importar_planilhas, name='leitura_arquivos'),
    path('exportar_historicos/', ExportHistoricosView.as_view(), name='exportar-historicos'),
]
