import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Heart, HelpCircle, MessageCircle, Sparkles } from "lucide-react";

const AiChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Xin chào! Tôi là AI assistant của Kindness Forge. Tôi có thể giúp bạn tìm hiểu về các chiến dịch từ thiện, thách thức và cách thức tham gia hiệu quả nhất. Bạn cần hỗ trợ gì hôm nay?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const suggestedQuestions = [
    "Làm thế nào để tạo một chiến dịch từ thiện?",
    "Có những thách thức nào phù hợp với tôi?",
    "Cách đấu giá kĩ năng hiệu quả?",
    "Làm sao để quyên góp an toàn?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot",
        content: "Cảm ơn bạn đã đặt câu hỏi! Đây là một tính năng demo. Trong phiên bản thực tế, tôi sẽ cung cấp thông tin chi tiết về các hoạt động từ thiện phù hợp với nhu cầu của bạn.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => window.history.back()}>
              ← Quay lại
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-hero rounded-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Hỗ trợ từ thiện thông minh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with suggestions */}
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Gợi ý câu hỏi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full text-left justify-start h-auto p-3 text-sm"
                      onClick={() => handleQuestionClick(question)}
                    >
                      <HelpCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      {question}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-card mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-primary" />
                    Thống kê
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Câu hỏi đã trả lời:</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Người dùng hài lòng:</span>
                    <span className="font-semibold text-primary">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Chiến dịch được gợi ý:</span>
                    <span className="font-semibold">3,891</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="shadow-card h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Trò chuyện với AI
                  </CardTitle>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "bot" 
                            ? "bg-gradient-hero text-white" 
                            : "bg-primary text-primary-foreground"
                        }`}>
                          {message.type === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </div>
                        <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                          message.type === "bot"
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString('vi-VN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nhập câu hỏi của bạn..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} className="px-3">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;