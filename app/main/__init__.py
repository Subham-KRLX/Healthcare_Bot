from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required, current_user
from app import db
from app.models import Profile

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('main/index.html')

@bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        if current_user.profile:
            profile = current_user.profile
        else:
            profile = Profile(user_id=current_user.id)
            
        profile.age = request.form.get('age')
        profile.gender = request.form.get('gender')
        profile.contact_number = request.form.get('contact_number')
        profile.address = request.form.get('address')
        
        db.session.add(profile)
        db.session.commit()
        flash('Profile updated successfully.')
        return redirect(url_for('main.profile'))
        
    return render_template('main/profile.html', user=current_user)

@bp.route('/precautions')
def precautions():
    return render_template('main/precautions.html')
