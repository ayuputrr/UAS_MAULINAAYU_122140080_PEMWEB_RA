import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend import main
from backend.models.meta import Base
from webtest import TestApp

@pytest.fixture(scope='session')
def engine():
    engine = create_engine('sqlite:///:memory:')
    Base.metadata.create_all(engine)  # buat semua tabel sekali per sesi
    return engine

@pytest.fixture(scope='function')
def connection(engine):
    connection = engine.connect()
    transaction = connection.begin()
    yield connection
    transaction.rollback()
    connection.close()

@pytest.fixture(scope='function')
def dbsession(connection):
    Session = sessionmaker(bind=connection)
    session = Session()
    yield session
    session.close()

@pytest.fixture(scope='session')
def app(engine):
    settings = {'sqlalchemy.url': str(engine.url)}
    return main({}, **settings)

@pytest.fixture(scope='function')
def testapp(app, dbsession, monkeypatch):
    # Monkeypatch supaya request.dbsession pakai session test
    monkeypatch.setattr('backend.models.meta.get_session', lambda: dbsession)
    return TestApp(app)
