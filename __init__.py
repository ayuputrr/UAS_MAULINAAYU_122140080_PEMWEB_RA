from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_jinja2')
    config.include('.models')    # pastikan ini ada models/__init__.py dengan includeme()
    config.include('.routes')    # routes.py untuk konfigurasi routing
    config.scan()
    return config.make_wsgi_app()
