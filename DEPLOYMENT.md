# Deployment Guide

## Overview
This guide covers deploying the Healthcare Bot application to various platforms.

## Deployment Options

### 1. Heroku Deployment

#### Prerequisites
- Heroku account
- Heroku CLI installed
- Git installed

#### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create Heroku App**
```bash
heroku create your-healthcare-bot
```

3. **Set Environment Variables**
```bash
heroku config:set SECRET_KEY="your-secret-key"
heroku config:set DATABASE_URL="postgresql://..."
heroku config:set FLASK_ENV="production"
```

4. **Deploy**
```bash
git push heroku main
```

5. **Initialize Database**
```bash
heroku run python init_db.py
```

6. **Open Application**
```bash
heroku open
```

### 2. Render Deployment

#### Prerequisites
- Render account
- GitHub repository connected

#### Steps

1. **Create Web Service** on Render dashboard
2. **Connect Repository**: `https://github.com/Subham-KRLX/Healthcare_Bot`
3. **Configure Build Settings**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn run:app`
4. **Set Environment Variables** in Render dashboard
5. **Deploy**: Automatic deployment on git push

The `render.yaml` file is already configured for automatic deployment.

### 3. AWS EC2 Deployment

#### Prerequisites
- AWS account
- EC2 instance (Ubuntu 20.04+)
- SSH access to instance

#### Steps

1. **Connect to EC2 Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx -y
```

3. **Clone Repository**
```bash
git clone https://github.com/Subham-KRLX/Healthcare_Bot.git
cd Healthcare_Bot
```

4. **Setup Virtual Environment**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

5. **Configure Environment**
```bash
cp .env.example .env
nano .env  # Edit with production values
```

6. **Initialize Database**
```bash
python init_db.py
```

7. **Setup Systemd Service**
Create `/etc/systemd/system/healthcare-bot.service`:
```ini
[Unit]
Description=Healthcare Bot Flask Application
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Healthcare_Bot
Environment="PATH=/home/ubuntu/Healthcare_Bot/venv/bin"
ExecStart=/home/ubuntu/Healthcare_Bot/venv/bin/gunicorn -w 4 -b 0.0.0.0:8000 run:app

[Install]
WantedBy=multi-user.target
```

8. **Start Service**
```bash
sudo systemctl start healthcare-bot
sudo systemctl enable healthcare-bot
```

9. **Configure Nginx**
Create `/etc/nginx/sites-available/healthcare-bot`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/healthcare-bot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Docker Deployment

#### Prerequisites
- Docker installed
- Docker Compose installed (optional)

#### Using Dockerfile

1. **Build Image**
```bash
docker build -t healthcare-bot .
```

2. **Run Container**
```bash
docker run -d -p 5000:5000 \
  -e SECRET_KEY="your-secret-key" \
  -e DATABASE_URL="sqlite:///app.db" \
  --name healthcare-bot \
  healthcare-bot
```

#### Using Docker Compose

1. **Start Services**
```bash
docker-compose up -d
```

2. **View Logs**
```bash
docker-compose logs -f
```

3. **Stop Services**
```bash
docker-compose down
```

### 5. DigitalOcean App Platform

#### Steps

1. **Connect GitHub Repository**
2. **Configure App**:
   - Type: Web Service
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `gunicorn run:app`
3. **Set Environment Variables**
4. **Deploy**: Automatic on git push

## Environment Variables

Required environment variables for production:

```env
SECRET_KEY=your-very-secret-key-here
DATABASE_URL=your-database-url
FLASK_ENV=production
SESSION_COOKIE_SECURE=True
SESSION_COOKIE_HTTPONLY=True
SESSION_COOKIE_SAMESITE=Lax
```

## Database Migration

For production databases:

1. **Backup Current Database**
```bash
pg_dump database_name > backup.sql
```

2. **Run Migration**
```bash
python init_db.py
```

3. **Restore Data** (if needed)
```bash
psql database_name < backup.sql
```

## SSL/TLS Configuration

### Using Let's Encrypt (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Logging

### Setup Application Monitoring

1. **Install Sentry** (optional)
```bash
pip install sentry-sdk[flask]
```

2. **Configure in app/__init__.py**
```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()]
)
```

### View Logs

**Heroku:**
```bash
heroku logs --tail
```

**Systemd Service:**
```bash
sudo journalctl -u healthcare-bot -f
```

**Docker:**
```bash
docker logs -f healthcare-bot
```

## Performance Optimization

1. **Use Production WSGI Server**: Gunicorn or uWSGI
2. **Enable Caching**: Redis or Memcached
3. **Use CDN**: For static assets
4. **Database Connection Pooling**: SQLAlchemy pool settings
5. **Enable Compression**: gzip middleware

## Security Checklist

- [ ] Set strong SECRET_KEY
- [ ] Use HTTPS in production
- [ ] Set secure cookie flags
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] Monitoring and alerting setup

## Rollback Procedure

### Heroku
```bash
heroku releases
heroku rollback v123
```

### Manual Deployment
```bash
git checkout previous-stable-tag
./deploy.sh
```

## Troubleshooting

### Application Won't Start
1. Check logs for errors
2. Verify environment variables
3. Test database connection
4. Check file permissions

### Database Connection Errors
1. Verify DATABASE_URL
2. Check database server status
3. Test network connectivity
4. Review firewall rules

### Performance Issues
1. Check resource usage (CPU, memory)
2. Review database query performance
3. Enable application profiling
4. Check for memory leaks

## Support

For deployment issues:
- Create an issue on GitHub
- Check existing documentation
- Review application logs
