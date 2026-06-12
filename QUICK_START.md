# 📖 Quick Start Guide

## One-Line Setup

**macOS/Linux:**
```bash
git clone https://github.com/sp-sketch/breaking-news-website.git && cd breaking-news-website && chmod +x setup.sh && ./setup.sh
```

**Windows:**
```bash
git clone https://github.com/sp-sketch/breaking-news-website.git && cd breaking-news-website && setup.bat
```

## 5-Minute Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/sp-sketch/breaking-news-website.git
cd breaking-news-website
```

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

### 2. Configure Environment
Edit `.env` file and add MongoDB URI:
```env
MONGODB_URI=mongodb://localhost:27017/breaking-news
JWT_SECRET=your-secret-key
```

### 3. Start Backend (Terminal 1)
```bash
npm start
# Visit: http://localhost:5000/health
```

### 4. Start Frontend (Terminal 2)
```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

## API Endpoints

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create article (needs auth)
- `PUT /api/articles/:id` - Update article (needs auth)
- `DELETE /api/articles/:id` - Delete article (needs auth)
- `GET /api/articles/search?q=...` - Search articles

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (needs auth)

## Commands Reference

```bash
# Start backend
npm start

# Start backend with auto-reload
npm run dev

# Install dependencies
npm install

# Start frontend
cd frontend
python -m http.server 8000
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Module not found" | `npm install` |
| "MongoDB connection error" | Start MongoDB, check MONGODB_URI |
| "Port 5000 in use" | Change PORT in .env |
| "CORS error" | Check backend is running on 5000 |
| "No articles loading" | Check API_BASE_URL in frontend/js/api.js |

## Directory Structure

```
breaking-news-website/
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── middleware/
├── uploads/
├── .env
├── package.json
├── setup.sh
└── setup.bat
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/breaking-news
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
MAX_FILE_SIZE=10485760
```

## Next: Create Sample Data

### Register Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456"}'
```

### Create Article
```bash
curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Breaking News",
    "content":"Article content here",
    "category":"Politics",
    "status":"published"
  }'
```

## Full Setup Guide

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

**🎉 Your breaking news website is ready!**