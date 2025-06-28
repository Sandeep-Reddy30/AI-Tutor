# 🎓 Student Portal - AI-Powered Learning Platform

A modern, AI-enhanced student portal built with Next.js that integrates local Ollama AI for intelligent learning assistance.

## 🔑 Quick Login
**Default Admin Credentials:**
- **Email:** admin@gmail.com
- **Password:** 1234

---

## 🚀 Features

### 📅 **Smart Schedule Management**
- Daily task tracking with completion status
- Add, edit, and mark tasks as complete
- Real-time updates and notifications

### 🎥 **YouTube Video Summarizer**
- Paste YouTube URLs and get AI-powered summaries
- Extracts key points and insights from educational videos
- Powered by Gemini AI for intelligent content analysis

### 📄 **Document Analysis with Ollama**
- Upload PDFs, Word documents, PowerPoint presentations
- Ask questions about your documents
- Get comprehensive AI analysis and insights
- **Powered by local Ollama AI** - No API costs or rate limits!

### 🎤 **Voice Assistant with Ollama**
- **Click the mic and talk to your AI tutor!**
- Real-time speech-to-text using Web Speech API
- Ollama responds with voice synthesis
- Perfect for hands-free learning and quick questions

---

## 🤖 Why Ollama?

### **Local AI Processing**
- **No API costs** - Runs completely on your local machine
- **No rate limits** - Use as much as you want
- **Privacy first** - Your data never leaves your computer
- **Offline capability** - Works without internet connection

### **Multiple AI Models**
- **qwen2.5-coder:1.5b** - Fast, lightweight model for quick responses
- **llama3:latest** - High-quality responses for complex questions
- **deepseek-r1:latest** - Specialized for coding and technical content

### **Easy Setup**
- Install Ollama once, use it everywhere
- Automatic model management
- Simple API integration

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Modern, utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Web Speech API** - Browser-based speech recognition

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MySQL (XAMPP)** - Database for user management
- **bcryptjs** - Password hashing and security
- **mammoth** - Document parsing for Word files

### **AI Integration**
- **Ollama** - Local AI model hosting
- **Google Gemini** - YouTube video analysis
- **Web Speech API** - Voice input/output

---

## 📋 Requirements

### **System Requirements**
- Node.js 18+ 
- MySQL 8.0+ (via XAMPP)
- Ollama installed locally
- Modern web browser with speech support

### **Dependencies**
```
Next.js 15.3.4
React 18
Tailwind CSS
Lucide React
bcryptjs
mammoth
pdf-parse
```

### **Ollama Models Required**
```bash
ollama pull qwen2.5-coder:1.5b
ollama pull llama3:latest
ollama pull deepseek-r1:latest
```

---

## 🚀 Installation & Setup

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd student-portal
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Database**
- Start XAMPP and MySQL service
- Create database: `student_portal`
- Import the provided SQL schema

### **4. Configure Environment**
Create `.env.local` file:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=student_portal

# AI API Keys (Optional - for YouTube features)
GEMINI_API_KEY=your_gemini_api_key_here
```

### **5. Install Ollama**
```bash
# Windows
winget install Ollama.Ollama

# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh
```

### **6. Start Ollama Service**
```bash
ollama serve
```

### **7. Pull Required Models**
```bash
ollama pull qwen2.5-coder:1.5b
ollama pull llama3:latest
```

### **8. Run the Application**
```bash
npm run dev
```

Visit `http://localhost:3001` and login with the default credentials!

---

## 🎯 Usage Guide

### **Getting Started**
1. Login with admin@gmail.com / 1234
2. Explore the dashboard tabs
3. Try the Speech Assistant by clicking the mic button
4. Upload documents for AI analysis
5. Summarize YouTube videos

### **Speech Assistant**
- Click the large mic button
- Speak your question clearly
- Wait for Ollama's response
- The response will be spoken back to you

### **Document Analysis**
- Upload PDF, DOCX, or TXT files
- Ask specific questions about the content
- Get detailed AI-powered insights

### **YouTube Summarizer**
- Paste any YouTube URL
- Get instant AI-generated summaries
- Perfect for educational content

---

## 📁 Project Structure

```
student-portal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/
│   │   │   │   ├── document-analysis/    # Ollama document processing
│   │   │   │   ├── speech/              # Voice assistant API
│   │   │   │   └── youtube-summary/     # Video summarization
│   │   │   └── auth/                    # Login/signup endpoints
│   │   ├── home/                        # Main dashboard
│   │   └── page.js                      # Login page
│   ├── lib/
│   │   └── db.js                        # Database connection
│   └── utils/                           # Helper functions
├── public/                              # Static assets
└── package.json
```

---

## 🔧 Configuration

### **Ollama Settings**
- **Default Model:** qwen2.5-coder:1.5b (fastest)
- **Alternative Models:** llama3:latest, deepseek-r1:latest
- **API Endpoint:** http://localhost:11434

### **Speech Recognition**
- **Language:** English (en-US)
- **Browser Support:** Chrome, Edge, Safari
- **Fallback:** Text input available

---

## 🐛 Troubleshooting

### **Common Issues**

**Ollama Connection Error**
```bash
# Check if Ollama is running
ollama list

# Restart Ollama service
ollama serve
```

**Speech Recognition Not Working**
- Ensure you're using a supported browser
- Check microphone permissions
- Try refreshing the page

**Database Connection Issues**
- Verify XAMPP MySQL is running
- Check database credentials in .env.local
- Ensure database exists

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Ollama** for providing local AI capabilities
- **Next.js** for the amazing React framework
- **Tailwind CSS** for the beautiful styling
- **Web Speech API** for voice features

---

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Ollama documentation
- Open an issue on GitHub

---

**Made with ❤️ for students and AI enthusiasts**
