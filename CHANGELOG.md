# Changelog

All notable changes to the Healthcare Bot project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive API documentation
- Testing guide with examples and best practices
- Deployment guide for multiple platforms (Heroku, Render, AWS, Docker, DigitalOcean)
- Docker configuration (Dockerfile, docker-compose.yml, .dockerignore)
- This CHANGELOG file

## [1.2.0] - 2025-12-02

### Added
- Security enhancements including CSRF protection
- Input validation for all user inputs
- Secure session management
- Security policy document (SECURITY.md)

### Security
- Implemented CSRF token validation
- Added input sanitization to prevent XSS attacks
- Enhanced session security with httpOnly and secure flags
- SQL injection prevention through parameterized queries

## [1.1.0] - 2025-11-30

### Added
- GitHub issue templates for bug reports
- Prettier configuration for code formatting
- Code of Conduct for community guidelines
- EditorConfig for consistent coding styles
- Contributing guidelines (CONTRIBUTING.md)

### Changed
- Improved README with better documentation
- Updated project structure

## [1.0.0] - 2025-11-20

### Added
- Initial release of Healthcare Bot
- User authentication system (login/register)
- Health prediction based on symptoms
- Machine learning model for disease prediction
- Medical history tracking
- RESTful API endpoints
- Flask-based backend
- SQLite database integration
- Basic security features
- Environment configuration
- Render deployment configuration

### Features
- **Authentication**: User registration and login
- **Predictions**: AI-powered health predictions based on symptoms
- **History**: Track previous consultations
- **Security**: Password hashing with bcrypt
- **API**: RESTful API for all operations

## [0.1.0] - 2025-11-01

### Added
- Project initialization
- Basic Flask application setup
- Database models
- Initial routes and views
- Requirements file
- Git repository initialization

---

## Categories

### Added
- New features or functionality

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed in upcoming releases

### Removed
- Features that have been removed

### Fixed
- Bug fixes

### Security
- Security-related changes or fixes

---

## Contributing

When updating this changelog:
1. Add entries under `[Unreleased]` section
2. Group changes by category (Added, Changed, Fixed, etc.)
3. Use present tense ("Add feature" not "Added feature")
4. Reference issue numbers when applicable
5. Move entries from `[Unreleased]` to a new version section on release

## Links

- [GitHub Repository](https://github.com/Subham-KRLX/Healthcare_Bot)
- [Issue Tracker](https://github.com/Subham-KRLX/Healthcare_Bot/issues)
- [Security Policy](SECURITY.md)
