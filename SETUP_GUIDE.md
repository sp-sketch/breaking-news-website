# 🔧 Complete Setup Guide

## Prerequisites

Install these first:
- **Node.js 16+** - https://nodejs.org/
- **MongoDB** - https://www.mongodb.com/try/download/community
- **Git** - https://git-scm.com/

Verify:
```bash
node -v
npm -v
git -v
```

## Step 1: Clone Repository

```bash
git clone https://github.com/sp-sketch/breaking-news-website.git
cd breaking-news-website
```

## Step 2: Automated Setup

### macOS/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

### Windows:
```bash
setup.bat
```

This will:
- ✅ Check Node.js and npm
- ✅ Create uploads directory
- ✅ Install dependencies
- ✅ Create .env file

## Step 3: Configure Environment

Edit `.env` file with your settings:

```env
# Server
PORT=5000
NODE_ENV=development

# Database - Choose one:
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/breaking-news

# OR MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/breaking-news

# Security
JWT_SECRET=your-secret-key-change-this

# Frontend
CORS_ORIGIN=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
```

**Generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Setup MongoDB

### Option A: Local MongoDB

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
1. Download MongoDB Community Edition
2. Run installer
3. Check "Install MongoDB as a Windows Service"
4. MongoDB starts automatically

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Recommended for Cloud)

1. Visit https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/breaking-news`
5. Update MONGODB_URI in .env

**Verify Connection:**
```bash
mongosh
use breaking-news
show collections
exit
```

## Step 5: Start Backend Server

Terminal 1:
```bash
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

**Test it:**
```bash
curl http://localhost:5000/health
# Response: {"status":"Server is running"}
```

## Step 6: Start Frontend

Terminal 2:
```bash
cd frontend
python -m http.server 8000
```

Open browser: **http://localhost:8000**

## Testing Features

### 1. Test Search
Search for any text in the search box

### 2. Test Categories Filter
Click on category buttons (Politics, Sports, etc.)

### 3. Test Dark Mode
Click moon icon (🌙) in top right

### 4. Check Console
Press F12 to see any errors

## Troubleshooting

### "MongoDB connection error"
```bash
# Check if MongoDB is running
mongosh

# If connection fails:
# macOS: brew services start mongodb-community
# Windows: Check Services app for MongoDB
# Linux: sudo systemctl start mongod
```

### "Port 5000 already in use"
```bash
# Edit .env
PORT=5001

# Restart backend
npm start
```

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "CORS error in browser"
- Ensure backend is running on http://localhost:5000
- Check CORS_ORIGIN in .env
- Update API_BASE_URL in frontend/js/api.js if needed

### "Frontend loads but shows 'Loading articles...'"
1. Open browser console (F12)
2. Check for errors in Network tab
3. Verify backend is running: http://localhost:5000/health
4. Check API_BASE_URL points to correct backend

## Project Structure

```
breaking-news-website/
├── frontend/                    Frontend files
│   ├── index.html              Main HTML
│   ├── css/
│   │   ├── styles.css          Main styles
│   │   └── responsive.css      Mobile styles
│   └── js/
│       ├── app.js              App logic
│       ├── api.js              API functions
│       └── utils.js            Utilities
├── backend/                     Backend API
│   ├── server.js               Express server
│   ├── models/
│   │   ├── Article.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/
│   │   ├── articles.js
│   │   ├── categories.js
│   │   └── auth.js
│   └── middleware/
│       └── auth.js
├── uploads/                     Article images
├── .env                         Configuration
├── package.json                 Dependencies
├── setup.sh / setup.bat         Setup scripts
├── QUICK_START.md              Quick reference
└── README.md                    Project info
```

## Common Commands

```bash
# Install dependencies
npm install

# Start backend (production)
npm start

# Start backend with auto-reload (development)
npm run dev

# Start frontend
cd frontend && python -m http.server 8000

# View MongoDB
mongosh
use breaking-news
db.articles.find()
```

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Backend port |
| NODE_ENV | development | Environment |
| MONGODB_URI | localhost | Database URL |
| JWT_SECRET | (required) | Auth secret |
| CORS_ORIGIN | localhost:3000 | Frontend URL |
| MAX_FILE_SIZE | 10485760 | Max upload (bytes) |

## API Quick Reference

### Get All Articles
```bash
curl http://localhost:5000/api/articles
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'
```

### Create Article (Requires Token)
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Breaking News Title",
    "content":"Article content here",
    "category":"Politics",
    "status":"published"
  }'
```

## Next Steps

1. ✅ Run setup.sh or setup.bat
2. ✅ Configure .env file
3. ✅ Start backend: `npm start`
4. ✅ Start frontend: `python -m http.server 8000`
5. ⬜ Create admin account via API
6. ⬜ Create sample articles
7. ⬜ Test all features
8. ⬜ Build admin dashboard
9. ⬜ Deploy to production

## Getting Help

- Check error messages in terminal
- Open browser console (F12) for frontend errors
- Review QUICK_START.md for quick commands
- Check backend logs for API errors
- Create issue on GitHub if stuck

## Useful Links

- [Node.js Docs](https://nodejs.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express Guide](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)

---

**🎉 Setup complete! Your breaking news website is ready to go!**