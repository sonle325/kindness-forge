import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, QrCode, Smartphone, Shield, Users, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "AI Chatbot thông minh",
      description: "Trò chuyện với AI để nhận tư vấn về các hoạt động từ thiện phù hợp với bạn, tìm hiểu về các chiến dịch và cách thức tham gia hiệu quả nhất."
    },
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "Thanh toán QR tiện lợi",
      description: "Quyên góp nhanh chóng và an toàn thông qua mã QR. Chọn số tiền, quét mã và hoàn tất giao dịch chỉ trong vài giây."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Giao diện thân thiện",
      description: "Thiết kế hiện đại, dễ sử dụng trên mọi thiết bị. Trải nghiệm mượt mà từ việc khám phá chiến dịch đến thực hiện quyên góp."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bảo mật tuyệt đối",
      description: "Hệ thống bảo mật nhiều lớp đảm bảo thông tin cá nhân và giao dịch của bạn được bảo vệ an toàn tuyệt đối."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Cộng đồng sôi động",
      description: "Kết nối với hàng nghìn người có cùng chí hướng từ thiện. Chia sẻ kinh nghiệm, học hỏi và cùng nhau tạo ra tác động tích cực."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Cập nhật realtime",
      description: "Theo dõi tiến độ chiến dịch, kết quả thách thức và hoạt động đấu giá trong thời gian thực. Luôn cập nhật những thông tin mới nhất."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Tính năng nổi bật
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Khám phá những tính năng hiện đại giúp bạn dễ dàng tham gia và quản lý các hoạt động từ thiện
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 group border-0 bg-gradient-card">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary-light rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;