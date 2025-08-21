import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Search, Users, Trophy, Gavel, Heart, Eye } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

// Mock auction data
const auctionData = [
  {
    id: "1",
    title: "Bức tranh sơn dầu của họa sĩ Nguyễn Văn A",
    description: "Tác phẩm sơn dầu độc đáo mô tả cảnh làng quê Việt Nam, được tạo ra năm 2020",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    currentBid: 5000000,
    startingBid: 2000000,
    bidders: 15,
    endTime: "2024-02-15T18:00:00",
    category: "Nghệ thuật",
    status: "active",
    beneficiary: "Quỹ hỗ trợ nghệ sĩ trẻ",
    seller: "Họa sĩ Nguyễn Văn A",
    views: 234
  },
  {
    id: "2", 
    title: "Khóa học lập trình React 6 tháng",
    description: "Khóa học lập trình React từ cơ bản đến nâng cao với mentor 1-1",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400",
    currentBid: 8500000,
    startingBid: 3000000,
    bidders: 28,
    endTime: "2024-02-20T20:00:00",
    category: "Giáo dục",
    status: "active",
    beneficiary: "Chương trình đào tạo miễn phí",
    seller: "Trung tâm FPT",
    views: 456
  },
  {
    id: "3",
    title: "Buổi workshop nấu ăn với Chef Michelin",
    description: "Trải nghiệm nấu ăn cùng chef đạt sao Michelin trong 4 giờ",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    currentBid: 12000000,
    startingBid: 5000000,
    bidders: 42,
    endTime: "2024-02-10T15:30:00",
    category: "Trải nghiệm",
    status: "ending_soon",
    beneficiary: "Quỹ nâng cao ẩm thực Việt",
    seller: "Chef Restaurant Group",
    views: 789
  },
  {
    id: "4",
    title: "Phiên tư vấn 1-1 với CEO startup unicorn",
    description: "1 giờ tư vấn trực tiếp về khởi nghiệp và phát triển business",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    currentBid: 15000000,
    startingBid: 8000000,
    bidders: 35,
    endTime: "2024-02-25T14:00:00",
    category: "Tư vấn",
    status: "active",
    beneficiary: "Quỹ hỗ trợ startup",
    seller: "CEO Nguyễn Thành Công",
    views: 567
  },
  {
    id: "5",
    title: "Bộ sách hiếm về lịch sử Việt Nam",
    description: "Bộ sách gồm 10 cuốn về lịch sử Việt Nam, xuất bản năm 1960",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    currentBid: 3200000,
    startingBid: 1000000,
    bidders: 18,
    endTime: "2024-02-12T12:00:00",
    category: "Sách",
    status: "ended",
    beneficiary: "Thư viện cộng đồng",
    seller: "Nhà sưu tầm Trần Văn B",
    views: 345
  },
  {
    id: "6",
    title: "Tour du lịch 3N2Đ Sapa dành cho 4 người",
    description: "Gói tour trọn gói bao gồm xe, khách sạn, bữa ăn và hướng dẫn viên",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400",
    currentBid: 6800000,
    startingBid: 4000000,
    bidders: 22,
    endTime: "2024-02-18T10:00:00",
    category: "Du lịch",
    status: "active",
    beneficiary: "Quỹ phát triển du lịch bền vững",
    seller: "Công ty du lịch ABC",
    views: 432
  }
];

const AuctionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const categories = ["all", "Nghệ thuật", "Giáo dục", "Trải nghiệm", "Tư vấn", "Sách", "Du lịch"];
  const statuses = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Đang đấu giá" },
    { value: "ending_soon", label: "Sắp kết thúc" },
    { value: "ended", label: "Đã kết thúc" }
  ];

  const filteredAuctions = auctionData.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || auction.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || auction.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) return "Đã kết thúc";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} ngày ${hours} giờ`;
    if (hours > 0) return `${hours} giờ ${minutes} phút`;
    return `${minutes} phút`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Đang đấu giá</Badge>;
      case "ending_soon":
        return <Badge className="bg-orange-500">Sắp kết thúc</Badge>;
      case "ended":
        return <Badge variant="secondary">Đã kết thúc</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Đấu giá từ thiện</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tham gia đấu giá các món đồ, trải nghiệm độc đáo để ủng hộ các hoạt động từ thiện ý nghĩa
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm đấu giá..."
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
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "Tất cả danh mục" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Trophy className="h-4 w-4" />
            Đấu giá nổi bật
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Gavel className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-muted-foreground">Phiên đấu giá</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Người tham gia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatCurrency(150000000)}</div>
              <div className="text-sm text-muted-foreground">Tổng giá trị</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{formatCurrency(75000000)}</div>
              <div className="text-sm text-muted-foreground">Đã quyên góp</div>
            </CardContent>
          </Card>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img 
                    src={auction.image} 
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    {getStatusBadge(auction.status)}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white/90">
                      {auction.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">{getTimeRemaining(auction.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{auction.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{auction.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Giá hiện tại</span>
                        <span className="text-sm text-muted-foreground">
                          Khởi điểm: {formatCurrency(auction.startingBid)}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {formatCurrency(auction.currentBid)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{auction.bidders} lượt đấu giá</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <strong>Người bán:</strong> {auction.seller}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <strong>Hỗ trợ:</strong> {auction.beneficiary}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Link to={`/auction/${auction.id}`} className="block">
                      <Button className="w-full" disabled={auction.status === "ended"}>
                        {auction.status === "ended" ? "Đã kết thúc" : "Xem chi tiết & Đấu giá"}
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-1" />
                        Yêu thích
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Chia sẻ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Gavel className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Không tìm thấy đấu giá nào</h3>
            <p className="text-muted-foreground">Thử thay đổi bộ lọc để xem thêm kết quả</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AuctionPage;