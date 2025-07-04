from flask import request, jsonify, Blueprint
from .models.models import EventRegistration,Speaker, db
from .utils.utils import allowed_file, get_secure_filename,os
from flask import current_app
from flask import send_from_directory
import os


main = Blueprint('main', __name__)

@main.route("/")
def home():
    return "Flask is working!"


# Serve uploaded files from the "uploads" folder
@main.route('/uploads/<path:filename>')
def uploaded_file(filename):
    uploads_folder = os.path.join(current_app.root_path, '..', 'uploads')
    return send_from_directory(uploads_folder, filename)
@main.route("/api/v1/events-registration", methods=['POST'])
def add_attendees():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone = data.get('phone')
    job_title = data.get('job_title')
    company_name = data.get('company_name')
    company_size = data.get('company_size')
    subject = data.get('subject')

    if not all([first_name, last_name, email, phone, subject]):
        return jsonify({'message': 'Missing required fields'}), 400

    errors = []

    if EventRegistration.query.filter_by(email=email).first():
        errors.append('Email already registered.')
    if EventRegistration.query.filter_by(phone=phone).first():
        errors.append('Phone number already registered.')

    if errors:
        return jsonify({'message': ' '.join(errors)}), 409

    new_attendee = EventRegistration(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        job_title=job_title,
        company_name=company_name,
        company_size=company_size,
        subject=subject
    )

    db.session.add(new_attendee)
    db.session.commit()

    return jsonify({
        'success': True,
        'new_attendee': new_attendee.format()
    }), 201
@main.route("/api/v1/speakers",methods=['GET'])

def get_speakers():
    speakers=Speaker.query.all()
    if not speakers:
        return jsonify({"error": "Np speakers were found"}), 404
    return jsonify ([speaker.format() for speaker in speakers]), 200

@main.route('/api/v1/speakers', methods=['POST'])
def add_speaker():
    data = request.form
    speaker_avatar = request.files.get('speaker_avatar')

    name = data.get('name')
    email = data.get('email')
    company = data.get('company')
    position = data.get('position')
    bio = data.get('bio')

    if speaker_avatar and allowed_file(speaker_avatar.filename):
        filename = get_secure_filename(speaker_avatar)
        speaker_avatar.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
    else:
        filename = '.PNG'

    speaker = Speaker(
        name=name,
        email=email,
        company=company,
        position=position,
        bio=bio,
        speaker_avatar=filename
    )

    db.session.add(speaker)
    db.session.commit()

    return jsonify(speaker.format()), 201
    
@main.route("/api/v1/speakers/<int:speaker_id>", methods=["GET"])
def get_speaker(speaker_id):
    speaker=Speaker.query.get(speaker_id)
    if not speaker:
        return jsonify({"error": "speaker was not found"}),404
    
    return jsonify(speaker.format()),200

@main.route("/api/v1/speakers/<int:speaker_id>", methods=["PUT"])
def update_speaker(speaker_id):
    speaker=Speaker.query.get(speaker_id)
    data=request.form
    avatar=request.files.get('speaker_avatar')

    name=data.get('name')
    email = data.get('email')
    company = data.get('company')
    position = data.get('position')
    bio = data.get('bio')

    if not all([name, email, company, position, bio]):
        print("DEBUG: ", name, email, company, position, bio)

        return jsonify({"error": "All fields are required"}), 400
    
    if email !=speaker.email:
        existing_emails=Speaker.query.filter_by(email=email).first()
        if existing_emails:
            return jsonify({"error": "email elready exists"}), 409
        
    if avatar and allowed_file(avatar.filename):
        filename=get_secure_filename(avatar)
        avatar_path=os.path.join(current_app.config['UPLOAD_FOLDER'],filename)
        avatar.save(avatar_path)

        if speaker.speaker_avatar != 'default-avatar.jpg':
            old_path = os.path.join(current_app.config['UPLOAD_FOLDER'], speaker.speaker_avatar)
            if os.path.exists(old_path):
                os.remove(old_path)


        speaker.speaker_avatar=filename

    speaker.name=name
    speaker.email = email
    speaker.company = company
    speaker.position = position
    speaker.bio = bio

    try:
        db.session.commit()
        return jsonify(speaker.format()), 200
    except:
        db.session.rollback()
        return jsonify({"error": "Something went wrong"}), 500




@main.route("/ping")
def ping():
    return "pong"
