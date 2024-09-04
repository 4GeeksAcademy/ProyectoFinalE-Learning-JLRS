from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
import cloudinary
import cloudinary.uploader


import stripe #plataforma de pago. Para instalar el paquete de Stripe, tuve que poner: pip install stripe ,en la consola Backend y: npm install @stripe/react-stripe-js @stripe/stripe-js ,en el Fronted
from api.models import db, User, Curso, Profesor, Alumno, Videos, Matricula, Pagos

# Crear el Blueprint para la API
api = Blueprint('api', __name__)

@api.route('/')
def root():
    return "Home"

##### RUTAS USER #####
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

@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user(id):
    edited_user = User.query.get(id)
    data=request.json
    edited_user.email = data.get('email', None) if data.get('email') else edited_user.email
    edited_user.password = data.get('password', None) if data.get('password') else edited_user.password

    db.session.commit()
    return jsonify(edited_user.serialize()), 200
    
##### RUTAS LOGIN Y SIGNUP #####
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
  
##### RUTAS con API stripe  ### 
#El backend maneja la creación del PaymentIntent y devuelve el client_secret.
stripe.api_key = os.getenv("STRIPE_PRIVATE") #establece la clave secreta de Stripe, esencial para realizar operaciones seguras con la API de Stripe.

@api.route('/create-payment', methods=['POST']) #copiado del repositorio codespace de JaviSeigle
def create_payment():
    try: # Recibe los datos de la cantidad y moneda.
        data = request.json
        print('-------------------------------------------------------',data)
        curso = Curso.query.get(data['curso_id'])
        #PODEMOS PASAR TODOS LOS ELEMENTOS QUE PERMITA EL OBJETO DE PAYMENTINTENT.CREATE 
        intent = stripe.PaymentIntent.create(
            amount=curso.precio, # se deberia de calcular el precio en el back, no recibirse del front
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

##### RUTAS CURSO #####
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
    
@api.route('/mis_cursos', methods=['GET'])
@jwt_required()
def mis_cursos():
    id = get_jwt_identity()
    try:
        aux = []
        matriculas = Matricula.query.all()
        for matricula in matriculas:
            print(matricula.serialize())
            curso = Curso.query.get(matricula.curso_id)
            aux.append(curso)
        print(aux)

        return jsonify({'success': True, 'misCursos': [curso.serialize() for curso in aux]}), 200
    except Exception as e: 
        print(e)
        return jsonify({'message': str(e)}), 400
    
@api.route('/cursos_profe', methods=['GET'])
@jwt_required()
def cursos_profe():
    user_id = get_jwt_identity()
    try:
        profesor = Profesor.query.filter_by(user_id=user_id).first()
        if not profesor:
            return jsonify({'error': 'Profesor not found'}), 404        
        cursos = Curso.query.filter_by(profesor_id=profesor.id)
        cursos_list = [curso.serialize() for curso in cursos]
        return jsonify({'success': True, 'misCursos': cursos_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
    if curso:
        db.session.delete(curso)
        db.session.commit()
        return jsonify({"status": "curso deleted"}), 200
    else:
        return jsonify({"error": "Curso not found"}), 404

@api.route("/cursos/<int:id>", methods=["PUT"])
@jwt_required()
def edit_curso(id):
    edited_curso = Curso.query.get(id)
    data=request.json
    edited_curso.title = data.get('title', None) if data.get('title') else edited_curso.title
    edited_curso.portada = data.get('portada', None) if data.get('portada') else edited_curso.portada
    edited_curso.resumen = data.get('resumen', None) if data.get('resumen') else edited_curso.resumen
    edited_curso.categoria = data.get('categoria', None) if data.get('categoria') else edited_curso.categoria
    edited_curso.nivel = data.get('nivel', None) if data.get('nivel') else edited_curso.nivel
    edited_curso.idioma = data.get('idioma', None) if data.get('idioma') else edited_curso.idioma
    edited_curso.fecha_inicio = data.get('fecha_inicio', None) if data.get('fecha_inicio') else edited_curso.fecha_inicio
    edited_curso.precio = data.get('precio', None) if data.get('precio') else edited_curso.precio
    
    db.session.commit()
    return jsonify(edited_curso.serialize()), 200

##### RUTAS VIDEOS #####

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
    edited_video.title = data.get('title', None) if data.get('title') else edited_video.title
    edited_video.url = data.get('url', None) if data.get('url') else edited_video.url
    edited_video.text = data.get('text', None) if data.get('text') else edited_video.text

    db.session.commit()
    return jsonify(edited_video.serialize()), 200

##### RUTAS MATRICULAS #####

#GET matriculas por curso segun ID del profesor
# @api.route('/matriculas_curso', methods=['GET'])
# @jwt_required()
# def matriculas_curso():
#     user_id = get_jwt_identity()
#     try:
#         profesor = Profesor.query.filter_by(user_id=user_id).first()
#         if not profesor:
#             return jsonify({'error': 'Profesor not found'}), 404
#         cursos = Curso.query.filter_by(profesor_id=profesor.id).all() 
        
#     except Exception as e: 
#         return jsonify({'error': str(e)}), 500

# @api.route('/cursos_profe', methods=['GET'])
# @jwt_required()
# def cursos_profe():
#     user_id = get_jwt_identity()
#     try:
#         profesor = Profesor.query.filter_by(user_id=user_id).first()
#         if not profesor:
#             return jsonify({'error': 'Profesor not found'}), 404        
#         cursos = Curso.query.filter_by(profesor_id=profesor.id).all()
#         cursos_list = [curso.serialize() for curso in cursos]
#         return jsonify({'success': True, 'misCursos': cursos_list}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500



##### RUTAS PAGOS #####

@api.route('/compra', methods=['POST'])
@jwt_required()
def compra():
    try:
        id = get_jwt_identity()
        data = request.json
        check = Pagos.query.filter_by(alumno_id= id,
            curso_id= data['curso_id']).first()
        print(check)
        if check:
            return jsonify({'success': False, 'error': 'Ya posee este curso'}), 418
        compra = Pagos(
            alumno_id= id,
            curso_id= data['curso_id'],
            profesor_id= data['profesor_id'],
            fecha_pago= data['fecha_pago'],
            cantidad= data['cantidad'],
            pago_stripe_id= data['pago_stripe_id']
            )
        db.session.add(compra)
        nueva_matricula = Matricula(curso_id=data['curso_id'], alumno_id=id)
        db.session.add(nueva_matricula)
        db.session.commit()
         
        return jsonify({'success': True, 'compra': compra.serialize(), 'matricula': nueva_matricula.serialize() })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': 'Error creando pago'})

#ruta GET para que el profesor sepa sus pagos, no necesita ver el alumno, solo el curso y precio
# @api.route('/pagos/<int:id>',methods=['GET'])
# @jwt_required()
# def get_pagos_profe():
#     id = get_jwt_identity()
#     try:






##### RUTA PUT DEL ALUMNO Y PROFESOR #####

@api.route("/users/<int:id>", methods=["PUT"])
@jwt_required()
def edit_perfil_profe(id):
    edited_perfil = Profesor.query.get(id)
    data=request.json
    edited_perfil.name = data.get('name', None) if data.get('name') else edited_perfil.name
    edited_perfil.lastname = data.get('lastname', None) if data.get('lastname') else edited_perfil.lastname
    edited_perfil.telefono = data.get('telefono', None) if data.get('telefono') else edited_perfil.telefono
    edited_perfil.address = data.get('address', None) if data.get('address') else edited_perfil.address
    edited_perfil.avatar = data.get('avatar', None) if data.get('avatar') else edited_perfil.avatar

    db.session.commit()
    return jsonify(edited_perfil.serialize()), 200

@api.route("/users/<int:id>", methods=["PUT"])
@jwt_required()
def edit_perfil_alumno(id):
    edited_perfil = Alumno.query.get(id)
    data=request.json
    edited_perfil.name = data.get('name', None) if data.get('name') else edited_perfil.name
    edited_perfil.lastname = data.get('lastname', None) if data.get('lastname') else edited_perfil.lastname
    edited_perfil.telefono = data.get('telefono', None) if data.get('telefono') else edited_perfil.telefono
    edited_perfil.address = data.get('address', None) if data.get('address') else edited_perfil.address
    edited_perfil.avatar = data.get('avatar', None) if data.get('avatar') else edited_perfil.avatar

    db.session.commit()
    return jsonify(edited_perfil.serialize()), 200

##### RUTA Cloudinary // no tocar
@api.route('/upload', methods=['POST'])
def upload():
    file_to_upload = request.files.get('file')
    if file_to_upload:
        # Determina el tipo de archivo basado en la extensión
        file_type = file_to_upload.filename.split('.')[-1].lower()
        if file_type in ['jpg', 'jpeg', 'png', 'gif']:
            resource_type = 'image'
        elif file_type in ['mp4', 'mov', 'avi', 'mkv']:
            resource_type = 'video'
        else:
            return jsonify({"error": "Unsupported file type"}), 400

        upload = cloudinary.uploader.upload(
            file_to_upload,
            resource_type=resource_type,
            chunk_size=6000000  # Opcional: Agrega chunk_size para manejar archivos grandes.
        )
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400