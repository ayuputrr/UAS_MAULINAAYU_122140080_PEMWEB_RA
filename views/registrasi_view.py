from pyramid.view import view_config
from ..models import User
from passlib.hash import bcrypt

@view_config(route_name='register', renderer='json', request_method='POST')
def register_user(request):
    session = request.dbsession
    data = request.json_body

    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    if not email or not password:
        request.response.status = 400
        return {'status': 'error', 'message': 'Email dan password wajib diisi'}

    existing_user = session.query(User).filter_by(email=email).first()
    if existing_user:
        request.response.status = 409
        return {'status': 'error', 'message': 'Email sudah digunakan'}

    hashed_password = bcrypt.hash(password)

    user = User(email=email, password=hashed_password, role=role)
    session.add(user)
    session.flush()

    request.response.status = 201
    return {
        'status': 'success',
        'message': 'User berhasil didaftarkan',
        'user_id': user.id,
        'role': user.role,
    }
