import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Calendar, Star } from "lucide-react";

const ChallengesSection = () => {
  const challenges = [
    {
      id: 1,
      title: "30 ngày đi bộ từ thiện",
      description: "Đi bộ 10,000 bước mỗi ngày trong 30 ngày. Mỗi bước sẽ được quy đổi thành tiền từ thiện.",
      reward: "50,000 VNĐ",
      participants: 1247,
      difficulty: "Dễ",
      timeLimit: "30 ngày",
      category: "Sức khỏe",
      icon: <Target className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Thách thức đọc sách cho trẻ em",
      description: "Đọc và review 5 cuốn sách thiếu nhi, chia sẻ kiến thức với cộng đồng.",
      reward: "100,000 VNĐ",
      participants: 567,
      difficulty: "Trung bình",
      timeLimit: "2 tuần",
      category: "Giáo dục",
      icon: <Star className="h-6 w-6" />
    },
    {
      id: 3,
      title: "Giảm thiểu rác thải nhựa",
      description: "Không sử dụng đồ nhựa dùng một lần trong 7 ngày, ghi lại hành trình của bạn.",
      reward: "75,000 VNĐ",
      participants: 823,
      difficulty: "Dễ",
      timeLimit: "1 tuần",
      category: "Môi trường",
      icon: <Trophy className="h-6 w-6" />
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ": return "bg-primary-light text-primary";
      case "Trung bình": return "bg-accent/20 text-accent";
      case "Khó": return "bg-destructive/20 text-destructive";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="challenges" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Thách thức từ thiện
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tham gia các thách thức ý nghĩa, vừa phát triển bản thân vừa đóng góp cho cộng đồng.
            Hoàn thành thách thức để nhận phần thưởng từ thiện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group border-l-4 border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-light rounded-lg text-primary">
                      {challenge.icon}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {challenge.category}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">
                        {challenge.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">
                  {challenge.description}
                </CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phần thưởng:</span>
                    <span className="font-semibold text-primary">{challenge.reward}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Người tham gia:</span>
                    <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Thời hạn:</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{challenge.timeLimit}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Độ khó:</span>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                <Button className="w-full mt-4 group-hover:bg-primary/90">
                  Tham gia thách thức
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Khám phá thêm thách thức
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;