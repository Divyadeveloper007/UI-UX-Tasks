import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Message, AppointmentData } from '../types/chat';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: generateId(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greeting responses
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you with your doctor appointment today?";
    }

    // Appointment booking intent
    if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return "Sure! I'd be happy to help you book an appointment. Please provide your name, age, and preferred time.";
    }

    // Help or what can you do
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can help you book doctor appointments! Just tell me you want to book an appointment and I'll guide you through the process.";
    }

    // Parse appointment details
    const nameMatch = userMessage.match(/(?:name is|i'm|i am)\s+([a-zA-Z\s]+?)(?:,|$|\sand|\sage)/i);
    const ageMatch = userMessage.match(/(?:age is|age)\s+(\d+)/i);
    const timeMatch = userMessage.match(/(?:time|at|prefer)\s+([\d:]+\s*(?:am|pm)?|morning|afternoon|evening)/i);

    let hasNewInfo = false;
    const newAppointmentData = { ...appointmentData };

    if (nameMatch) {
      newAppointmentData.name = nameMatch[1].trim();
      hasNewInfo = true;
    }
    if (ageMatch) {
      newAppointmentData.age = ageMatch[1];
      hasNewInfo = true;
    }
    if (timeMatch) {
      newAppointmentData.time = timeMatch[1];
      hasNewInfo = true;
    }

    if (hasNewInfo) {
      setAppointmentData(newAppointmentData);

      // Check if we have all required information
      if (newAppointmentData.name && newAppointmentData.age && newAppointmentData.time) {
        return `Perfect! I have all the details:\n\n📋 **Appointment Summary:**\n👤 Name: ${newAppointmentData.name}\n🎂 Age: ${newAppointmentData.age}\n⏰ Time: ${newAppointmentData.time}\n\n✅ Your appointment has been successfully booked! You'll receive a confirmation shortly.`;
      } else {
        const missing = [];
        if (!newAppointmentData.name) missing.push('name');
        if (!newAppointmentData.age) missing.push('age');
        if (!newAppointmentData.time) missing.push('preferred time');
        
        return `Thank you! I still need your ${missing.join(' and ')} to complete the booking.`;
      }
    }

    // Default response
    return "I'm here to help you book doctor appointments. You can say 'I want to book an appointment' to get started, or ask me what I can do!";
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    addMessage(inputText, 'user');

    // Generate and add bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      addMessage(botResponse, 'bot');
    }, 500);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add welcome message when opening chat for the first time
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage("Hello! I'm MediBot, your virtual assistant. I'm here to help you book doctor appointments quickly and easily. How can I assist you today?", 'bot');
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div className={`
        absolute bottom-16 right-0 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
      `}>
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-semibold">MediBot</span>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-xs p-3 rounded-lg whitespace-pre-line
                ${message.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }
              `}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`
          bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 
          transform transition-all duration-300 ease-in-out hover:scale-110
          ${isOpen ? 'scale-90' : 'scale-100'}
        `}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      
      {/* Notification Badge */}
      {!isOpen && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          1
        </div>
      )}
    </div>
  );
};

export default Chatbot;