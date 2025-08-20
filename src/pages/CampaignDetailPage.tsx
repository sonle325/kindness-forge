import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Heart, Share2, Calendar, MapPin, Users, Target, Clock, QrCode } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

// Mock data for campaigns
const campaignData = {
  "1": {
    id: "1",
    title: "Xây dựng trường học cho trẻ em vùng cao",
    description: "Hỗ trợ xây dựng ngôi trường mới cho các em nhỏ ở vùng núi cao, nơi điều kiện học tập còn khó khăn.",
    longDescription: "Dự án xây dựng trường học tại xã Mường Phăng, huyện Điện Biên, tỉnh Điện Biên nhằm tạo ra môi trường học tập tốt hơn cho 200 em học sinh dân tộc thiểu số. Ngôi trường hiện tại đã xuống cấp nghiêm trọng, mái nhà dột, tường nứt và không đảm bảo an toàn. Với sự đóng góp của cộng đồng, chúng ta sẽ xây dựng một ngôi trường mới khang trang với 6 phòng học, 1 phòng đa năng và hệ thống vệ sinh đầy đủ.",
    image: "/src/assets/campaign-school.jpg",
    raised: 450000000,
    goal: 800000000,
    supporters: 1247,
    endDate: "2024-12-31",
    location: "Điện Biên, Việt Nam",
    category: "Giáo dục",
    organizer: "Quỹ Thiện Tâm Việt Nam",
    updates: [
      {
        date: "2024-01-15",
        title: "Khởi công xây dựng",
        content: "Lễ khởi công dự án đã được tổ chức với sự tham gia của chính quyền địa phương và đại diện nhà tài trợ."
      },
      {
        date: "2024-01-10",
        title: "Hoàn thành khảo sát địa hình",
        content: "Đội ngũ kỹ sư đã hoàn thành khảo sát và thiết kế bản vẽ chi tiết cho ngôi trường mới."
      }
    ]
  },
  "2": {
    id: "2",
    title: "Cứu trợ khẩn cấp vùng lũ lụt",
    description: "Hỗ trợ người dân vùng lũ với nhu yếu phẩm thiết yếu, thuốc men và nơi ở tạm thời.",
    longDescription: "Đợt lũ lụt lịch sử tại các tỉnh miền Trung đã gây thiệt hại nặng nề về người và tài sản. Hàng nghìn gia đình mất nhà cửa, tài sản và đang cần được hỗ trợ khẩn cấp. Chương trình cứu trợ này sẽ cung cấp gạo, mì tôm, nước sạch, thuốc men và chăn màn cho 5000 gia đình bị ảnh hưởng.",
    image: "/src/assets/campaign-flood.jpg",
    raised: 1200000000,
    goal: 1500000000,
    supporters: 2156,
    endDate: "2024-03-31",
    location: "Miền Trung, Việt Nam",
    category: "Cứu trợ",
    organizer: "Hội Chữ thập đỏ Việt Nam",
    updates: [
      {
        date: "2024-01-20",
        title: "Đợt cứu trợ thứ 3",
        content: "Đã phân phát 1000 phần quà cứu trợ cho các gia đình tại huyện Hương Khê, Hà Tĩnh."
      }
    ]
  },
  "3": {
    id: "3",
    title: "Chăm sóc người cao tuổi neo đơn",
    description: "Chương trình chăm sóc sức khỏe và tinh thần cho người cao tuổi không có gia đình.",
    longDescription: "Nhiều cụ già trong cộng đồng đang sống cô đơn, không có người thân chăm sóc. Chương trình này sẽ tổ chức các hoạt động thăm hỏi, khám sức khỏe định kỳ, cung cấp thuốc men và tổ chức các buổi sinh hoạt cộng đồng để các cụ có thêm niềm vui trong cuộc sống.",
    image: "/src/assets/campaign-elderly.jpg",
    raised: 280000000,
    goal: 500000000,
    supporters: 856,
    endDate: "2024-06-30",
    location: "TP. Hồ Chí Minh",
    category: "Chăm sóc xã hội",
    organizer: "Hội Bảo trợ Người cao tuổi",
    updates: [
      {
        date: "2024-01-18",
        title: "Khám sức khỏe định kỳ",
        content: "Đã tổ chức khám sức khỏe miễn phí cho 150 cụ già tại quận 1 và quận 3."
      }
    ]
  }
};

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [donationAmount, setDonationAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  
  const campaign = campaignData[id as keyof typeof campaignData];
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy chiến dịch</h1>
          <Link to="/campaigns">
            <Button>Quay lại danh sách chiến dịch</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const predefinedAmounts = [100000, 200000, 500000, 1000000];

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/campaigns">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách chiến dịch
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="aspect-video rounded-t-lg overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {campaign.location}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{campaign.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Chia sẻ
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Heart className="h-4 w-4" />
                      Yêu thích
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h2 className="text-2xl font-bold mb-4">Về chiến dịch này</h2>
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {campaign.longDescription}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Cập nhật dự án</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaign.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(update.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2">{update.title}</h3>
                    <p className="text-muted-foreground">{update.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Donation Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Ủng hộ chiến dịch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(campaign.raised)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {formatCurrency(campaign.goal)}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {progressPercentage.toFixed(1)}% đã đạt được
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-bold">{campaign.supporters.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Người ủng hộ</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-bold">{daysLeft}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Ngày còn lại</div>
                  </div>
                </div>

                <Separator />

                {/* Donation Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Số tiền ủng hộ</Label>
                    <Input
                      id="amount"
                      placeholder="Nhập số tiền..."
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDonationAmount(amount.toString())}
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowQR(true)}
                    disabled={!donationAmount}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Ủng hộ ngay
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => setShowQR(true)}
                  >
                    <QrCode className="h-4 w-4" />
                    Quét QR để ủng hộ
                  </Button>
                </div>

                {/* QR Code Display */}
                {showQR && (
                  <div className="text-center space-y-4 p-4 bg-muted rounded-lg">
                    <div className="w-48 h-48 bg-white mx-auto rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="h-24 w-24 mx-auto mb-2" />
                        <p className="text-sm">QR Code Demo</p>
                        <p className="text-xs text-muted-foreground">
                          {donationAmount ? formatCurrency(Number(donationAmount)) : ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quét mã QR bằng ứng dụng ngân hàng để thanh toán
                    </p>
                    <Button variant="outline" onClick={() => setShowQR(false)}>
                      Đóng
                    </Button>
                  </div>
                )}

                {/* Organizer Info */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Tổ chức thực hiện</h3>
                  <p className="text-sm text-muted-foreground">{campaign.organizer}</p>
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

export default CampaignDetailPage;