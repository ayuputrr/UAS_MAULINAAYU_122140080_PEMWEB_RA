import pytest
from backend.models import User
from passlib.hash import bcrypt

def test_register_user_success(testapp):
    payload = {"email": "user1@example.com", "password": "secret", "role": "user"}
    res = testapp.post_json('/api/register', payload, status=201)
    assert res.json['status'] == 'success'
    assert 'user_id' in res.json

def test_register_user_missing_fields(testapp):
    res = testapp.post_json('/api/register', {}, status=400)
    assert 'error' in res.json or 'status' in res.json

def test_register_user_email_exists(testapp, dbsession):
    user = User(email="exists@example.com", password=bcrypt.hash("pw"), role="user")
    dbsession.add(user)
    dbsession.flush()
    payload = {"email": "exists@example.com", "password": "newpw"}
    res = testapp.post_json('/api/register', payload, status=409)
    assert res.json['status'] == 'error'

def test_login_success(testapp, dbsession):
    pw_hash = bcrypt.hash("mypassword")
    user = User(email="login@example.com", password=pw_hash, role="user")
    dbsession.add(user)
    dbsession.flush()
    payload = {"email": "login@example.com", "password": "mypassword"}
    res = testapp.post_json('/api/login', payload, status=200)
    assert res.json['user']['email'] == "login@example.com"

def test_login_wrong_password(testapp, dbsession):
    pw_hash = bcrypt.hash("mypassword")
    user = User(email="fail@example.com", password=pw_hash, role="user")
    dbsession.add(user)
    dbsession.flush()
    payload = {"email": "fail@example.com", "password": "wrongpass"}
    res = testapp.post_json('/api/login', payload, status=401)
    assert 'error' in res.json

def test_login_user_not_found(testapp):
    payload = {"email": "notfound@example.com", "password": "pass"}
    res = testapp.post_json('/api/login', payload, status=404)
    assert 'error' in res.json

def test_get_user_success(testapp, dbsession):
    user = User(email="getuser@example.com", password=bcrypt.hash("pw"), role="user")
    dbsession.add(user)
    dbsession.flush()
    res = testapp.get(f'/api/users/{user.id}', status=200)
    assert res.json['user']['email'] == "getuser@example.com"

def test_get_user_not_found(testapp):
    res = testapp.get('/api/users/9999', status=404)
    assert 'error' in res.json
