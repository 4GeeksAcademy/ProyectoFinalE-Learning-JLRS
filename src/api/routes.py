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

# RUTAS USER
@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
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
    
# RUTAS LOGIN Y SIGNUP
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
  
## RUTAS con API stripe   
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

# RUTAS CURSO
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
    curso = Curso.query.get(id)
    try:
        curso = [curso.serialize()]
        return jsonify(curso), 200
    except Exception as e: 
        return jsonify({'message': str(e)}), 500
    
@api.route('/cursos', methods=['POST'])
@jwt_required()
def create_curso():
    data=request.json
    title = data.get('title', None)
    portada = data.get('portada', None)
    resumen = data.get('resumen', None)
    categoria = data.get('categoria', None)
    nivel = data.get('nivel', None)
    idioma = data.get('idioma', None)
    fecha_inicio = data.get('fecha_inicio', None)
    precio = data.get('precio', None)
    if not title or not resumen or not categoria or not nivel or not idioma:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    curso = Curso.query.filter_by(title=title).first()
    if curso:
        return jsonify({'success': False, 'msg': 'El curso ya existe, intenta otro título'}), 400
    new_curso = Curso(title=title, portada=portada, resumen=resumen, categoria=categoria, nivel=nivel,idioma=idioma,fecha_inicio=fecha_inicio,precio=precio)
    db.session.add(new_curso)
    db.session.commit()
    return jsonify(new_curso.serialize()), 200

@api.route("/cursos/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_curso(id):
    curso = Curso.query.get(id)
    db.session.delete(curso)
    db.session.commit()
    return jsonify("curso borrado"), 200

@api.route("/cursos/<int:id>", methods=["PUT"])
@jwt_required()
def edit_curso(id):
    edited_curso = Curso.query.get(id)
    data=request.json
    title = data.get('title', None)
    portada = data.get('portada', None)
    resumen = data.get('resumen', None)
    categoria = data.get('categoria', None)
    nivel = data.get('nivel', None)
    idioma = data.get('idioma', None)
    fecha_inicio = data.get('fecha_inicio', None)
    precio = data.get('precio', None)
    if not title or not resumen or not categoria or not nivel or not idioma:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    edited_curso = Curso(title=title, portada=portada, resumen=resumen, categoria=categoria, nivel=nivel,idioma=idioma,fecha_inicio=fecha_inicio,precio=precio)
    db.session.add(edited_curso)
    db.session.commit()
    return jsonify(edited_curso.serialize()), 200

# RUTAS VIDEOS

@api.route('/videos', methods=['GET'])
@jwt_required()
def get_videos():
    videos = Videos.query.all()
    if videos:
        return jsonify({"msg": [videos.serialize() for videos in videos]}), 200
    else:
        return jsonify({"error": "Videos not found"}), 404
    
@api.route('/videos/<int:id>', methods=['GET'])
@jwt_required()
def get_video(id):
    video = Videos.query.get(id)
    if video:
        return jsonify({"msg": video.serialize()}), 200
    else:
        return jsonify({"error": "Video not found"}), 404
    
@api.route('/videos', methods=['POST'])
@jwt_required()
def create_video():
    data=request.json
    title = data.get('title', None)
    url = data.get('url', None)
    text = data.get('text', None)
    if not title or not url or not text:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    video = Videos.query.filter_by(title=title).first()
    if video:
        return jsonify({'success': False, 'msg': 'El video ya existe'}), 400
    new_video = Videos(title=title, url=url, text=text)
    db.session.add(new_video)
    db.session.commit()
    return jsonify(new_video.serialize()), 200

@api.route("/videos/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_video(id):
    video = Videos.query.get(id)
    db.session.delete(video)
    db.session.commit()
    return jsonify("video borrado"), 200

@api.route('/videos/<int:id>', methods=['PUT'])
@jwt_required()
def edit_video(id):
    edited_video = Videos.query.get(id)
    data=request.json
    title = data.get('title', None)
    url = data.get('url', None)
    text = data.get('text', None)
    if not title or not url or not text:
        return jsonify({'success': False, 'msg': 'Todos los campos son necesarios'}), 400
    edited_video = Videos(title=title, url=url, text=text)
    db.session.add(edited_video)
    db.session.commit()
    return jsonify(edited_video.serialize()), 200

# RUTAS MATRICULAS


# RUTAS PAGOS 