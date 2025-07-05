from flask import request, jsonify, Blueprint
from .models.models import EventRegistration,Speaker, db
from .utils.utils import allowed_file, get_secure_filename,os
from flask import current_app
from flask import send_from_directory
from flask import request, jsonify, abort

from werkzeug.exceptions import Conflict, InternalServerError
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

@main.route("/api/v1/speakers", methods=["GET"])
def get_speakers():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)
    
    pagination = Speaker.query.paginate(page=page, per_page=per_page, error_out=False)

    if not pagination.items:
        return jsonify({"error": "No speakers found"}), 404

    return jsonify({
        "speakers": [speaker.format() for speaker in pagination.items],
        "total_pages": pagination.pages,
        "total_items": pagination.total
    }), 200


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




@main.route('/api/v1/speakers/<int:speaker_id>', methods=['DELETE'])
def delete_speaker(speaker_id):
    speaker = Speaker.query.get_or_404(speaker_id)

    # OPTIONAL: check for related events
    # events = Event.query.filter_by(speaker_id=speaker_id).all()
    # if events:
    #     abort(Conflict("This speaker has associated events, please delete them first."))

    # Delete the avatar file if it exists and is not default

    if speaker.speaker_avatar and speaker.speaker_avatar != "default_avatar.png":
        avatar_path= os.path.join(current_app.config["UPLOAD_FOLDER"], speaker.speaker_avatar)
        if os.path.exists(avatar_path): 
            os.remove(avatar_path)
        

    try:
        db.session.delete(speaker)
        db.session.commit()
        return jsonify({"message": "Speaker deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        abort(InternalServerError("Error while deleting speaker"))


