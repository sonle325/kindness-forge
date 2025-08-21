import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Gavel, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AuctionSection = () => {
  const auctions = [
    {
      id: 1,
      title: "Dạy lập trình React cho người mới",
      description: "4 buổi học private về React cơ bản, phù hợp cho người mới bắt đầu.",
      provider: {
        name: "Nguyễn Minh Tuấn",
        avatar: "/placeholder.svg",
        rating: 4.9,
        reviews: 127
      },
      currentBid: 2500000,
      timeLeft: "2 ngày 14 giờ",
      totalBids: 23,
      category: "Lập trình",
      featured: true
    },
    {
      id: 2,
      title: "Thiết kế logo chuyên nghiệp",
      description: "Thiết kế logo hoàn chỉnh bao gồm 3 concept, file vector và hướng dẫn sử dụng.",
      provider: {
        name: "Lê Thị Hoa",
        avatar: "/placeholder.svg",
        rating: 4.8,
        reviews: 89
      },
      currentBid: 1800000,
      timeLeft: "1 ngày 8 giờ",
      totalBids: 18,
      category: "Thiết kế",
      featured: false
    },
    {
      id: 3,
      title: "Tư vấn khởi nghiệp 1-1",
      description: "2 buổi tư vấn trực tiếp về kế hoạch kinh doanh và chiến lược phát triển.",
      provider: {
        name: "Trần Văn Nam",
        avatar: "/placeholder.svg",
        rating: 5.0,
        reviews: 45
      },
      currentBid: 3200000,
      timeLeft: "5 ngày 2 giờ",
      totalBids: 31,
      category: "Kinh doanh",
      featured: true
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <section id="auction" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Đấu giá kĩ năng từ thiện
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Đấu giá để nhận được sự hỗ trợ từ các chuyên gia. 
            100% số tiền đấu giá sẽ được chuyển cho hoạt động từ thiện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {auctions.map((auction) => (
            <Card key={auction.id} className={`overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group ${auction.featured ? 'ring-2 ring-primary/50' : ''}`}>
              {auction.featured && (
                <div className="bg-gradient-hero text-white text-center py-2 text-sm font-medium">
                  <Star className="h-4 w-4 inline mr-1" />
                  Nổi bật
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {auction.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {auction.timeLeft}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{auction.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {auction.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Provider Info */}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={auction.provider.avatar} />
                    <AvatarFallback>{auction.provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{auction.provider.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {auction.provider.rating} ({auction.provider.reviews} đánh giá)
                    </div>
                  </div>
                </div>

                {/* Current Bid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Giá hiện tại:</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-bold text-lg text-primary">
                        {formatPrice(auction.currentBid)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      <Gavel className="h-4 w-4 inline mr-1" />
                      {auction.totalBids} lượt đấu giá
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link to="/auction" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Xem chi tiết
                    </Button>
                  </Link>
                  <Link to="/auction" className="flex-1">
                    <Button className="w-full">
                      <Gavel className="h-4 w-4 mr-2" />
                      Đấu giá
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/auction">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Xem tất cả đấu giá
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuctionSection;