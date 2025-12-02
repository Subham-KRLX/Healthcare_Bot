# Testing Guide

## Overview
This guide provides instructions for testing the Healthcare Bot application.

## Prerequisites
- Python 3.8 or higher
- pip installed
- Virtual environment activated

## Installation

1. Install testing dependencies:
```bash
pip install pytest pytest-cov pytest-flask flask-testing
```

2. Update `requirements.txt` with testing dependencies:
```bash
pip freeze > requirements.txt
```

## Running Tests

### Unit Tests
Run all unit tests:
```bash
pytest tests/
```

Run tests with coverage:
```bash
pytest --cov=app tests/
```

Run specific test file:
```bash
pytest tests/test_auth.py
```

### Integration Tests
```bash
pytest tests/integration/
```

## Test Structure

```
tests/
├── __init__.py
├── conftest.py          # Shared fixtures
├── test_auth.py         # Authentication tests
├── test_api.py          # API endpoint tests
├── test_models.py       # Database model tests
├── test_security.py     # Security feature tests
└── integration/         # Integration tests
    └── test_user_flow.py
```

## Writing Tests

### Example Unit Test
```python
import pytest
from app import create_app, db
from app.models import User

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.session.remove()
            db.drop_all()

def test_user_registration(client):
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpass123'
    })
    assert response.status_code == 200
    assert response.json['success'] == True
```

### Example Integration Test
```python
def test_complete_user_flow(client):
    # Register
    register_response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'testpass123'
    })
    assert register_response.status_code == 200
    
    # Login
    login_response = client.post('/api/auth/login', json={
        'username': 'testuser',
        'password': 'testpass123'
    })
    assert login_response.status_code == 200
    
    # Get profile
    profile_response = client.get('/api/user/profile')
    assert profile_response.status_code == 200
    assert profile_response.json['user']['username'] == 'testuser'
```

## Test Coverage

Target test coverage: **80%** or higher

Generate HTML coverage report:
```bash
pytest --cov=app --cov-report=html tests/
```

View the report:
```bash
open htmlcov/index.html
```

## Manual Testing

### Testing Authentication Flow
1. Start the application: `python run.py`
2. Navigate to `http://localhost:5000`
3. Register a new account
4. Login with credentials
5. Verify session persistence
6. Test logout functionality

### Testing Health Prediction
1. Login to the application
2. Navigate to the prediction page
3. Select symptoms from the list
4. Submit the form
5. Verify prediction results
6. Check if results are saved in history

### Testing Security Features
1. **CSRF Protection**: Try submitting forms without CSRF token
2. **Input Validation**: Test with invalid inputs
3. **Session Security**: Test session timeout
4. **SQL Injection**: Try SQL injection patterns in inputs

## CI/CD Testing

The project uses GitHub Actions for continuous integration. Tests run automatically on:
- Push to main branch
- Pull requests
- Scheduled weekly runs

## Debugging Tests

Run tests in verbose mode:
```bash
pytest -v tests/
```

Run tests with print statements:
```bash
pytest -s tests/
```

Run specific test:
```bash
pytest tests/test_auth.py::test_user_registration -v
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Always clean up database after tests
3. **Meaningful Names**: Use descriptive test function names
4. **Assertions**: Include clear assertion messages
5. **Coverage**: Aim for high test coverage
6. **Fast Tests**: Keep tests fast and efficient

## Common Issues

### Database Locked
If you encounter "database is locked" errors:
```bash
rm app.db
python init_db.py
```

### Import Errors
Ensure PYTHONPATH includes the project root:
```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)"
```

## Performance Testing

Use locust for performance testing:
```bash
pip install locust
locust -f tests/performance/locustfile.py
```

## Security Testing

Run security checks:
```bash
pip install bandit safety
bandit -r app/
safety check
```
