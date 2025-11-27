from flask import Blueprint, render_template
from flask_login import login_required, current_user
from app.models import User

bp = Blueprint('admin', __name__)

@bp.before_request
def restrict_access():
    if not current_user.is_authenticated or not current_user.is_admin:
        return "Access Denied", 403

@bp.route('/dashboard')
def dashboard():
    users = User.query.all()
    return render_template('admin/dashboard.html', users=users)
