from flask import Flask, render_template, redirect, url_for, session, flash, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_migrate import Migrate
from functools import wraps
from flask_mail import Mail
from flask_mail import Message as MailMessage
import smtplib
import random

try:
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("example@gmail.com", "********")
    print("Logged in to email server")
    server.quit()
except Exception as e:
    print(f"Error: {e}")

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'example@gmail.com'
app.config['MAIL_PASSWORD'] = '********'
app.config['MAIL_DEFAULT_SENDER'] = 'example@gmail.com'

mail = Mail(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    surname = db.Column(db.String(150), nullable=False)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    phone_number = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(150), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    email_verification_code = db.Column(db.String(4), nullable=True)
    email_verified = db.Column(db.Boolean, default=False)

    messages = db.relationship('Message', backref='user', cascade='all, delete-orphan', lazy=True)

def send_verification_email(user, verification_code):
    print(f"Sending verification email to {user.email}")
    msg = MailMessage("Email verification", sender='example@gmail.com', recipients=[user.email])
    msg.body = f'Your verification code is: {verification_code}'
    mail.send(msg)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

class MessageForm(FlaskForm):
    content = StringField('Wiadomość', validators=[InputRequired(), Length(max=500)])
    submit = SubmitField('Wyślij')


class RegisterForm(FlaskForm):
    name = StringField('Name', validators=[InputRequired(), Length(min=1, max=30)])
    surname = StringField('Surname', validators=[InputRequired(), Length(min=1, max=30)])
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=20)])
    email = StringField('Email', validators=[InputRequired(), Length(min=4, max=30)])
    phone_number = StringField('Phone number', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=20)])
    submit = SubmitField('Register')

    def validate_username(self, username):
        existing_user = User.query.filter_by(username=username.data).first()
        if existing_user:
            raise ValidationError('Username already taken')
        
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=20)])
    submit = SubmitField('Login')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        verification_code = str(random.randint(1000, 9999))
        new_user = User(
            name=form.name.data,
            surname=form.surname.data,
            username=form.username.data,
            email=form.email.data,
            phone_number=form.phone_number.data,
            password=hashed_password,
            email_verification_code=verification_code,
            email_verified=False
        )
        db.session.add(new_user)
        db.session.commit()
        session['email'] = form.email.data
        send_verification_email(new_user, verification_code)
        flash('User created successfully. Check your email for verification code.')
        return redirect(url_for('verify_email'))
    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            user = User.query.filter_by(username=form.username.data).first()
            if user and check_password_hash(user.password, form.password.data):
                login_user(user)
                if user.is_admin:
                    return jsonify({'status': 'success', 'message': 'Zalogowano pomyślnie!', 'redirect': url_for('admin_panel')})
                else:
                    return jsonify({'status': 'success', 'message': 'Zalogowano pomyślnie!', 'redirect': url_for('welcome')})
            else:
                return jsonify({'status': 'error', 'message': 'Nieprawidłowa nazwa użytkownika lub hasło'})
        return jsonify({'status': 'error', 'message': 'Niepoprawne dane formularza'})
    return render_template('login.html', form=form)

@app.route('/welcome', methods=['GET', 'POST'])
@login_required
def welcome():
    form = MessageForm()
    if form.validate_on_submit():
        new_message = Message(content=form.content.data, user_id=current_user.id)
        db.session.add(new_message)
        db.session.commit()
        flash('Wiadomość została wysłana!')
        return redirect(url_for('welcome'))
    users = User.query.all()
    messages = Message.query.order_by(Message.timestamp.desc()).all()
    return render_template('welcome.html', name=current_user.name, users=users, messages=messages, form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.cli.command('create-admin')
def create_admin():
    admin = User(username='admin', password=generate_password_hash('admin123'), name="Admin",surname="", email="", phone_number="", is_admin=True)
    db.session.add(admin)
    db.session.commit()
    print('Admin created successfully')

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_admin:
            flash("You do not have permission to access this page.")
            return redirect(url_for('welcome'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/admin-panel')
@login_required
@admin_required
def admin_panel():
    users = User.query.all()
    user_count = db.session.query(User).count()
    return render_template('admin_panel.html', users=users, user_count=user_count)

@app.route('/delete-user/<int:user_id>', methods=['POST'])
@login_required
@admin_required
def delete_user(user_id):
    user = User.query.get(user_id)
    admin = User.query.filter_by(username='admin').first()
    if user and user != admin:
        Message.query.filter_by(user_id=user_id).delete()
        db.session.delete(user)
        db.session.commit()
        flash(f"Użytkownik {user.name} został usunięty.", "success")
    else:
        flash("Nie znaleziono użytkownika lub jest administaratorem.", "error")
    return redirect(url_for('admin_panel'))

@app.route('/create_user', methods=['POST'])
@login_required
@admin_required
def create_user():
    name = request.form.get('name')
    surname = request.form.get('surname')
    username = request.form.get('username')
    email = request.form.get('email')
    phone_number = request.form.get('phone_number')
    password = request.form.get('password')
    is_admin = request.form.get('is_admin')
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        flash('Username already taken', 'error')
    else:
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password, name=name, surname=surname, email=email, phone_number=phone_number, is_admin=is_admin)
        db.session.add(new_user)
        db.session.commit()
        flash('User created successfully', 'success')
    return redirect(url_for('admin_panel'))

@app.route('/verify_email', methods=['GET', 'POST'])
def verify_email():
    user = User.query.filter_by(email=session.get('email')).first()
    
    if request.method == 'POST':
        entered_code = request.form.get('verification_code')
        
        if user and user.email_verification_code == entered_code:
            user.email_verified = True
            db.session.commit()
            flash('Email verified successfully')
            return redirect(url_for('login'))
        else:
            flash('Invalid verification code')
    
    return render_template('verify_email.html', user=user)


@app.route('/resend_verification_code/<int:user_id>', methods=['POST'])
def resend_verification_code(user_id):
    user = User.query.get(user_id)
    if user and not user.email_verified:
        verification_code = str(random.randint(1000, 9999))
        user.email_verification_code = verification_code
        db.session.commit()
        send_verification_email(user, verification_code)
        flash('Verification code sent')
    return redirect(url_for('verify_email', user_id=user_id))

@app.route('/send-message', methods=['POST'])
@login_required
def send_message():
    content = request.form.get('content')
    if content:
        new_message = Message(content=content, user_id=current_user.id)
        db.session.add(new_message)
        db.session.commit()
        flash('Wiadomość została wysłana!','success')
    else:
        flash('Wiadomość nie może być pusta.','error')
    return redirect(url_for('welcome'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)