import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Trophy, 
  Gavel, 
  Heart, 
  Share2, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  MessageSquare
} from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

// Mock auction detail data
const auctionDetailData = {
  "1": {
    id: "1",
    title: "Bức tranh sơn dầu của họa sĩ Nguyễn Văn A",
    description: "Tác phẩm sơn dầu độc đáo mô tả cảnh làng quê Việt Nam, được tạo ra năm 2020",
    longDescription: "Bức tranh này được vẽ bằng kỹ thuật sơn dầu trên canvas kích thước 60x80cm. Tác phẩm mô tả một buổi chiều yên bình ở làng quê Việt Nam với những ngôi nhà cổ, đồng lúa vàng và con đường đất uốn khúc. Họa sĩ đã sử dụng màu sắc ấm áp để tạo nên cảm giác bình yên, gần gũi.\n\nĐây là một trong những tác phẩm tiêu biểu trong bộ sưu tập 'Hồn quê' của họa sĩ Nguyễn Văn A. Tác phẩm đã từng được trưng bày tại triển lãm 'Mỹ thuật Việt Nam đương đại' năm 2021 và nhận được nhiều lời khen ngợi từ giới chuyên môn.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
      "https://images.unsplash.com/photo-1582561357452-ba970a79d10e?w=800"
    ],
    currentBid: 5000000,
    startingBid: 2000000,
    bidders: 15,
    endTime: "2024-02-15T18:00:00",
    startTime: "2024-02-01T09:00:00",
    category: "Nghệ thuật",
    status: "active",
    beneficiary: "Quỹ hỗ trợ nghệ sĩ trẻ",
    seller: {
      name: "Họa sĩ Nguyễn Văn A",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      verified: true,
      rating: 4.8,
      totalAuctions: 12
    },
    condition: "Tuyệt vời",
    dimensions: "60cm x 80cm",
    materials: "Sơn dầu trên canvas",
    year: "2020",
    views: 234,
    watchers: 45,
    bidHistory: [
      { bidder: "Người đấu giá #001", amount: 5000000, time: "2024-02-05T14:30:00", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b386?w=50" },
      { bidder: "Người đấu giá #015", amount: 4800000, time: "2024-02-05T14:25:00", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" },
      { bidder: "Người đấu giá #008", amount: 4500000, time: "2024-02-05T14:20:00", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50" },
      { bidder: "Người đấu giá #003", amount: 4200000, time: "2024-02-05T13:45:00", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50" },
      { bidder: "Người đấu giá #011", amount: 4000000, time: "2024-02-05T13:20:00", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" }
    ]
  }
};

const AuctionDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("");
  const [question, setQuestion] = useState("");

  const auction = auctionDetailData[id as keyof typeof auctionDetailData];

  useEffect(() => {
    if (!auction) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeRemaining("Đã kết thúc");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeRemaining(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours} giờ ${minutes} phút ${seconds} giây`);
      } else {
        setTimeRemaining(`${minutes} phút ${seconds} giây`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  if (!auction) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy phiên đấu giá</h1>
          <Link to="/auction">
            <Button>Quay lại danh sách đấu giá</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const suggestedBids = [
    auction.currentBid + 100000,
    auction.currentBid + 200000,
    auction.currentBid + 500000,
    auction.currentBid + 1000000
  ];

  const handleBid = () => {
    if (!bidAmount || Number(bidAmount) <= auction.currentBid) {
      alert("Giá đấu phải lớn hơn giá hiện tại!");
      return;
    }
    
    alert(`Đấu giá thành công với giá ${formatCurrency(Number(bidAmount))}!`);
    setBidAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/auction">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách đấu giá
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="aspect-video rounded-t-lg overflow-hidden">
                  <img 
                    src={auction.images[selectedImage]} 
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {auction.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img src={image} alt={`${auction.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auction Info */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{auction.category}</Badge>
                  <Badge className="bg-green-500">Đang đấu giá</Badge>
                </div>
                <CardTitle className="text-2xl">{auction.title}</CardTitle>
                <p className="text-muted-foreground">{auction.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Chia sẻ
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Yêu thích ({auction.watchers})
                  </Button>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {auction.views} lượt xem
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Detailed Description */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mô tả chi tiết</h3>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line text-foreground leading-relaxed">
                      {auction.longDescription}
                    </p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Thông số kỹ thuật</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Kích thước</Label>
                      <p className="font-medium">{auction.dimensions}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Chất liệu</Label>
                      <p className="font-medium">{auction.materials}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Năm tạo</Label>
                      <p className="font-medium">{auction.year}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tình trạng</Label>
                      <p className="font-medium">{auction.condition}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Seller Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Người bán</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={auction.seller.avatar} />
                      <AvatarFallback>{auction.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{auction.seller.name}</h4>
                        {auction.seller.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>⭐ {auction.seller.rating}/5</span>
                        <span>{auction.seller.totalAuctions} phiên đấu giá</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Q&A Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Đặt câu hỏi cho người bán</h3>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Nhập câu hỏi của bạn..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <Button className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Gửi câu hỏi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Sidebar */}
          <div className="space-y-6">
            {/* Countdown Timer */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-center text-lg">Thời gian còn lại</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {timeRemaining}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Kết thúc: {new Date(auction.endTime).toLocaleString('vi-VN')}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Bid */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Giá đấu hiện tại</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(auction.currentBid)}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Khởi điểm: {formatCurrency(auction.startingBid)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">{auction.bidders}</div>
                    <div className="text-sm text-muted-foreground">Lượt đấu giá</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{auction.watchers}</div>
                    <div className="text-sm text-muted-foreground">Người theo dõi</div>
                  </div>
                </div>

                <Separator />

                {/* Bidding Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bidAmount">Giá đấu của bạn</Label>
                    <Input
                      id="bidAmount"
                      placeholder="Nhập giá đấu..."
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      type="number"
                      min={auction.currentBid + 1}
                    />
                    {bidAmount && Number(bidAmount) <= auction.currentBid && (
                      <div className="flex items-center gap-1 text-sm text-red-500 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        Giá đấu phải lớn hơn {formatCurrency(auction.currentBid)}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {suggestedBids.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setBidAmount(amount.toString())}
                        className="text-xs"
                      >
                        +{formatCurrency(amount - auction.currentBid)}
                      </Button>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleBid}
                    disabled={!bidAmount || Number(bidAmount) <= auction.currentBid}
                  >
                    <Gavel className="h-4 w-4 mr-2" />
                    Đấu giá ngay
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Bằng cách đấu giá, bạn đồng ý với điều khoản sử dụng
                  </div>
                </div>

                <Separator />

                {/* Beneficiary */}
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">Ủng hộ cho</div>
                  <div className="text-sm text-muted-foreground">{auction.beneficiary}</div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lịch sử đấu giá
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {auction.bidHistory.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={bid.avatar} />
                          <AvatarFallback>{bid.bidder.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{bid.bidder}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(bid.time).toLocaleString('vi-VN')}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        {formatCurrency(bid.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuctionDetailPage;