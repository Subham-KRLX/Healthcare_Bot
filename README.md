# 🏥 AI Healthcare Bot System

An intelligent healthcare chatbot system built with Flask and Machine Learning that provides symptom analysis, disease prediction, and personalized health recommendations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Machine Learning Model](#machine-learning-model)
- [Admin Panel](#admin-panel)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The AI Healthcare Bot is a web-based application that uses machine learning to help users identify potential diseases based on their symptoms. The system provides:

- **Symptom Analysis**: Natural language processing to detect symptoms from user messages
- **Disease Prediction**: Random Forest classifier trained on medical datasets
- **Health Recommendations**: Personalized precautions and health tips
- **User Profiles**: Secure user authentication and profile management
- **Admin Dashboard**: Administrative interface for system management

> **⚠️ Important**: This is an educational/demonstration project. The AI predictions should NOT replace professional medical diagnosis. Always consult a qualified healthcare provider for medical advice.

## ✨ Features

### User Features
- ✅ **User Registration & Authentication**: Secure signup/login system with password hashing
- ✅ **Interactive Chat Interface**: Natural language conversation with the healthcare bot
- ✅ **Symptom Detection**: Automatic symptom extraction from user messages
- ✅ **Disease Prediction**: ML-powered disease identification based on symptoms
- ✅ **Health Precautions**: Personalized recommendations for predicted conditions
- ✅ **User Profile Management**: Store and update personal health information
- ✅ **Doctor Finder**: Feature to locate healthcare providers (placeholder)

### Admin Features
- 🔐 **Admin Dashboard**: View and manage all registered users
- 📊 **User Analytics**: Track system usage and user data
- 🛡️ **Access Control**: Role-based access restrictions

### Not Included
- ❌ Real-time doctor consultation
- ❌ Medical records storage
- ❌ Prescription management
- ❌ Payment/billing system
- ❌ Multi-language support
- ❌ Mobile app (web-only)

## 🛠️ Technology Stack

### Backend
- **Python 3.x**: Core programming language
- **Flask 3.0.0**: Web framework
- **Flask-SQLAlchemy 3.1.1**: ORM for database operations
- **Flask-Login 0.6.3**: User session management
- **SQLite**: Database (can be replaced with PostgreSQL/MySQL)

### Machine Learning
- **scikit-learn 1.3.1**: Random Forest classifier
- **pandas 2.1.1**: Data manipulation
- **numpy 1.26.0**: Numerical computations
- **pickle**: Model serialization

### Frontend
- **HTML5/CSS3**: Structure and styling
- **JavaScript**: Client-side interactivity
- **Bootstrap** (if used): Responsive design

## 📁 Project Structure

```
healthcare_bot/
│
├── app/                          # Main application package
│   ├── __init__.py              # App factory and configuration
│   ├── models.py                # Database models (User, Profile)
│   │
│   ├── auth/                    # Authentication blueprint
│   │   ├── __init__.py         # Login, logout, register routes
│   │   └── templates/          # Auth templates
│   │
│   ├── main/                    # Main application blueprint
│   │   ├── __init__.py         # Index, profile routes
│   │   └── templates/          # Main templates
│   │
│   ├── bot/                     # Healthcare bot blueprint
│   │   ├── __init__.py         # Chat and prediction logic
│   │   └── templates/          # Bot templates
│   │
│   ├── admin/                   # Admin panel blueprint
│   │   ├── __init__.py         # Dashboard and management
│   │   └── templates/          # Admin templates
│   │
│   ├── static/                  # Static assets
│   │   ├── css/                # Stylesheets
│   │   ├── js/                 # JavaScript files
│   │   └── images/             # Images and icons
│   │
│   └── templates/               # Base templates
│       └── base.html           # Base template with navigation
│
├── ml_model/                    # Machine learning components
│   ├── train_model.py          # Model training script
│   ├── dataset.csv             # Training dataset (symptoms → diseases)
│   ├── model.pkl               # Trained Random Forest model
│   ├── columns.pkl             # Feature columns (symptoms)
│   └── precautions.pkl         # Disease precautions mapping
│
├── config.py                    # Application configuration
├── run.py                       # Application entry point
├── init_db.py                   # Database initialization script
├── requirements.txt             # Python dependencies
├── app.db                       # SQLite database (generated)
└── README.md                    # This file
```

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Step-by-Step Setup

1. **Clone or download the project**
   ```bash
   cd /path/to/healthcare_bot
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python init_db.py
   ```
   This will:
   - Create the SQLite database (`app.db`)
   - Set up User and Profile tables
   - Create a default admin user:
     - **Username**: `admin`
     - **Password**: `admin123`
     - **Email**: `admin@example.com`

5. **Train the ML model** (if model files don't exist)
   ```bash
   cd ml_model
   python train_model.py
   cd ..
   ```
   This generates:
   - `model.pkl`: Trained Random Forest classifier
   - `columns.pkl`: List of symptom features
   - `precautions.pkl`: Disease-to-precautions mapping

6. **Run the application**
   ```bash
   python run.py
   ```

7. **Access the application**
   - Open your browser and navigate to: `http://127.0.0.1:5000`
   - Register a new user or login with admin credentials

## 💡 Usage

### For Regular Users

1. **Register an Account**
   - Click "Register" on the homepage
   - Fill in your username, email, and password
   - Submit to create your account

2. **Login**
   - Use your credentials to login
   - You'll be redirected to the home page

3. **Update Your Profile** (Optional)
   - Navigate to "Profile" in the navigation bar
   - Add your age, gender, contact number, and address
   - This helps personalize recommendations

4. **Chat with the Healthcare Bot**
   - Click "Chat" or navigate to `/chat`
   - Describe your symptoms in natural language
   - Example: *"I have itching, skin rash, and nodal skin eruptions"*
   - The bot will:
     - Detect symptoms from your message
     - Predict the most likely disease
     - Provide recommended precautions

5. **View Precautions**
   - Access general health precautions and tips
   - Navigate to `/precautions`

### For Administrators

1. **Login as Admin**
   - Default credentials: `admin` / `admin123`
   - ⚠️ **Change these in production!**

2. **Access Admin Dashboard**
   - Navigate to `/admin/dashboard`
   - View all registered users
   - See user details (username, email, admin status)

## 🤖 Machine Learning Model

### Dataset
- **Format**: CSV file with symptoms and diseases
- **Structure**:
  - Columns: `Disease`, `Symptom_1`, `Symptom_2`, ..., `Symptom_N`, `Precaution_1`, ..., `Precaution_4`
  - Each row represents a disease with associated symptoms and precautions

### Model Architecture
- **Algorithm**: Random Forest Classifier
- **Estimators**: 100 decision trees
- **Input**: Binary vector of symptoms (1 = present, 0 = absent)
- **Output**: Disease prediction (single class)

### Training Process
1. Load dataset from `ml_model/dataset.csv`
2. Extract all unique symptoms from symptom columns
3. Create binary feature matrix (one-hot encoding for symptoms)
4. Train Random Forest on 80% of data
5. Test on remaining 20% (accuracy printed)
6. Save model, columns, and precautions as pickle files

### Prediction Flow
1. User enters message in chat
2. System extracts symptoms using keyword matching
3. Create input vector with detected symptoms
4. Model predicts the disease
5. Retrieve associated precautions from precautions mapping
6. Display results to user

### Limitations
- **Keyword Matching**: Uses simple string matching (not NLP)
- **Limited Dataset**: Depends on training data quality
- **No Uncertainty**: Doesn't provide confidence scores
- **Single Disease**: Predicts only one disease per request

## 🔐 Admin Panel

The admin panel provides system oversight:

- **URL**: `/admin/dashboard`
- **Access**: Requires admin privileges (`is_admin=True`)
- **Features**:
  - View all registered users
  - See user details (username, email, admin status)
  - (Future) Manage users, view analytics, system logs

### Creating Additional Admins

To promote a user to admin, use the Python shell:

```bash
python
>>> from app import create_app, db
>>> from app.models import User
>>> app = create_app()
>>> with app.app_context():
...     user = User.query.filter_by(username='username_here').first()
...     user.is_admin = True
...     db.session.commit()
...     print(f"{user.username} is now an admin")
```

## 🗄️ Database Schema

### User Table
| Column         | Type    | Constraints          | Description              |
|----------------|---------|----------------------|--------------------------|
| id             | Integer | Primary Key          | Unique user ID           |
| username       | String  | Unique, Indexed      | Login username           |
| email          | String  | Unique, Indexed      | User email address       |
| password_hash  | String  | -                    | Hashed password          |
| is_admin       | Boolean | Default: False       | Admin privilege flag     |

### Profile Table
| Column         | Type    | Constraints          | Description              |
|----------------|---------|----------------------|--------------------------|
| id             | Integer | Primary Key          | Unique profile ID        |
| user_id        | Integer | Foreign Key, Unique  | References User.id       |
| age            | Integer | -                    | User's age               |
| gender         | String  | -                    | User's gender            |
| contact_number | String  | -                    | Phone number             |
| address        | String  | -                    | Physical address         |

**Relationship**: One-to-One (User ↔ Profile)

## 🚧 Future Enhancements

### Planned Features
- [ ] **NLP Integration**: Use spaCy/NLTK for better symptom extraction
- [ ] **Multi-Disease Prediction**: Predict multiple possible conditions with probabilities
- [ ] **Medical History**: Track user's past consultations and predictions
- [ ] **Appointment Booking**: Schedule appointments with doctors
- [ ] **Real-time Chat**: WebSocket-based live chat
- [ ] **Notification System**: Email/SMS alerts for health tips
- [ ] **Data Visualization**: Charts for health trends
- [ ] **API Integration**: Connect with real doctor databases
- [ ] **Mobile App**: React Native/Flutter mobile version
- [ ] **Multi-language**: Support for multiple languages

### Potential Improvements
- Replace keyword matching with NER (Named Entity Recognition)
- Add confidence scores to predictions
- Implement model retraining workflow
- Add unit and integration tests
- Implement API rate limiting
- Add logging and monitoring
- Deploy to cloud (AWS/Azure/GCP)
- Add HTTPS and security hardening

## 📄 License

This project is for educational purposes. Please add your own license if distributing.

## ⚠️ Disclaimer

This application is a demonstration project and should NOT be used for actual medical diagnosis or treatment. Always consult qualified healthcare professionals for medical advice, diagnosis, and treatment. The developers are not responsible for any health decisions made based on this application.

## 👨‍💻 Developer Notes

### Configuration
- **Secret Key**: Set `SECRET_KEY` environment variable in production
- **Database**: SQLite by default; configure `DATABASE_URL` for PostgreSQL/MySQL
- **Debug Mode**: Disable `debug=True` in production (`run.py`)

### Security Considerations
- ⚠️ Change default admin credentials immediately
- ⚠️ Use strong secret keys in production
- ⚠️ Implement HTTPS for production deployment
- ⚠️ Add CSRF protection for forms
- ⚠️ Implement rate limiting for API endpoints
- ⚠️ Sanitize user inputs to prevent SQL injection

### Troubleshooting

**Issue**: "SqliteError: no such table"
- **Solution**: Run `python init_db.py` to create database tables

**Issue**: "ModuleNotFoundError"
- **Solution**: Ensure virtual environment is activated and dependencies installed

**Issue**: "ML model not found"
- **Solution**: Run `python ml_model/train_model.py` to generate model files

**Issue**: "Admin login denied"
- **Solution**: Check that user has `is_admin=True` in database

## 📧 Contact

For questions, issues, or contributions, please contact the project maintainer.

---
