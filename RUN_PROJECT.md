# 🚀 Run Your Breaking News Website

Complete step-by-step guide to get your project running locally.

---

## Prerequisites Checklist

Before starting, verify you have:

- ✅ Node.js 16+ installed (`node -v`)
- ✅ npm installed (`npm -v`)
- ✅ MongoDB running (local or Atlas)
- ✅ Project cloned (`git clone ...`)
- ✅ Dependencies installed (`npm install`)
- ✅ `.env` file configured

If any are missing, see [SETUP_GUIDE.md](SETUP_GUIDE.md) and [DATABASE_SETUP.md](DATABASE_SETUP.md)

---

## Step 1: Verify Environment Setup

### Check .env File

```bash
# View your .env file
cat .env          # macOS/Linux
# OR
type .env         # Windows
```

**Should contain:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/breaking-news
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
```

If missing any, run:
```bash
cp .env.example .env
# Then edit .env with your values
```

### Check MongoDB Connection

```bash
# Test MongoDB is running
mongosh

# You should see: >
# If not, start MongoDB (see DATABASE_SETUP.md)

# Exit
exit
```

---

## Step 2: Install Dependencies

```bash
# Make sure you're in project root directory
cd breaking-news-website

# Install all dependencies
npm install

# Takes 1-3 minutes
# You'll see: added XXX packages
```

**If this fails:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

## Step 3: Start Backend Server

### Terminal 1 - Backend

```bash
# From project root directory
npm start

# Expected output:
# Server running on port 5000
# MongoDB connected
```

✅ **Backend is now running!**

### Test Backend is Working

```bash
# In a new terminal/command prompt
curl http://localhost:5000/health

# Should return:
# {"status":"Server is running"}
```

---

## Step 4: Start Frontend Server

### Terminal 2 - Frontend

```bash
# Navigate to frontend directory
cd frontend

# Start frontend server
python -m http.server 8000

# Expected output:
# Serving HTTP on 0.0.0.0 port 8000
```

✅ **Frontend is now running!**

---

## Step 5: Open Browser

### Visit Your Website

```
http://localhost:8000
```

You should see:
- 🔴 Red header with "Breaking News"
- Navigation menu (Home, Latest, Categories, Admin)
- Search box
- "Loading articles..." message

---

## Step 6: Test Features

### 1. Check Console for Errors
```
Press F12 (or Cmd+Option+I on Mac)
```

Look at:
- **Console tab** - Any red errors?
- **Network tab** - Is API connected?

If no errors, your setup is working! ✅

### 2. Test Search
```
Try searching for any text
(No articles yet, but search should work)
```

### 3. Test Dark Mode
```
Click moon icon (🌙) in top right
Page should turn dark
```

### 4. Test Categories Filter
```
Click different category buttons
(No results yet, but buttons should work)
```

---

## Step 7: Create Sample Data

### Create Admin Account

```bash
# In a new terminal, use curl or Postman

curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123",
    "name": "Admin User"
  }'

# Response should include:
# {"user": {...}, "token": "eyJ..."}
```

**Save the token** - you'll need it for creating articles!

### Create Sample Categories

```bash
# Get the token from login response above
TOKEN="your-token-here"

curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Politics", "description": "Political news"}'

curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Sports", "description": "Sports news"}'

curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Technology", "description": "Tech news"}'
```

### Create Sample Articles

```bash
# Use your token from admin account
TOKEN="your-token-here"

curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Breaking News: New Discovery",
    "content": "Scientists have made a groundbreaking discovery today that could change everything. This is a detailed article about the discovery...",
    "excerpt": "Scientists announce major discovery",
    "category": "Technology",
    "status": "published"
  }'

# Create more articles with different categories
curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sports Update: Championship Game",
    "content": "The championship game was intense. Both teams played their best...",
    "excerpt": "Teams compete for trophy",
    "category": "Sports",
    "status": "published"
  }'
