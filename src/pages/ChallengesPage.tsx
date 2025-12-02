import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Calendar, Star, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setChallenges } from "@/store/slices/challengesSlice";

const ChallengesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { challenges } = useAppSelector((state) => state.challenges);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockChallenges = [
      {
        id: "1",
        title: "30 ngày đi bộ từ thiện",
        description: "Đi bộ 10,000 bước mỗi ngày trong 30 ngày. Mỗi bước sẽ được quy đổi thành tiền từ thiện.",
        reward: 50000,
        difficulty: "Dễ",
        category: "Sức khỏe",
        endDate: "2025-01-15",
        tasks: ["Đi bộ 10,000 bước mỗi ngày", "Ghi nhận kết quả hàng ngày", "Hoàn thành trong 30 ngày"]
      },
      {
        id: "2",
        title: "Thách thức đọc sách cho trẻ em",
        description: "Đọc và review 5 cuốn sách thiếu nhi, chia sẻ kiến thức với cộng đồng.",
        reward: 100000,
        difficulty: "Trung bình",
        category: "Giáo dục",
        endDate: "2025-01-20",
        tasks: ["Đọc 5 cuốn sách thiếu nhi", "Viết review cho mỗi cuốn", "Chia sẻ lên cộng đồng"]
      },
      {
        id: "3",
        title: "Giảm thiểu rác thải nhựa",
        description: "Không sử dụng đồ nhựa dùng một lần trong 7 ngày, ghi lại hành trình của bạn.",
        reward: 75000,
        difficulty: "Dễ",
        category: "Môi trường",
        endDate: "2025-01-10",
        tasks: ["Không dùng đồ nhựa dùng một lần", "Ghi lại hành trình hàng ngày", "Chia sẻ kinh nghiệm"]
      },
      {
        id: "4",
        title: "Trồng cây xanh cộng đồng",
        description: "Tham gia trồng ít nhất 10 cây xanh tại khu vực cộng đồng của bạn.",
        reward: 120000,
        difficulty: "Trung bình",
        category: "Môi trường",
        endDate: "2025-02-01",
        tasks: ["Trồng 10 cây xanh", "Chụp ảnh và chia sẻ", "Theo dõi cây trong 2 tuần"]
      },
      {
        id: "5",
        title: "Dạy kèm miễn phí cho học sinh",
        description: "Dạy kèm miễn phí cho học sinh nghèo ít nhất 10 buổi.",
        reward: 150000,
        difficulty: "Khó",
        category: "Giáo dục",
        endDate: "2025-02-15",
        tasks: ["Tìm học sinh cần hỗ trợ", "Dạy kèm 10 buổi", "Báo cáo tiến độ học tập"]
      },
      {
        id: "6",
        title: "Thu gom rác bãi biển",
        description: "Tham gia dọn dẹp bãi biển, thu gom ít nhất 50kg rác thải.",
        reward: 90000,
        difficulty: "Dễ",
        category: "Môi trường",
        endDate: "2025-01-25",
        tasks: ["Thu gom rác tại bãi biển", "Đạt 50kg rác thải", "Chụp ảnh trước và sau"]
      }
    ];

    dispatch(setChallenges(mockChallenges));
  }, [dispatch]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-primary-light text-primary";
      case "Trung bình": return "bg-accent/20 text-accent";
      case "Khó": return "bg-destructive/20 text-destructive";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getIcon = (category: string) => {
    switch (category) {
      case "Sức khỏe": return <Target className="h-6 w-6" />;
      case "Giáo dục": return <Star className="h-6 w-6" />;
      default: return <Trophy className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">Thách thức từ thiện</h1>
            <p className="text-xl text-muted-foreground">
              Tham gia các thách thức ý nghĩa, vừa phát triển bản thân vừa đóng góp cho cộng đồng
            </p>
          </div>
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => navigate("/create-challenge")}
          >
            <Plus className="h-5 w-5" />
            Tạo thách thức mới
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer h-full flex flex-col"
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-light rounded-lg text-primary">
                      {getIcon(challenge.category || "")}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(challenge.endDate || "").toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight h-12 flex items-start">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed h-16 flex items-start">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between pb-4">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phần thưởng:</span>
                    <span className="font-bold text-primary text-lg">
                      {challenge.reward.toLocaleString()} VNĐ
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Độ khó:</span>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                <Button className="w-full">
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChallengesPage;