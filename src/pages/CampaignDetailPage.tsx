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
    longDescription: "Dự án xây dựng trường học tại xã Mường Phăng, huyện Điện Biên, tỉnh Điện Biên nhằm tạo ra môi trường học tập tốt hơn cho 200 em học sinh dân tộc thiểu số. Ngôi trường hiện tại đã xuống cấp nghiêm trọng, mái nhà dột, tường nứt và không đảm bảo an toàn.\n\nDự án bao gồm:\n• Xây dựng 6 phòng học hiện đại với diện tích 48m²/phòng\n• 1 phòng đa năng 100m² phục vụ sinh hoạt chung\n• Hệ thống vệ sinh đầy đủ với 8 phòng vệ sinh\n• Sân chơi và khu vực thể dục thể thao\n• Hệ thống điện - nước - internet hoàn chỉnh\n• Thư viện với 1000 đầu sách phù hợp\n\nDự kiến hoàn thành vào tháng 8/2024, mang lại môi trường học tập an toàn và hiện đại cho các em.",
    image: "/src/assets/campaign-school.jpg",
    raised: 450000000,
    goal: 800000000,
    supporters: 1247,
    endDate: "2024-12-31",
    location: "Điện Biên, Việt Nam",
    category: "Giáo dục",
    organizer: "Quỹ Thiện Tâm Việt Nam",
    startDate: "2024-01-01",
    beneficiaries: 200,
    timeline: "8 tháng",
    impact: [
      "200 em học sinh có trường học mới",
      "Nâng cao chất lượng giáo dục vùng cao",
      "Tạo việc làm cho 15 công nhân địa phương",
      "Phát triển kinh tế - xã hội khu vực"
    ],
    budget: [
      { item: "Xây dựng phòng học", amount: 480000000, percentage: 60 },
      { item: "Hệ thống điện nước", amount: 120000000, percentage: 15 },
      { item: "Nội thất và thiết bị", amount: 80000000, percentage: 10 },
      { item: "Sân chơi và cảnh quan", amount: 64000000, percentage: 8 },
      { item: "Chi phí quản lý", amount: 56000000, percentage: 7 }
    ],
    updates: [
      {
        date: "2024-01-20",
        title: "Tiến độ xây dựng đạt 15%",
        content: "Công tác đào móng và đổ bê tông cột đã hoàn thành. Dự kiến tuần tới sẽ bắt đầu xây tường.",
        images: ["photo1.jpg", "photo2.jpg"]
      },
      {
        date: "2024-01-15",
        title: "Khởi công xây dựng",
        content: "Lễ khởi công dự án đã được tổ chức với sự tham gia của chính quyền địa phương và đại diện nhà tài trợ. Ông Nguyễn Văn A - Chủ tịch UBND xã đã phát biểu cảm ơn sự hỗ trợ của cộng đồng.",
        images: ["ceremony1.jpg"]
      },
      {
        date: "2024-01-10",
        title: "Hoàn thành khảo sát địa hình",
        content: "Đội ngũ kỹ sư đã hoàn thành khảo sát và thiết kế bản vẽ chi tiết cho ngôi trường mới. Bản vẽ đã được phê duyệt bởi UBND tỉnh."
      },
      {
        date: "2024-01-05",
        title: "Thành lập ban quản lý dự án",
        content: "Ban quản lý dự án gồm 7 thành viên đã được thành lập, bao gồm đại diện từ quỹ, chính quyền địa phương và cộng đồng."
      }
    ]
  },
  "2": {
    id: "2",
    title: "Cứu trợ khẩn cấp vùng lũ lụt",
    description: "Hỗ trợ người dân vùng lũ với nhu yếu phẩm thiết yếu, thuốc men và nơi ở tạm thời.",
    longDescription: "Đợt lũ lụt lịch sử tại các tỉnh miền Trung đã gây thiệt hại nặng nề về người và tài sản. Hàng nghìn gia đình mất nhà cửa, tài sản và đang cần được hỗ trợ khẩn cấp.\n\nGói cứu trợ bao gồm:\n• 5kg gạo + 2 thùng mì tôm cho mỗi gia đình\n• 20 lít nước sạch và thuốc lọc nước\n• Bộ thuốc men cơ bản (hạ sốt, tiêu hóa, sát trùng)\n• Chăn, màn, quần áo ấm\n• Lều bạt tạm thời cho gia đình mất nhà\n• Đèn pin, pin dự phòng\n\nMục tiêu hỗ trợ 5000 gia đình trong 3 tháng tới, ưu tiên các hộ có trẻ em, người già và người khuyết tật.",
    image: "/src/assets/campaign-flood.jpg",
    raised: 1200000000,
    goal: 1500000000,
    supporters: 2156,
    endDate: "2024-03-31",
    location: "Miền Trung, Việt Nam",
    category: "Cứu trợ",
    organizer: "Hội Chữ thập đỏ Việt Nam",
    startDate: "2024-01-01",
    beneficiaries: 5000,
    timeline: "3 tháng",
    impact: [
      "5000 gia đình được hỗ trợ khẩn cấp",
      "Đảm bảo an toàn sức khỏe người dân",
      "Phục hồi sinh hoạt cơ bản",
      "Hỗ trợ tâm lý cho cộng đồng"
    ],
    budget: [
      { item: "Thực phẩm thiết yếu", amount: 600000000, percentage: 40 },
      { item: "Nước sạch và thuốc lọc", amount: 225000000, percentage: 15 },
      { item: "Thuốc men y tế", amount: 300000000, percentage: 20 },
      { item: "Chăn màn quần áo", amount: 225000000, percentage: 15 },
      { item: "Vận chuyển và logistics", amount: 150000000, percentage: 10 }
    ],
    updates: [
      {
        date: "2024-01-25",
        title: "Hoàn thành cứu trợ đợt 4",
        content: "Đã cứu trợ xong 1500 hộ gia đình tại 3 xã thuộc huyện Kỳ Anh, Hà Tĩnh. Tổng cộng đã hỗ trợ 4000 gia đình.",
        images: ["relief4_1.jpg", "relief4_2.jpg"]
      },
      {
        date: "2024-01-20",
        title: "Đợt cứu trợ thứ 3",
        content: "Đã phân phát 1000 phần quà cứu trợ cho các gia đình tại huyện Hương Khê, Hà Tĩnh. Mỗi phần quà trị giá 300.000đ.",
        images: ["relief3.jpg"]
      },
      {
        date: "2024-01-15",
        title: "Mở rộng khu vực cứu trợ",
        content: "Đã mở rộng hoạt động cứu trợ sang tỉnh Quảng Bình với 500 phần quà đầu tiên được trao tại xã Thuận Hóa."
      },
      {
        date: "2024-01-10",
        title: "Khởi động chương trình",
        content: "Chương trình cứu trợ chính thức khởi động với đợt cứu trợ đầu tiên tại 5 xã thuộc huyện Hương Sơn, Hà Tĩnh."
      }
    ]
  },
  "3": {
    id: "3",
    title: "Chăm sóc người cao tuổi neo đơn",
    description: "Chương trình chăm sóc sức khỏe và tinh thần cho người cao tuổi không có gia đình.",
    longDescription: "Nhiều cụ già trong cộng đồng đang sống cô đơn, không có người thân chăm sóc. Theo thống kê, TP.HCM có khoảng 2000 người cao tuổi neo đơn cần được chăm sóc đặc biệt.\n\nChương trình bao gồm:\n• Khám sức khỏe định kỳ hàng tháng\n• Cung cấp thuốc men miễn phí\n• Thăm hỏi, trò chuyện hàng tuần\n• Tổ chức sinh hoạt cộng đồng\n• Hỗ trợ việc nhà cơ bản\n• Cung cấp suất ăn miễn phí\n• Tư vấn tâm lý và chăm sóc tinh thần\n\nMỗi cụ sẽ có 1 tình nguyện viên phụ trách riêng, đảm bảo chăm sóc chu đáo và thường xuyên.",
    image: "/src/assets/campaign-elderly.jpg",
    raised: 280000000,
    goal: 500000000,
    supporters: 856,
    endDate: "2024-06-30",
    location: "TP. Hồ Chí Minh",
    category: "Chăm sóc xã hội",
    organizer: "Hội Bảo trợ Người cao tuổi",
    startDate: "2024-01-01",
    beneficiaries: 300,
    timeline: "6 tháng",
    impact: [
      "300 cụ già được chăm sóc thường xuyên",
      "Cải thiện sức khỏe và tinh thần",
      "Tạo mạng lưới hỗ trợ cộng đồng",
      "Nâng cao chất lượng cuộc sống"
    ],
    budget: [
      { item: "Chi phí y tế và thuốc men", amount: 200000000, percentage: 40 },
      { item: "Suất ăn và dinh dưỡng", amount: 150000000, percentage: 30 },
      { item: "Hoạt động sinh hoạt", amount: 75000000, percentage: 15 },
      { item: "Đào tạo tình nguyện viên", amount: 50000000, percentage: 10 },
      { item: "Chi phí vận hành", amount: 25000000, percentage: 5 }
    ],
    updates: [
      {
        date: "2024-01-22",
        title: "Mở rộng chương trình ra Quận 7",
        content: "Chương trình đã được mở rộng ra Quận 7 với 50 cụ già mới được đăng ký tham gia. Hiện tại đã có 200 cụ trong chương trình.",
        images: ["elderly_q7.jpg"]
      },
      {
        date: "2024-01-18",
        title: "Khám sức khỏe định kỳ tháng 1",
        content: "Đã tổ chức khám sức khỏe miễn phí cho 150 cụ già tại quận 1 và quận 3. Phát hiện và điều trị kịp thời 15 ca bệnh.",
        images: ["health_check.jpg"]
      },
      {
        date: "2024-01-12",
        title: "Tết sum vầy cho người cao tuổi",
        content: "Tổ chức chương trình Tết sum vầy với 100 cụ già, tặng quà và tổ chức bữa cơm ấm cúng."
      },
      {
        date: "2024-01-05",
        title: "Đào tạo 50 tình nguyện viên mới",
        content: "Hoàn thành khóa đào tạo cho 50 tình nguyện viên về kỹ năng chăm sóc và giao tiếp với người cao tuổi."
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

                   <div className="space-y-6">
                     <div>
                       <h2 className="text-2xl font-bold mb-4">Về chiến dịch này</h2>
                       <p className="text-foreground leading-relaxed whitespace-pre-line">
                         {campaign.longDescription}
                       </p>
                     </div>

                     {/* Project Impact */}
                     <div>
                       <h3 className="text-xl font-semibold mb-3">Tác động dự kiến</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {campaign.impact.map((item, index) => (
                           <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                             <Target className="h-5 w-5 text-primary flex-shrink-0" />
                             <span className="text-foreground">{item}</span>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Budget Breakdown */}
                     <div>
                       <h3 className="text-xl font-semibold mb-3">Phân bổ ngân sách</h3>
                       <div className="space-y-3">
                         {campaign.budget.map((item, index) => (
                           <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                             <div className="flex-1">
                               <div className="flex justify-between items-center mb-1">
                                 <span className="font-medium">{item.item}</span>
                                 <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                               </div>
                               <Progress value={item.percentage} className="h-2" />
                             </div>
                             <div className="ml-4 text-right">
                               <span className="font-semibold">{formatCurrency(item.amount)}</span>
                             </div>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Project Info */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="text-center p-4 bg-muted rounded-lg">
                         <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                         <div className="font-semibold">{campaign.beneficiaries?.toLocaleString()}</div>
                         <div className="text-sm text-muted-foreground">Người thụ hưởng</div>
                       </div>
                       <div className="text-center p-4 bg-muted rounded-lg">
                         <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                         <div className="font-semibold">{campaign.timeline}</div>
                         <div className="text-sm text-muted-foreground">Thời gian thực hiện</div>
                       </div>
                       <div className="text-center p-4 bg-muted rounded-lg">
                         <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                         <div className="font-semibold">{new Date(campaign.startDate || '').toLocaleDateString('vi-VN')}</div>
                         <div className="text-sm text-muted-foreground">Ngày khởi động</div>
                       </div>
                     </div>
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