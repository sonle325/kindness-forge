import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search, Filter, MapPin, Users, Clock } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

const campaignsData = [
  {
    id: "1",
    title: "Xây dựng trường học cho trẻ em vùng cao",
    description: "Hỗ trợ xây dựng ngôi trường mới cho các em nhỏ ở vùng núi cao, nơi điều kiện học tập còn khó khăn.",
    image: "/src/assets/campaign-school.jpg",
    raised: 450000000,
    goal: 800000000,
    supporters: 1247,
    endDate: "2024-12-31",
    location: "Điện Biên",
    category: "Giáo dục"
  },
  {
    id: "2",
    title: "Cứu trợ khẩn cấp vùng lũ lụt",
    description: "Hỗ trợ người dân vùng lũ với nhu yếu phẩm thiết yếu, thuốc men và nơi ở tạm thời.",
    image: "/src/assets/campaign-flood.jpg",
    raised: 1200000000,
    goal: 1500000000,
    supporters: 2156,
    endDate: "2024-03-31",
    location: "Miền Trung",
    category: "Cứu trợ"
  },
  {
    id: "3",
    title: "Chăm sóc người cao tuổi neo đơn",
    description: "Chương trình chăm sóc sức khỏe và tinh thần cho người cao tuổi không có gia đình.",
    image: "/src/assets/campaign-elderly.jpg",
    raised: 280000000,
    goal: 500000000,
    supporters: 856,
    endDate: "2024-06-30",
    location: "TP. HCM",
    category: "Chăm sóc xã hội"
  },
  {
    id: "4",
    title: "Hỗ trợ phẫu thuật tim cho trẻ em",
    description: "Gây quỹ cho các ca phẫu thuật tim bẩm sinh ở trẻ em nghèo.",
    image: "/src/assets/hero-charity.jpg",
    raised: 680000000,
    goal: 900000000,
    supporters: 1534,
    endDate: "2024-08-15",
    location: "Hà Nội",
    category: "Y tế"
  },
  {
    id: "5",
    title: "Cung cấp nước sạch cho vùng khô hạn",
    description: "Khoan giếng và lắp đặt hệ thống lọc nước cho các làng bản vùng khô hạn.",
    image: "/src/assets/hero-charity.jpg",
    raised: 320000000,
    goal: 600000000,
    supporters: 789,
    endDate: "2024-09-30",
    location: "Ninh Thuận",
    category: "Môi trường"
  },
  {
    id: "6",
    title: "Xây dựng nhà tình thương",
    description: "Xây dựng nhà ở cho các gia đình có hoàn cảnh khó khăn.",
    image: "/src/assets/hero-charity.jpg",
    raised: 1800000000,
    goal: 2000000000,
    supporters: 3421,
    endDate: "2024-11-20",
    location: "An Giang",
    category: "Nhà ở"
  }
];

const categories = ["Tất cả", "Giáo dục", "Y tế", "Cứu trợ", "Chăm sóc xã hội", "Môi trường", "Nhà ở"];

const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const filteredCampaigns = campaignsData
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Tất cả" || campaign.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "raised":
          return b.raised - a.raised;
        case "supporters":
          return b.supporters - a.supporters;
        case "ending":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default:
          return 0;
      }
    });

  const getDaysLeft = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Các chiến dịch từ thiện
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Tham gia ủng hộ các chiến dịch ý nghĩa và tạo nên sự thay đổi tích cực
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="shadow-card mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm chiến dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="raised">Số tiền quyên góp</SelectItem>
                  <SelectItem value="supporters">Số người ủng hộ</SelectItem>
                  <SelectItem value="ending">Sắp kết thúc</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc nâng cao
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Tìm thấy <span className="font-semibold">{filteredCampaigns.length}</span> chiến dịch
            {selectedCategory !== "Tất cả" && (
              <span> trong danh mục <span className="font-semibold">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => {
            const progressPercentage = (campaign.raised / campaign.goal) * 100;
            const daysLeft = getDaysLeft(campaign.endDate);
            
            return (
              <Link key={campaign.id} to={`/campaigns/${campaign.id}`}>
                <Card className="shadow-card h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{campaign.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {campaign.location}
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {campaign.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {campaign.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-primary">
                              {formatCurrency(campaign.raised)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {progressPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-1">
                            Mục tiêu: {formatCurrency(campaign.goal)}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{campaign.supporters.toLocaleString()} người ủng hộ</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{daysLeft > 0 ? `${daysLeft} ngày` : 'Đã kết thúc'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy chiến dịch</h3>
            <p className="text-muted-foreground">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CampaignsPage;