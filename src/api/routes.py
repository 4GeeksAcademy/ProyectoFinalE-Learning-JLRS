from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os

import stripe #plataforma de pago. Para instalar el paquete de Stripe, tuve que poner: pip install stripe ,en la consola Backend y: npm install @stripe/react-stripe-js @stripe/stripe-js ,en el Fronted
from api.models import db, User, Curso, Profesor, Alumno, Videos, Matricula, Pagos

# Crear el Blueprint para la API
api = Blueprint('api', __name__)

@api.route('/')
def root():
    return "Home"

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"msg": user.serialize()}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    if users:
        return jsonify({"msg": [user.serialize() for user in users]}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['PUT'])
@jwt_required()
def update_user():
    id=get_jwt_identity()
    data = request.get_json()
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({"error": "Invalid data"}), 400
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.name = data['name']
    user.email = data['email']
    db.session.commit()
    return jsonify({"status": "User updated", "user": user.serialize()}), 200

@api.route('/users', methods=['DELETE'])
@jwt_required()
def delete_user():
    id=get_jwt_identity()
    user = User.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"status": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


@api.route('/cursos', methods=['POST'])
@jwt_required()
def crear_curso():
    data=request.json
    title = data.get('title', None)
    portada = data.get('portada', None)
    resumen = data.get('resumen', None)
    categoria = data.get('categoria', None)
    nivel = data.get('nivel', None)
    idioma = data.get('idioma', None)
    fecha_inicio = data.get('fecha_inicio', None)
    precio = data.get('precio', None)
    if not title or not portada or not resumen or not categoria or not nivel or not idioma:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    curso = Curso.query.filter_by(title=title).first()
    if curso:
        return jsonify({'success': False, 'msg': 'El curso ya existe, intenta otro título'}), 400
    new_curso = Curso(title=title, portada=portada, resumen=resumen, categoria=categoria, nivel=nivel,idioma=idioma,fecha_inicio=fecha_inicio,precio=precio)
    db.session.add(new_curso)
    db.session.commit()
    return jsonify(new_curso.serialize()), 200













# @api.route('/cursos/<int:curso_id>', methods=['GET'])
# @jwt_required()()  # Proteger la ruta para que solo usuarios autenticados puedan acceder
# def get_curso(curso_id):
#     curso = Curso.query.get(curso_id)
#     if curso:
#         # Suponemos que el primer video asociado al curso es el que queremos mostrar
#         video = Videos.query.filter_by(curso_id=curso_id).first()
#         video_url = video.url if video else None
#         return jsonify({"msg": curso.serialize(), "video_url": video_url}), 200
#     else:
#         return jsonify({"error": "Curso not found"}), 404

# @api.route('/cursos', methods=['GET'])
# @jwt_required()()  # Proteger la ruta para que solo usuarios autenticados puedan acceder
# def get_cursos():
#     cursos = Curso.query.all()
#     if cursos:
#         return jsonify({"msg": [curso.serialize() for curso in cursos]}), 200
#     else:
#         return jsonify({"error": "Cursos not found"}), 404

# @api.route('/curso/<int:curso_id>/videos', methods=['GET'])
# @jwt_required()()
# def get_curso_videos(curso_id):
#     user_id = get_jwt_identity()  # Obtener el ID del usuario desde el JWT

#     # Verificar si el usuario está matriculado en el curso
#     matricula = Matricula.query.filter_by(alumno_id=user_id, curso_id=curso_id).first()
#     if not matricula:
#         return jsonify({"error": "No estás matriculado en este curso."}), 403











@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'msg': 'Email y contraseña son requeridos'}), 400

    user = User.query.filter_by(email=email).first()
    
    if user and user.password == password:
        # Crear un token de acceso
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'success': True,
            'user': user.serialize(),
            'token': access_token
        }), 200
    
    return jsonify({'success': False, 'msg': 'Combinación usuario/contraseña no es válida'}), 401

@api.route('/signup', methods=['POST'])
def sign_up():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    is_teacher = data.get('is_teacher', False)
    
    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User with this email already exists."}), 400
    
    new_user = User(email=email, password=password, is_teacher=is_teacher)
    
    db.session.add(new_user)
    db.session.commit()
    if is_teacher:
        new_teacher = Profesor(user_id=new_user.id)
        db.session.add(new_teacher)
    else:
        new_student = Alumno(user_id=new_user.id)
        db.session.add(new_student)
    
    db.session.commit()
    
    return jsonify(new_user.serialize()), 201
  
 #Pago con API stripe   
#El backend maneja la creación del PaymentIntent y devuelve el client_secret.
stripe.api_key = os.getenv("STRIPE_PRIVATE") #establece la clave secreta de Stripe, esencial para realizar operaciones seguras con la API de Stripe.

@api.route('/create-payment', methods=['POST']) #copiado del repositorio codespace de JaviSeigle
def create_payment():
    try: # Recibe los datos de la cantidad y moneda.
        data = request.json
        #PODEMOS PASAR TODOS LOS ELEMENTOS QUE PERMITA EL OBJETO DE PAYMENTINTENT.CREATE 
        intent = stripe.PaymentIntent.create(
            amount=data['amount'], # se deberia de calcular el precio en el back, no recibirse del front
            currency=data['currency'],
            automatic_payment_methods={
                'enabled': True
            }
        )
        return jsonify({
            'clientSecret': intent['client_secret'] #Devuelve el client_secret del PaymentIntent, que es necesario en el frontend para confirmar el pago.
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@api.route('/cursos', methods=['GET'])
def cargarCursos():
    cursos = Curso.query.all()
    try:
        cursos_list = [curso.serialize() for curso in cursos]
        return jsonify(cursos_list), 200
    except Exception as e: 
        return jsonify({'message': str(e)}), 500
    
@api.route('/cursos/<int:id>', methods=['GET'])
def get_curso(id):
    cursos = Curso.query.get(id)
    try:
        curso = [curso.serialize() for curso in cursos]
        return jsonify(curso), 200
    except Exception as e: 
        return jsonify({'message': str(e)}), 500