import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Trophy, Users, Clock, Target, Star, Award, MapPin } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

const challengeData = {
  "1": {
    id: "1",
    title: "Thử thách 30 ngày làm việc thiện",
    description: "Thực hiện một việc làm từ thiện mỗi ngày trong 30 ngày liên tục",
    longDescription: "Thử thách này khuyến khích mọi người tạo thành thói quen làm việc thiện hàng ngày. Bạn có thể bắt đầu từ những việc nhỏ như giúp người già qua đường, tặng quà cho trẻ em nghèo, hoặc quyên góp cho các tổ chức từ thiện. Mục tiêu là biến việc làm từ thiện thành một phần tự nhiên trong cuộc sống hàng ngày.",
    difficulty: "Dễ",
    duration: "30 ngày",
    participants: 2847,
    completed: 1523,
    points: 300,
    category: "Thói quen tích cực",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    image: "/src/assets/hero-charity.jpg",
    rewards: [
      "Huy hiệu 'Thiện nguyện viên tích cực'",
      "Chứng nhận hoàn thành từ Kindness Forge",
      "300 điểm kinh nghiệm"
    ],
    milestones: [
      { day: 7, title: "Tuần đầu hoàn thành", description: "Bạn đã kiên trì được 7 ngày!" },
      { day: 15, title: "Nửa chặng đường", description: "Đã đi được nửa đường rồi!" },
      { day: 30, title: "Hoàn thành thử thách", description: "Chúc mừng! Bạn đã hoàn thành thử thách!" }
    ],
    rules: [
      "Thực hiện ít nhất 1 việc thiện mỗi ngày",
      "Chụp ảnh hoặc viết nhật ký về việc làm",
      "Chia sẻ trên cộng đồng để khuyến khích người khác",
      "Không được bỏ lỡ quá 2 ngày liên tiếp"
    ]
  },
  "2": {
    id: "2",
    title: "Quyên góp 1 triệu đồng trong tháng",
    description: "Gây quỹ 1 triệu đồng cho các hoạt động từ thiện trong vòng 30 ngày",
    longDescription: "Thử thách này yêu cầu bạn gây quỹ được 1 triệu đồng cho các hoạt động từ thiện. Bạn có thể làm điều này bằng cách tổ chức các sự kiện gây quỹ, bán đồ handmade, hoặc kêu gọi sự đóng góp từ bạn bè và gia đình. Số tiền thu được sẽ được chuyển đến các tổ chức từ thiện uy tín.",
    difficulty: "Khó",
    duration: "30 ngày",
    participants: 156,
    completed: 23,
    points: 1000,
    category: "Gây quỹ",
    startDate: "2024-01-15",
    endDate: "2024-02-14",
    image: "/src/assets/hero-charity.jpg",
    rewards: [
      "Huy hiệu 'Nhà gây quỹ xuất sắc'",
      "Giấy chứng nhận từ tổ chức từ thiện",
      "1000 điểm kinh nghiệm",
      "Cơ hội tham gia sự kiện gala từ thiện"
    ],
    milestones: [
      { day: 10, title: "250,000 VNĐ", description: "Đã gây quỹ được 25% mục tiêu" },
      { day: 20, title: "500,000 VNĐ", description: "Đã hoàn thành 50% mục tiêu" },
      { day: 30, title: "1,000,000 VNĐ", description: "Hoàn thành xuất sắc mục tiêu!" }
    ],
    rules: [
      "Số tiền phải được quyên góp cho mục đích từ thiện",
      "Cung cấp bằng chứng về việc quyên góp",
      "Báo cáo tiến độ hàng tuần",
      "Tuân thủ các quy định pháp luật về gây quỹ"
    ]
  },
  "3": {
    id: "3",
    title: "Tình nguyện 50 giờ trong tháng",
    description: "Dành 50 giờ làm tình nguyện viên cho các tổ chức từ thiện",
    longDescription: "Thử thách này khuyến khích bạn dành thời gian của mình để giúp đỡ cộng đồng. Bạn có thể tham gia các hoạt động như phân phát thức ăn cho người vô gia cư, dạy học miễn phí cho trẻ em nghèo, chăm sóc người già, hoặc tham gia dọn dẹp môi trường. Mỗi giờ bạn đóng góp đều có ý nghĩa to lớn.",
    difficulty: "Trung bình",
    duration: "30 ngày",
    participants: 892,
    completed: 234,
    points: 500,
    category: "Tình nguyện",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    image: "/src/assets/hero-charity.jpg",
    rewards: [
      "Huy hiệu 'Tình nguyện viên tận tâm'",
      "Thư cảm ơn từ tổ chức được hỗ trợ",
      "500 điểm kinh nghiệm",
      "Ưu tiên tham gia các sự kiện đặc biệt"
    ],
    milestones: [
      { day: 10, title: "15 giờ hoàn thành", description: "Bạn đang làm rất tốt!" },
      { day: 20, title: "35 giờ hoàn thành", description: "Sắp đến đích rồi!" },
      { day: 30, title: "50 giờ hoàn thành", description: "Xuất sắc! Bạn đã hoàn thành!" }
    ],
    rules: [
      "Làm việc với các tổ chức từ thiện được công nhận",
      "Ghi lại thời gian và hoạt động cụ thể",
      "Có xác nhận từ tổ chức tình nguyện",
      "Ít nhất 2 giờ mỗi lần tham gia"
    ]
  }
};

