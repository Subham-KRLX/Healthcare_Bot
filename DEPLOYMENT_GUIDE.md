# 🚀 Deployment Guide - Healthcare Bot

This guide covers multiple deployment options for the Healthcare Bot Flask application.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Pushed all code to GitHub
- ✅ `requirements.txt` is up to date
- ✅ ML model files are included (or regenerated on deployment)
- ✅ Environment variables configured

---

## 🎯 Recommended Deployment Platforms

### 1. 🟢 **Render.com** (Recommended - Easiest)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Persistent disk storage for SQLite
- ✅ Supports Python/Flask natively
- ✅ SSL certificates included

#### Step-by-Step Deployment on Render:

1. **Create a `render.yaml` file** (add to your project root):

```yaml
services:
  - type: web
    name: healthcare-bot
    env: python
    buildCommand: pip install -r requirements.txt && python init_db.py
    startCommand: gunicorn run:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.9.0
      - key: SECRET_KEY
        generateValue: true
      - key: FLASK_ENV
        value: production
```

2. **Update `requirements.txt`** to include gunicorn:

```txt
Flask==2.3.0
Flask-SQLAlchemy==3.0.3
Flask-Login==0.6.2
pandas==2.0.0
numpy==1.24.0
scikit-learn==1.2.2
gunicorn==21.2.0
```

3. **Create account & deploy**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your `Healthcare_Bot` repository
   - Render will auto-detect settings
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

4. **Configure persistent disk** (for SQLite):
   - In Render dashboard → Your service → "Disks"
   - Add disk: Mount path `/opt/render/project/src/instance`
   - Size: 1GB (free)

---

### 2. 🟣 **Railway.app** (Modern & Developer-Friendly)

**Why Railway?**
- ✅ $5 free credit monthly
- ✅ Simple GitHub integration
- ✅ Automatic HTTPS
- ✅ Great for databases

#### Deployment Steps:

1. **Create `railway.json`**:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "gunicorn run:app",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Create `Procfile`**:

```
web: gunicorn run:app
```

3. **Deploy**:
   - Go to [railway.app](https://railway.app)
   - "New Project" → "Deploy from GitHub repo"
   - Select `Healthcare_Bot`
   - Add environment variables:
     - `SECRET_KEY`: Generate a random string
     - `FLASK_ENV`: production
   - Deploy automatically starts

---

### 3. 🔵 **PythonAnywhere** (Python-Specific, Very Beginner-Friendly)

**Why PythonAnywhere?**
- ✅ 100% free tier available
- ✅ Designed specifically for Python web apps
- ✅ No credit card required
- ✅ Simple file management

#### Deployment Steps:

1. **Sign up**: [pythonanywhere.com](https://www.pythonanywhere.com)

2. **Clone your repository**:
   - Open "Consoles" → "Bash"
   ```bash
   git clone https://github.com/Subham-KRLX/Healthcare_Bot.git
   cd Healthcare_Bot
   pip install --user -r requirements.txt
   python init_db.py
   ```

3. **Create Web App**:
   - Go to "Web" tab → "Add a new web app"
   - Choose "Manual configuration"
   - Python 3.9 or 3.10
   - Set source code: `/home/yourusername/Healthcare_Bot`

4. **Configure WSGI**:
   - Edit the WSGI configuration file to:
   ```python
   import sys
   path = '/home/yourusername/Healthcare_Bot'
   if path not in sys.path:
       sys.path.append(path)
   
   from run import app as application
   ```

5. **Reload** web app from Web tab

---

### 4. 🟠 **Fly.io** (Good for Advanced Users)

**Why Fly.io?**
- ✅ Free tier with 3 VMs
- ✅ Global deployment
- ✅ Persistent volumes

#### Deployment Steps:

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Create `fly.toml`**:
   ```bash
   fly launch
   ```

3. **Deploy**:
   ```bash
   fly deploy
   ```

---

## ⚙️ Important Configuration Changes

### For Production Deployment:

1. **Update `config.py`**:

```python
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

2. **Create `.env` file** (don't commit this):
```
SECRET_KEY=your-super-secret-random-key-here
FLASK_ENV=production
```

3. **Update `.gitignore`** to include:
```
.env
*.db
__pycache__/
*.pyc
instance/
```

---

## 🔒 Security Checklist Before Deployment

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `FLASK_ENV=production`
- [ ] Disable debug mode in production
- [ ] Use environment variables for sensitive data
- [ ] Update `requirements.txt` with exact versions
- [ ] Add rate limiting for API endpoints
- [ ] Enable HTTPS (most platforms do this automatically)

---

## 🎯 My Recommendation for You

**Start with Render.com** because:
1. ✅ Completely free tier
2. ✅ Easiest setup (3 clicks)
3. ✅ Automatic deployments from GitHub
4. ✅ Persistent storage for your database
5. ✅ No credit card required
6. ✅ Professional-looking URL

---

## 📱 Testing Your Deployment

After deployment, test:
1. Homepage loads correctly
2. User registration works
3. Login/logout functionality
4. Chat bot responds
5. Disease prediction works
6. Admin panel accessible

---

## 🆘 Troubleshooting Common Issues

### Issue: "Module not found"
**Solution**: Make sure all dependencies are in `requirements.txt`

### Issue: "Database not found"
**Solution**: Run `python init_db.py` on the deployment platform

### Issue: "500 Internal Server Error"
**Solution**: Check logs on your platform dashboard

### Issue: "ML Model not loading"
**Solution**: Ensure pickle files are committed or retrain on deployment

---

## 📊 Deployment Comparison

| Platform | Free Tier | Ease | Database | Best For |
|----------|-----------|------|----------|----------|
| **Render** | ✅ Yes | ⭐⭐⭐⭐⭐ | Persistent disk | Beginners |
| **Railway** | $5/month | ⭐⭐⭐⭐ | Built-in | Modern stack |
| **PythonAnywhere** | ✅ Yes | ⭐⭐⭐⭐ | File-based | Python devs |
| **Fly.io** | ✅ Yes | ⭐⭐⭐ | Volumes | Advanced users |
| **Vercel** | ✅ Yes | ⭐⭐ | ❌ Serverless | Static/Next.js |

---

## 🚀 Quick Start with Render (5 Minutes)

1. Push your code to GitHub ✓ (Already done!)
2. Sign up at [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub → Select `Healthcare_Bot`
5. Build Command: `pip install -r requirements.txt && python init_db.py`
6. Start Command: `gunicorn run:app`
7. Click "Create Web Service"
8. Done! 🎉

---

**Next Steps**: Would you like me to help you set up the deployment files for a specific platform?
