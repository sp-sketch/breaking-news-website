# 🗄️ Database Setup Guide

## MongoDB Overview

MongoDB is a NoSQL database that stores data in JSON-like documents. Perfect for your breaking news website!

**Why MongoDB?**
- ✅ Flexible schema (great for articles with varying fields)
- ✅ Easy to scale
- ✅ Great with Node.js and Express
- ✅ Free cloud hosting option (MongoDB Atlas)

---

## Option 1: Local MongoDB Setup

### macOS (Using Homebrew - Easiest)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Tap MongoDB brew repository
brew tap mongodb/brew

# Install MongoDB
brew install mongodb-community

# Start MongoDB as a service
brew services start mongodb-community

# Verify it's running
brew services list
# You should see: mongodb-community started
```

**Stop MongoDB when you're done developing:**
```bash
brew services stop mongodb-community
```

### Windows

1. **Download MongoDB Community Edition:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select Windows
   - Download the MSI installer

2. **Run the Installer:**
   - Double-click the downloaded MSI file
   - Click "Next" through the wizard
   - **Important:** Check "Install MongoDB as a Windows Service"
   - Click "Install"

3. **Verify Installation:**
   - MongoDB will start automatically
   - Search for "Services" in Windows
   - Look for "MongoDB" service (should show "Running")

### Linux (Ubuntu/Debian)

```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod

# Enable it to start on boot
sudo systemctl enable mongod

# Verify it's running
sudo systemctl status mongod
```

**Stop MongoDB:**
```bash
sudo systemctl stop mongod
```

---

## Option 2: MongoDB Atlas (Cloud Database - Recommended)

### Benefits:
✅ No installation needed  
✅ Automatic backups  
✅ Free tier available  
✅ Accessible from anywhere  
✅ Built-in monitoring  

### Step-by-Step Setup

#### 1. Create Account

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account with email or Google

#### 2. Create a Project

1. Click "Create New Project"
2. Project name: "Breaking News"
3. Click "Create Project"

#### 3. Create a Cluster

1. Click "Build a Cluster"
2. Choose "Free" tier
3. Select region closest to you
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster to create

#### 4. Add Database User

1. Left sidebar → "Database Access"
2. Click "Add New Database User"
3. Enter:
   - Username: `admin`
   - Password: Generate a strong password (copy it!)
   - Database User Privileges: "Atlas admin"
4. Click "Add User"

#### 5. Whitelist IP Address

1. Left sidebar → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - In production, use specific IP
4. Click "Confirm"

#### 6. Get Connection String

1. Left sidebar → "Databases"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

**It looks like:**
```
mongodb+srv://admin:PASSWORD@cluster.mongodb.net/breaking-news?retryWrites=true&w=majority
```

5. Replace `PASSWORD` with your database user password

#### 7. Update .env File

```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/breaking-news?retryWrites=true&w=majority
```

---

## Testing MongoDB Connection

### Connect to MongoDB

```bash
# Local MongoDB
mongosh

# Should show: >
# (You're connected!)

# View databases
show databases

# Switch to breaking-news database
use breaking-news

# View collections
show collections

# Exit
exit
```

### View Data

```bash
# Connect
mongosh

# Switch database
use breaking-news

# View all articles
db.articles.find()

# View all users
db.users.find()

# View all categories
db.categories.find()

# Count articles
db.articles.countDocuments()

# Exit
exit
```

---

## Configure Your Backend

### 1. Edit .env File

```bash
# Open .env file
nano .env          # macOS/Linux
# OR
notepad .env       # Windows
```

### 2. Add MongoDB URI

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/breaking-news
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/breaking-news?retryWrites=true&w=majority
```

### 3. Save File

Press Ctrl+O, Enter, Ctrl+X (macOS/Linux)  
Or just save normally in Notepad (Windows)

---

## Complete .env Configuration

```env
# Server
PORT=5000
NODE_ENV=development

# Database (Choose one)
# Local:
MONGODB_URI=mongodb://localhost:27017/breaking-news

# OR Atlas (Cloud):
# MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/breaking-news?retryWrites=true&w=majority

# Security
JWT_SECRET=your-secret-key-change-this-to-random

# Frontend
CORS_ORIGIN=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10485760
```

**Generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Test Backend Connection

### Start Backend

```bash
npm start
```

**Expected output:**
```
Server running on port 5000
MongoDB connected
```

If you see "MongoDB connected", you're good! ✅

### If Connection Fails

**Error: "connect ECONNREFUSED"**
- MongoDB is not running
- Check if service is running:
  - macOS: `brew services list`
  - Windows: Check Services app
  - Linux: `sudo systemctl status mongod`

**Error: "authentication failed"**
- Wrong username/password in connection string
- Double-check `.env` file
- For Atlas, verify user credentials in Database Access

**Error: "getaddrinfo ENOTFOUND"**
- Wrong connection string
- Check copy/paste is correct
- Verify IP whitelist on Atlas

---

## Database Structure

Your application uses 3 collections:

### 1. Users
```json
{
  "_id": ObjectId,
  "email": "admin@example.com",
  "password": "hashed_password",
  "name": "Admin User",
  "role": "admin",
  "isActive": true,
  "createdAt": Date
}
```

### 2. Articles
```json
{
  "_id": ObjectId,
  "title": "Breaking News Title",
  "content": "Full article content...",
  "excerpt": "Short summary...",
  "category": "Politics",
  "featuredImage": "/uploads/image.jpg",
  "images": [
    {
      "url": "/uploads/img1.jpg",
      "caption": "Image description"
    }
  ],
  "author": ObjectId,
  "views": 150,
  "likes": 25,
  "status": "published",
  "comments": [
    {
      "name": "John",
      "email": "john@example.com",
      "comment": "Great article!",
      "createdAt": Date
    }
  ],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 3. Categories
```json
{
  "_id": ObjectId,
  "name": "Politics",
  "slug": "politics",
  "description": "Political news",
  "color": "#FF0000",
  "createdAt": Date
}
```

---

## Database Commands Reference

```bash
# Connect to MongoDB
mongosh

# Switch database
use breaking-news

# View collections
show collections

# View all documents in a collection
db.articles.find()
db.users.find()
db.categories.find()

# View first 5 documents
db.articles.find().limit(5)

# Count documents
db.articles.countDocuments()

# Find by specific field
db.articles.find({ status: "published" })

# Delete a document
db.articles.deleteOne({ _id: ObjectId("...") })

# Delete all documents (careful!)
db.articles.deleteMany({})

# Drop entire collection
db.articles.drop()

# Exit MongoDB
exit
```

---

## Backup & Restore

### Backup Local MongoDB

```bash
# Create backup directory
mkdir backups

# Backup database
mongodump --db breaking-news --out ./backups/

# Check backup
ls -la backups/breaking-news/
```

### Restore Local MongoDB

```bash
# Restore from backup
mongorestore ./backups/
```

### MongoDB Atlas Backups

Atlas automatically creates daily backups for free tier (7 days retention).

To restore:
1. Go to MongoDB Atlas
2. Click "Backups" on your cluster
3. Click "Restore" next to a backup
4. Choose "Automated Restore"

---

## Performance Tips

1. **Create indexes** for frequently searched fields
2. **Enable compression** in connection string
3. **Use connection pooling** (automatically handled by Mongoose)
4. **Monitor your database** (Atlas has built-in monitoring)
5. **Regular backups** (Atlas does this automatically)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Connection refused | Check if MongoDB is running |
| Authentication failed | Verify username/password |
| Database not found | Create database first or use Atlas |
| Slow queries | Add database indexes |
| Out of storage (local) | Check available disk space |

---

## Next Steps

1. ✅ Choose Local MongoDB or Atlas
2. ✅ Complete installation/setup
3. ✅ Test connection with mongosh
4. ✅ Update .env file
5. ✅ Start backend: `npm start`
6. ⬜ Create sample data
7. ⬜ Create admin account
8. ⬜ Start frontend

---

## Useful MongoDB Resources

- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI tool)

---

**🎉 Ready to connect your database! What's next?**