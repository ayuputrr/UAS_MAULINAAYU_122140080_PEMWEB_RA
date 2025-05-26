from pyramid.view import view_config
from ..models import User
from passlib.hash import bcrypt

@view_config(route_name="login", renderer="json", request_method="POST")
def login(request):
    session = request.dbsession
    data = request.json_body

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        request.response.status = 400
        return {"error": "Email dan password wajib diisi"}

    user = session.query(User).filter_by(email=email).first()

    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}

    if not bcrypt.verify(password, user.password):
        request.response.status = 401
        return {"error": "Password salah"}

    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    }

@view_config(route_name="get_user", renderer="json", request_method="GET")
def get_user(request):
    session = request.dbsession
    user_id = request.matchdict.get("id")

    if not user_id:
        request.response.status = 400
        return {"error": "User ID tidak diberikan"}

    user = session.query(User).filter_by(id=user_id).first()

    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}

    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role
        }
    }