const ChallengeDetailPage = () => {
  const { id } = useParams();
  const [isJoined, setIsJoined] = useState(false);
  
  const challenge = challengeData[id as keyof typeof challengeData];
  
  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy thử thách</h1>
          <Link to="/challenges">
            <Button>Quay lại danh sách thử thách</Button>
          </Link>
        </div>
      </div>
    );
  }

  const completionRate = (challenge.completed / challenge.participants) * 100;
  const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-green-100 text-green-800";
      case "Trung bình": return "bg-yellow-100 text-yellow-800";
      case "Khó": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/challenges">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách thử thách
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
                    src={challenge.image} 
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{challenge.category}</Badge>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
                  <p className="text-lg text-muted-foreground mb-6">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-bold">{challenge.duration}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Thời gian</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-bold">{challenge.participants}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Tham gia</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span className="font-bold">{challenge.completed}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Hoàn thành</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-primary" />
                        <span className="font-bold">{challenge.points}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Điểm thưởng</div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Mô tả chi tiết</h2>
                      <p className="text-foreground leading-relaxed">
                        {challenge.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Quy tắc tham gia</h3>
                      <ul className="space-y-2">
                        {challenge.rules.map((rule, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Mốc thành tích</h3>
                      <div className="space-y-4">
                        {challenge.milestones.map((milestone, index) => (
                          <div key={index} className="border-l-4 border-primary pl-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Award className="h-4 w-4 text-primary" />
                              <span className="font-semibold">Ngày {milestone.day}: {milestone.title}</span>
                            </div>
                            <p className="text-muted-foreground">{milestone.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Tham gia thử thách</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tỷ lệ hoàn thành</span>
                    <span className="text-sm text-muted-foreground">
                      {completionRate.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={completionRate} className="h-3 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    {challenge.completed} / {challenge.participants} người hoàn thành
                  </div>
                </div>

                {/* Time Left */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {daysLeft > 0 ? `${daysLeft} ngày` : 'Đã kết thúc'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {daysLeft > 0 ? 'còn lại để tham gia' : 'Thử thách đã kết thúc'}
                  </div>
                </div>

                <Separator />

                {/* Join Button */}
                <div className="space-y-4">
                  {!isJoined ? (
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setIsJoined(true)}
                      disabled={daysLeft <= 0}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Tham gia ngay
                    </Button>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="text-green-600 font-semibold">
                        ✓ Đã tham gia thử thách
                      </div>
                      <Button variant="outline" className="w-full">
                        Xem tiến độ của tôi
                      </Button>
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    Chia sẻ thử thách
                  </Button>
                </div>

                <Separator />

                {/* Rewards */}
                <div>
                  <h3 className="font-semibold mb-3">Phần thưởng</h3>
                  <ul className="space-y-2">
                    {challenge.rewards.map((reward, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenge Info */}
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bắt đầu:</span>
                    <span>{new Date(challenge.startDate).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kết thúc:</span>
                    <span>{new Date(challenge.endDate).toLocaleDateString('vi-VN')}</span>
                  </div>
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

export default ChallengeDetailPage;