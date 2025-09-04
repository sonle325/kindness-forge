import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import campaignSchool from "@/assets/campaign-school.jpg";
import campaignFlood from "@/assets/campaign-flood.jpg";
import campaignElderly from "@/assets/campaign-elderly.jpg";

const CampaignsSection = () => {
  const campaigns = [
    {
      id: 1,
      title: "Xây dựng trường học tại vùng cao",
      description: "Giúp các em nhỏ vùng cao có một ngôi trường học khang trang với đầy đủ tiện nghi.",
      image: campaignSchool,
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
      image: campaignFlood,
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
      image: campaignElderly,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 group h-full flex flex-col">
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
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight h-14 flex items-center">{campaign.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed h-12 flex items-start">
                  {campaign.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-between pb-4">
                <div className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Đã quyên góp</span>
                      <span className="font-bold text-primary">
                        {(campaign.raised / 1000000)}M / {(campaign.target / 1000000)}M VNĐ
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{campaign.donors} người ủng hộ</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{campaign.daysLeft} ngày còn lại</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-3 pt-0">
                <Button className="flex-1" variant="outline" size="sm" asChild>
                  <Link to={`/campaigns/${campaign.id}`}>
                    Xem chi tiết
                  </Link>
                </Button>
                <Button className="flex-1" size="sm" asChild>
                  <Link to={`/payment/${campaign.id}`}>
                    <Heart className="h-4 w-4 mr-1" />
                    Ủng hộ
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/campaigns">
              Xem tất cả chiến dịch
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CampaignsSection;