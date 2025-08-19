import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Target, Zap } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Tạo nên những
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              hành động tử tế
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
            Tham gia cộng đồng từ thiện hiện đại - Khởi tạo chiến dịch, hoàn thành thách thức 
            và đấu giá kĩ năng để tạo ra tác động tích cực
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              Tham gia ngay
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Khám phá thêm
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-white/80">Chiến dịch hoạt động</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">25,891</div>
              <div className="text-sm text-white/80">Người tham gia</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">892</div>
              <div className="text-sm text-white/80">Thách thức hoàn thành</div>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur border-white/20 p-6 text-center">
              <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-white/80">Kĩ năng đấu giá</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;