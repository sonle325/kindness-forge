import { Button } from "@/components/ui/button";
import { Heart, Users, Award, MessageCircle, QrCode } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kindness Forge
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#campaigns" className="text-foreground hover:text-primary transition-colors">
              Chiến dịch
            </a>
            <a href="#challenges" className="text-foreground hover:text-primary transition-colors">
              Thách thức
            </a>
            <a href="#auction" className="text-foreground hover:text-primary transition-colors">
              Đấu giá kĩ năng
            </a>
            <a href="#ai-chat" className="text-foreground hover:text-primary transition-colors">
              AI Chat
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline">Đăng nhập</Button>
            <Button variant="default">Đăng ký</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;