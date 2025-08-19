import { Heart, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Kindness Forge</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Nền tảng từ thiện hiện đại, kết nối cộng đồng để tạo ra những tác động tích cực và bền vững cho xã hội.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#campaigns" className="text-background/80 hover:text-primary transition-colors">Chiến dịch từ thiện</a></li>
              <li><a href="#challenges" className="text-background/80 hover:text-primary transition-colors">Thách thức</a></li>
              <li><a href="#auction" className="text-background/80 hover:text-primary transition-colors">Đấu giá kĩ năng</a></li>
              <li><a href="#ai-chat" className="text-background/80 hover:text-primary transition-colors">AI Chat</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-background/80 hover:text-primary transition-colors">Điều khoản sử dụng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">contact@kindnessforge.vn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-background/80">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 Kindness Forge. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-background/60 text-sm mt-2 md:mt-0">
            Được xây dựng với ❤️ cho cộng đồng Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;