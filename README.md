# Breaking News Website

A modern, responsive web platform for publishing breaking news with rich media content, real-time updates, and professional news management.

## Features

- 📰 **Real-time News Publishing**: Publish breaking news instantly
- 🖼️ **Rich Media Support**: Upload and display images with articles
- 🏷️ **Category Management**: Organize news by categories
- 🔍 **Search Functionality**: Full-text search across articles
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🌓 **Dark Mode**: Optional dark theme for better readability
- 💬 **Comments System**: Readers can engage with articles
- 📊 **Admin Dashboard**: Manage articles, images, and categories

## Tech Stack

### Frontend
- HTML5
- CSS3 (Responsive Grid & Flexbox)
- Vanilla JavaScript (ES6+)
- GSAP for animations

### Backend
- Node.js
- Express.js
- MongoDB for database
- Multer for file uploads
- JWT for authentication

### Deployment
- Docker support
- Environment-based configuration

## Project Structure

```
breaking-news-website/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── app.js
│   │   ├── api.js
│   │   └── utils.js
│   └── images/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── articles.js
│   │   ├── categories.js
│   │   └── auth.js
│   ├── models/
│   │   ├── Article.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── uploads/
│   └── config/
│       └── db.js
├── docker-compose.yml
├── .env.example
└── package.json
```

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/sp-sketch/breaking-news-website.git
cd breaking-news-website
```

2. Install dependencies
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the application
```bash
npm start
```

## API Endpoints

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Create new article (admin)
- `PUT /api/articles/:id` - Update article (admin)
- `DELETE /api/articles/:id` - Delete article (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

## Usage

### Publishing a News Article

1. Navigate to the admin dashboard
2. Click "New Article"
3. Fill in the article details:
   - Title
   - Content
   - Category
   - Upload featured image
   - Add additional images
4. Click "Publish"

The article will appear on the homepage and be searchable.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and feature requests, please use the GitHub Issues section.