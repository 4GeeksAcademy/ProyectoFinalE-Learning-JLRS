from flask_sqlalchemy import SQLAlchemy

# Crear una instancia global de SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_teacher = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)

    profesor = db.relationship('Profesor', backref='user', lazy=True)
    alumno = db.relationship('Alumno', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_teacher": self.is_teacher,
            "profesor": [p.serialize() for p in self.profesor] if isinstance(self.profesor, list) else (self.profesor.serialize() if self.profesor else None),
            "alumno": [a.serialize() for a in self.alumno] if isinstance(self.alumno, list) else (self.alumno.serialize() if self.alumno else None)
    }

    def __repr__(self):
        return f'<User {self.email}>'


class Profesor(db.Model):
    __tablename__ = "profesor"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    avatar = db.Column(db.String(250))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id')) 

    cursos = db.relationship('Curso', backref='profesor', lazy=True)
    pagos = db.relationship('Pagos', backref='profesor', lazy=True)

    def __repr__(self):
        return f'<Profesor {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "telefono": self.telefono,
            "address": self.address,
            "user_id": self.user_id,
            "avatar": self.avatar,
            "cursos": [curso.serialize() for curso in self.cursos] if self.cursos else None,
            "pagos": [pago.serialize() for pago in self.pagos] if self.pagos else None,
        }
    


class Alumno(db.Model):
    __tablename__ = "alumno"
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    lastname = db.Column(db.String(120), nullable=True)
    telefono = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(120), nullable=True)
    avatar = db.Column(db.String(250))
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id')) 

    matriculas = db.relationship('Matricula', backref='alumno', lazy=True)
    pagos = db.relationship('Pagos', backref='alumno', lazy=True)
    
    def __repr__(self):
        return f'<Alumno {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "telefono": self.telefono,
            "address": self.address,
            "user_id": self.user_id,
            "avatar": self.avatar,
            "matriculas": [matricula.serialize() for matricula in self.matriculas] if self.matriculas else None,
        }


class Curso(db.Model):
    __tablename__ = "curso"
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    portada = db.Column(db.String(250), nullable=True)
    resumen = db.Column(db.String(250), nullable=False)
    categoria = db.Column(db.String(120), nullable=False)
    valoraciones = db.Column(db.Integer(), nullable=True)
    nivel = db.Column(db.String(120), nullable=True)
    precio = db.Column(db.Integer(), nullable=True)
    fecha_inicio = db.Column(db.String(120), nullable=True)
    idioma = db.Column(db.String(120), nullable=False)
    profesor_id = db.Column(db.Integer(), db.ForeignKey('profesor.id')) 

    videos = db.relationship('Videos', backref='curso', lazy=True)
    matriculas = db.relationship('Matricula', backref='curso', lazy=True)

    def __repr__(self):
        return f'<Curso {self.title}>'


    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "resumen": self.resumen,
            "categoria": self.categoria,
            "valoraciones": self.valoraciones,
            "nivel": self.nivel,
            "precio": self.precio,
            "fecha_inicio": self.fecha_inicio,
            "idioma": self.idioma,
            "profesor_id": self.profesor_id,
            "portada": self.portada,
            "matriculas": [matricula.serialize() for matricula in self.matriculas] if self.matriculas else None,
            "videos": [video.serialize() for video in self.videos] if self.videos else None,
        }


class Videos(db.Model):
    __tablename__ = "videos"
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(120), nullable=True)
    url = db.Column(db.String(250), nullable=True)
    text = db.Column(db.String(250), nullable=False)
    curso_id = db.Column(db.Integer(), db.ForeignKey('curso.id'))

    def __repr__(self):
        return f'<title {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "text": self.text,
            "curso_id": self.curso_id
        }


class Matricula(db.Model):
    __tablename__ = "matricula"
    id = db.Column(db.Integer(), primary_key=True)
    curso_id = db.Column(db.Integer(), db.ForeignKey('curso.id'))
    alumno_id = db.Column(db.Integer(), db.ForeignKey('alumno.id'))

    def serialize(self):
        return {
            "id": self.id,
            "curso_id": self.curso_id,
            "alumno_id": self.alumno_id,
        }


class Pagos(db.Model):
    __tablename__ = "pagos"
    id = db.Column(db.Integer, primary_key=True)
    matricula_id = db.Column(db.Integer(), db.ForeignKey('matricula.id'))
    curso_id = db.Column(db.Integer(), db.ForeignKey('curso.id'))
    alumno_id = db.Column(db.Integer(), db.ForeignKey('alumno.id'))
    profesor_id = db.Column(db.Integer(), db.ForeignKey('profesor.id')) 
    fecha_pago = db.Column(db.String(120), nullable=True)
    cantidad = db.Column(db.Integer(), nullable=True)  

    def __repr__(self):
        return f'<Pagos {self.fecha_pago}>'

    def serialize(self):
        return {
            "id": self.id,
            "matricula_id": self.matricula_id,
            "curso_id": self.curso_id,
            "alumno_id": self.alumno_id,
            "profesor_id": self.profesor_id,
            "fecha_pago": self.fecha_pago,
            "cantidad":self.cantidad,
        }
