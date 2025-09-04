import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Users, Award, MessageCircle, QrCode, Plus, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Heart className="h-9 w-9 text-primary group-hover:text-primary/80 transition-colors" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Kindness Forge
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/campaigns" className="relative text-foreground hover:text-primary transition-colors group py-2">
              <span className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Chiến dịch</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            
            <a href="#challenges" className="relative text-foreground hover:text-primary transition-colors group py-2">
              <span className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Thách thức</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            
            <Link to="/auction" className="relative text-foreground hover:text-primary transition-colors group py-2">
              <span className="flex items-center space-x-2">
                <QrCode className="h-4 w-4" />
                <span>Đấu giá kĩ năng</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            
            <Link to="/ai-chat" className="relative text-foreground hover:text-primary transition-colors group py-2">
              <span className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>AI Chat</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 bg-primary/5 border-primary/20 hover:bg-primary/10">
                  <Plus className="h-4 w-4" />
                  <span>Tạo mới</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/create-campaign" className="flex items-center space-x-2 cursor-pointer">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Tạo chiến dịch</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create-challenge" className="flex items-center space-x-2 cursor-pointer">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Tạo thử thách</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create-auction" className="flex items-center space-x-2 cursor-pointer">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span>Tạo đấu giá</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-primary/10">Đăng nhập</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-primary hover:opacity-90 shadow-md">Đăng ký</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;