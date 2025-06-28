"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Calendar, 
  Plus, 
  Youtube, 
  FileText, 
  Camera, 
  LogOut,
  Clock,
  BookOpen,
  Brain,
  Upload,
  Search,
  X,
  Check,
  Mic
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Mathematics Assignment", time: "10:00 AM", completed: false },
    { id: 2, title: "Physics Lab Report", time: "2:00 PM", completed: true },
    { id: 3, title: "English Literature Reading", time: "4:00 PM", completed: false },
  ]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [documentQuestion, setDocumentQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  
  // Speech states
  const [speechQuestion, setSpeechQuestion] = useState("");
  const [speechResponse, setSpeechResponse] = useState("");
  
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if no user data
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setShowAddTask(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleYoutubeSubmit = async () => {
    if (!youtubeUrl) return;
    
    setIsProcessing(true);
    setSummary("");
    
    try {
      const response = await fetch('/api/ai/youtube-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data.summary);
      } else {
        setSummary(`Error: ${data.message}`);
      }
    } catch (error) {
      setSummary("Error: Failed to generate summary. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileAnalysis = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setSummary("");
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      if (documentQuestion.trim()) {
        formData.append('question', documentQuestion);
      }

      const response = await fetch('/api/ai/document-analysis', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSummary(data.analysis);
      } else {
        setSummary(`Error: ${data.message}`);
      }
    } catch (error) {
      setSummary("Error: Failed to analyze document. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Speech handler
  const handleSpeechSubmit = async () => {
    if (!speechQuestion.trim()) return;
    
    setIsProcessing(true);
    setSpeechResponse("");
    
    try {
      const formData = new FormData();
      formData.append('audio', new Blob()); // Placeholder for audio
      formData.append('question', speechQuestion);

      const response = await fetch('/api/ai/speech', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSpeechResponse(data.response);
      } else {
        setSpeechResponse(`Error: ${data.message}`);
      }
    } catch (error) {
      setSpeechResponse("Error: Failed to process speech. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // If no user data, show loading
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Student Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors relative group">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="profile-upload"
                  />
                  <div className="flex flex-col items-center">
                    <User className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                    <p className="text-xs text-blue-600 mt-1 font-medium">Upload Photo</p>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.student_id}</p>
                <p className="text-sm text-gray-500">{user.department}</p>
                <p className="text-sm text-gray-500">{user.year}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span>Today: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Greeting */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Hi {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                Welcome back to your learning dashboard. Here's what's on your schedule today.
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "schedule"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Today's Schedule
                  </button>
                  <button
                    onClick={() => setActiveTab("youtube")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "youtube"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Youtube className="w-5 h-5 inline mr-2" />
                    YouTube Summarizer
                  </button>
                  <button
                    onClick={() => setActiveTab("document")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "document"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <FileText className="w-5 h-5 inline mr-2" />
                    Document Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab("lens")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "lens"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Mic className="w-5 h-5 inline mr-2" />
                    Speech Assistant
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Schedule Tab */}
                {activeTab === "schedule" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
                      <button
                        onClick={() => setShowAddTask(true)}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Task
                      </button>
                    </div>

                    {showAddTask && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder="Enter new task..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                          />
                          <button
                            onClick={addTask}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowAddTask(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center p-4 border rounded-lg ${
                            task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                          }`}
                        >
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                              task.completed
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-gray-300 hover:border-green-500'
                            }`}
                          >
                            {task.completed && <Check className="w-3 h-3" />}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium ${
                              task.completed ? 'text-green-800 line-through' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {task.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* YouTube Summarizer Tab */}
                {activeTab === "youtube" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">YouTube Video Summarizer</h3>
                    <p className="text-gray-600 mb-6">
                      Paste a YouTube URL and get an AI-powered summary of the video content.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          YouTube URL
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          />
                          <button 
                            onClick={handleYoutubeSubmit}
                            disabled={!youtubeUrl || isProcessing}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            {isProcessing ? (
                              <>
                                <Brain className="w-4 h-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Youtube className="w-4 h-4 mr-2" />
                                Summarize
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {summary && (
                        <div className="mt-6 p-4 rounded-lg">
                          {summary.startsWith('Error:') ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <h4 className="font-semibold text-red-900 mb-2">⚠️ Setup Required</h4>
                              <p className="text-red-700 mb-3">{summary}</p>
                              <div className="bg-white p-3 rounded border border-red-200">
                                <p className="text-sm text-red-800 font-medium mb-2">To fix this:</p>
                                <ol className="text-sm text-red-700 space-y-1 list-decimal list-inside">
                                  <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                                  <li>Select your project or create a new one</li>
                                  <li>Enable the "YouTube Data API v3"</li>
                                  <li>Make sure your API key has access to this API</li>
                                  <li>Wait a few minutes for changes to take effect</li>
                                </ol>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                              <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Document Analysis Tab */}
                {activeTab === "document" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Analysis</h3>
                    <p className="text-gray-600 mb-6">
                      Upload a PDF, PPT, or Word document and get AI-powered insights and answers to your questions.
                    </p>
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                      <strong>Note:</strong> Ollama needs to be installed locally for this feature to work.<br />
                      I used Ollama so students can interact with AI even without an internet connection.
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Upload Document
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <input
                            type="file"
                            accept=".pdf,.ppt,.pptx,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Choose File
                          </label>
                          <p className="text-sm text-gray-500 mt-2">
                            Supports PDF, PPT, PPTX, DOC, DOCX files
                          </p>
                        </div>
                        {uploadedFile && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-green-800">
                              <FileText className="w-4 h-4 inline mr-2" />
                              {uploadedFile.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {uploadedFile && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ask a Question (Optional)
                          </label>
                          <textarea
                            value={documentQuestion}
                            onChange={(e) => setDocumentQuestion(e.target.value)}
                            placeholder="e.g., What are the main topics covered? What are the key insights? Summarize the document..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            rows="3"
                          />
                        </div>
                      )}

                      {uploadedFile && (
                        <button
                          onClick={handleFileAnalysis}
                          disabled={isProcessing}
                          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isProcessing ? (
                            <>
                              <Brain className="w-4 h-4 mr-2 animate-spin" />
                              Analyzing Document...
                            </>
                          ) : (
                            <>
                              <Search className="w-4 h-4 mr-2" />
                              Analyze Document
                            </>
                          )}
                        </button>
                      )}

                      {summary && (
                        <div className="mt-6 p-4 rounded-lg">
                          {summary.startsWith('Error:') ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <h4 className="font-semibold text-red-900 mb-2">⚠️ Analysis Failed</h4>
                              <p className="text-red-700">{summary}</p>
                            </div>
                          ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Analysis Results</h4>
                              <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Speech Assistant Tab */}
                {activeTab === "lens" && (
                  <div className="flex flex-col items-center justify-center min-h-[300px]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Speech Assistant</h3>
                    <p className="text-gray-600 mb-6">Click the mic and talk to your AI tutor!</p>
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 text-center">
                      <strong>Note:</strong> Ollama needs to be installed locally for this feature to work.<br />
                      I used Ollama so students can interact with the AI tutor using voice, even without an internet connection.
                    </div>
                    <button
                      onClick={async () => {
                        setSpeechResponse("");
                        setSpeechQuestion("");
                        setIsProcessing(true);
                        // Web Speech API for speech-to-text
                        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                        recognition.lang = 'en-US';
                        recognition.start();
                        recognition.onresult = async (event) => {
                          const transcript = event.results[0][0].transcript;
                          setSpeechQuestion(transcript);
                          // Send to Ollama
                          const formData = new FormData();
                          formData.append('audio', new Blob()); // Placeholder
                          formData.append('question', transcript);
                          const response = await fetch('/api/ai/speech', {
                            method: 'POST',
                            body: formData,
                          });
                          const data = await response.json();
                          if (data.success) {
                            setSpeechResponse(data.response);
                            // Speak the response
                            const synth = window.speechSynthesis;
                            const utter = new SpeechSynthesisUtterance(data.response);
                            synth.speak(utter);
                          } else {
                            setSpeechResponse(`Error: ${data.message}`);
                          }
                          setIsProcessing(false);
                        };
                        recognition.onerror = (event) => {
                          setSpeechResponse('Speech recognition error: ' + event.error);
                          setIsProcessing(false);
                        };
                      }}
                      disabled={isProcessing}
                      className={`rounded-full bg-blue-600 text-white p-8 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ fontSize: 48 }}
                    >
                      <Mic className="w-16 h-16" />
                    </button>
                    <div className="mt-6 w-full max-w-xl">
                      {isProcessing && (
                        <div className="flex items-center justify-center text-blue-600">
                          <Brain className="w-6 h-6 mr-2 animate-spin" /> Listening...
                        </div>
                      )}
                      {speechQuestion && (
                        <div className="mt-4 text-center text-gray-700">
                          <span className="font-semibold">You:</span> {speechQuestion}
                        </div>
                      )}
                      {speechResponse && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <span className="font-semibold text-gray-900">Ollama:</span> {speechResponse}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