```

---

## Step 8: Refresh Browser

After creating sample data, refresh your browser:

```
Press F5 or Ctrl+R
```

You should now see:
- ✅ Featured article at the top
- ✅ Article cards in the grid
- ✅ Categories filter working
- ✅ Search functionality

---

## Full Running Setup

### Terminal 1 - Backend
```bash
cd breaking-news-website
npm start
# Keep this running
```

### Terminal 2 - Frontend
```bash
cd breaking-news-website/frontend
python -m http.server 8000
# Keep this running
```

### Terminal 3 - API Calls (Optional)
```bash
# Use this for creating data or testing
# See API examples above
```

### Browser
```
http://localhost:8000
```

---

## Development Mode

### Auto-Reload Backend

For automatic restart on file changes, use:

```bash
npm run dev
```

This uses `nodemon` to watch for changes.

---

## Stop the Project

### Stop Backend
```bash
Press Ctrl+C in Terminal 1
```

### Stop Frontend
```bash
Press Ctrl+C in Terminal 2
```

### Stop MongoDB
```bash
# macOS
brew services stop mongodb-community

# Windows - Services app or:
# net stop MongoDB

# Linux
sudo systemctl stop mongod
```

---

## Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
```bash
# Check MongoDB is running
mongosh

# If not running:
# macOS: brew services start mongodb-community
# Windows: Check Services app
# Linux: sudo systemctl start mongod
```

### Issue: "Port 5000 already in use"
```bash
# Change port in .env
PORT=5001

# Restart backend
npm start
```

### Issue: "CORS error in browser console"
```bash
# Make sure:
# 1. Backend is running on port 5000
# 2. Frontend is on port 8000
# 3. CORS_ORIGIN in .env is correct
```

### Issue: "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: "Articles not loading"
```bash
# 1. Check browser console (F12)
# 2. Check Network tab for API errors
# 3. Verify API_BASE_URL in frontend/js/api.js
# 4. Create sample articles (see Step 7)
```

---

## Testing All Features

### ✅ Frontend Working
- [ ] Page loads at http://localhost:8000
- [ ] No console errors (F12)
- [ ] Can see navigation menu
- [ ] Search box visible
- [ ] Dark mode toggle works

### ✅ Backend Working
- [ ] http://localhost:5000/health returns status
- [ ] Backend shows "MongoDB connected"
- [ ] Terminal shows no errors

### ✅ Database Working
- [ ] Can connect with mongosh
- [ ] Created admin account
- [ ] Created sample categories
- [ ] Created sample articles

### ✅ Features Working
- [ ] Articles display on homepage
- [ ] Can search for articles
- [ ] Category filters work
- [ ] Dark mode toggles
- [ ] Time ago displays correctly
- [ ] View count shows

---

## Project URLs

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:8000 | Main website |
| Backend Health | http://localhost:5000/health | Check server status |
| API | http://localhost:5000/api | All API endpoints |
| Database | mongosh | MongoDB terminal |

---

## File Locations During Runtime

```
breaking-news-website/
├── frontend/
│   └── Running on http://localhost:8000
├── backend/
│   └── Running on http://localhost:5000
├── uploads/
│   └── Stores article images
└── .env
    └── Configuration (never commit to git!)
```

---

## Next Steps

Your project is now running! Now you can:

1. 📰 **Create More Articles** - Add news content
2. 🖼️ **Upload Images** - Add featured images
3. 💬 **Test Comments** - Add article comments
4. 🎨 **Build Admin Dashboard** - Create admin panel
5. 📱 **Test Mobile** - Check responsive design
6. 🔐 **Setup User Roles** - Different user permissions
7. ☁️ **Deploy** - Deploy to production

---

## Troubleshooting Checklist

Before asking for help, verify:

- [ ] Node.js installed: `node -v`
- [ ] npm installed: `npm -v`
- [ ] MongoDB running: `mongosh`
- [ ] .env file exists and configured
- [ ] Backend running: `npm start`
- [ ] Frontend running: `python -m http.server 8000`
- [ ] Can access http://localhost:8000
- [ ] Browser console (F12) shows no errors
- [ ] Backend console shows "MongoDB connected"

---

## Useful Commands

```bash
# Start backend
npm start

# Start backend with auto-reload
npm run dev

# Start frontend
cd frontend && python -m http.server 8000

# Install dependencies
npm install

# View backend logs in real-time
npm start

# Connect to MongoDB
mongosh

# Create article (replace TOKEN)
curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"...", "content":"...", "category":"...", "status":"published"}'
```

---

## Quick Reference

**Three Terminals Need to Run:**

1. **Backend**: `npm start` (port 5000)
2. **Frontend**: `python -m http.server 8000` (port 8000)
3. **MongoDB**: Running (port 27017)

**Then visit:** http://localhost:8000 ✅

---

**🎉 Your breaking news website is now running!**

Need help? Check:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation help
- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Database help
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [README.md](README.md) - Project info