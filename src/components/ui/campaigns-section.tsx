import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, Users } from "lucide-react";

const CampaignsSection = () => {
  const campaigns = [
    {
      id: 1,
      title: "Xây dựng trường học tại vùng cao",
      description: "Giúp các em nhỏ vùng cao có một ngôi trường học khang trang với đầy đủ tiện nghi.",
      image: "/placeholder.svg",
      raised: 75000000,
      target: 100000000,
      donors: 234,
      daysLeft: 15,
      category: "Giáo dục"
    },
    {
      id: 2,
      title: "Cứu trợ lũ lụt miền Trung",
      description: "Hỗ trợ khẩn cấp cho người dân bị ảnh hưởng bởi thiên tai lũ lụt.",
      image: "/placeholder.svg",
      raised: 45000000,
      target: 60000000,
      donors: 189,
      daysLeft: 7,
      category: "Khẩn cấp"
    },
    {
      id: 3,
      title: "Chăm sóc người già neo đơn",
      description: "Mang lại sự quan tâm và chăm sóc cho các cụ già không có người thân.",
      image: "/placeholder.svg",
      raised: 28000000,
      target: 50000000,
      donors: 156,
      daysLeft: 22,
      category: "Xã hội"
    }
  ];

  return (
    <section id="campaigns" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Chiến dịch từ thiện
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá và tham gia các chiến dịch từ thiện đang diễn ra. 
            Mỗi đóng góp nhỏ đều tạo nên sự khác biệt lớn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={campaign.image} 
                  alt={campaign.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.category}
                  </span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Đã quyên góp</span>
                    <span className="font-semibold">
                      {(campaign.raised / 1000000).toFixed(0)}M / {(campaign.target / 1000000)}M VNĐ
                    </span>
                  </div>
                  <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{campaign.donors} người ủng hộ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{campaign.daysLeft} ngày còn lại</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <Button className="flex-1" variant="outline">
                  Xem chi tiết
                </Button>
                <Button className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Ủng hộ
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Xem tất cả chiến dịch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;