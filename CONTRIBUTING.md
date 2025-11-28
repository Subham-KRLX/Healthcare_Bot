# Contributing to HealthBot.AI

Thank you for considering contributing to HealthBot.AI! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Setup Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subham-KRLX/Healthcare_Bot.git
   cd Healthcare_Bot
   ```

2. **Backend Setup**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python init_db.py
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Development Workflow

### Running Locally

**Backend:**
```bash
python run.py
```

**Frontend:**
```bash
cd client
npm run dev
```

### Making Changes

1. Create a new branch for your feature/fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Test your changes thoroughly

4. Commit with descriptive messages
   ```bash
   git commit -m "feat: add new symptom analysis feature"
   ```

## Commit Message Guidelines

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Code Style

### Python
- Follow PEP 8 guidelines
- Use meaningful variable names
- Add docstrings to functions and classes

### JavaScript/React
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful component and variable names
- Keep components focused and reusable

## Pull Request Process

1. Update README.md with details of changes if applicable
2. Ensure all tests pass
3. Update documentation as needed
4. Request review from maintainers
5. Address any review feedback

## Reporting Bugs

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- System information (OS, browser, etc.)

## Feature Requests

We welcome feature requests! Please:
- Search existing issues first
- Provide detailed description
- Explain the use case
- Consider implementation details

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing! 🚀
