# 🚀 Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- XAMPP installed and running
- Ollama installed locally

## 1. Database Setup
1. Open XAMPP Control Panel
2. Start Apache and MySQL
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Import `database.sql` file
5. Database `student_portal` will be created with admin user

## 2. Install Dependencies
```bash
npm install
```

## 3. Environment Setup
Create `.env.local` file in project root:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_portal
GEMINI_API_KEY=your_gemini_api_key_here
```

## 4. Start Ollama
```bash
ollama serve
```

## 5. Pull AI Models
```bash
ollama pull qwen2.5-coder:1.5b
ollama pull llama3:latest
```

## 6. Run Application
```bash
npm run dev
```

## 7. Login
- Go to http://localhost:3001
- Email: admin@gmail.com
- Password: 1234

## 🎯 Test Features
1. **Speech Assistant**: Click mic button and speak
2. **Document Analysis**: Upload a PDF/DOCX file
3. **YouTube Summarizer**: Paste a YouTube URL
4. **Task Management**: Add and complete tasks

## 🐛 Troubleshooting
- **Ollama not responding**: Run `ollama serve`
- **Database error**: Check XAMPP MySQL is running
- **Speech not working**: Use Chrome/Edge browser 