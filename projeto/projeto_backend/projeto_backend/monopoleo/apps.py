from django.apps import AppConfig


class MonopoleoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'monopoleo'

    def ready(self):
        import monopoleo.signals
