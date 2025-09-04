import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Share2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/ui/navigation";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const amount = searchParams.get("amount");
  const campaignId = searchParams.get("campaign");
  
  useEffect(() => {
    toast({
      title: "Cảm ơn bạn!",
      description: "Sự ủng hộ của bạn sẽ tạo nên những thay đổi tích cực",
    });
  }, [toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Tôi vừa ủng hộ chiến dịch từ thiện",
        text: `Tôi vừa ủng hộ ${parseInt(amount || "0").toLocaleString()} VNĐ cho chiến dịch từ thiện. Hãy cùng tham gia!`,
        url: window.location.origin,
      });
    } else {
      toast({
        title: "Đã sao chép link",
        description: "Link đã được sao chép vào clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="relative mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
              <div className="absolute -inset-2 bg-green-200/50 rounded-full animate-ping" />
            </div>
          </div>

          {/* Success Message */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-green-600 mb-2">
                Thanh toán thành công!
              </CardTitle>
              <CardDescription className="text-lg">
                Cảm ơn bạn đã ủng hộ chiến dịch từ thiện
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Transaction Details */}
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Số tiền ủng hộ:</span>
                  <span className="text-2xl font-bold text-primary">
                    {parseInt(amount || "0").toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mã giao dịch:</span>
                  <span className="font-mono text-sm">
                    TX{Date.now().toString().slice(-8)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Thời gian:</span>
                  <span>{new Date().toLocaleString("vi-VN")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Chiến dịch:</span>
                  <span>Xây dựng trường học tại vùng cao</span>
                </div>
              </div>

              {/* Impact Message */}
              <div className="bg-gradient-primary p-6 rounded-lg text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Tác động của bạn</h3>
                </div>
                <p className="text-white/90">
                  Với số tiền {parseInt(amount || "0").toLocaleString()} VNĐ này, bạn đã giúp:
                </p>
                <ul className="mt-3 space-y-1 text-white/90">
                  <li>• Mua được 2 bộ bàn ghế học sinh</li>
                  <li>• Trang bị dụng cụ học tập cho 5 em nhỏ</li>
                  <li>• Đóng góp vào việc xây dựng 1m² diện tích lớp học</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Tải hóa đơn
                </Button>
                
                <Button asChild>
                  <Link to={`/campaigns/${campaignId}`}>
                    Xem chiến dịch
                  </Link>
                </Button>
              </div>

              {/* Follow Up Actions */}
              <div className="pt-6 border-t space-y-4">
                <h4 className="font-semibold text-center">Tiếp tục lan toa yêu thương</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link to="/campaigns" className="flex flex-col items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <div className="text-center">
                        <div className="font-medium">Ủng hộ thêm</div>
                        <div className="text-sm text-muted-foreground">
                          Khám phá các chiến dịch khác
                        </div>
                      </div>
                    </Link>
                  </Button>
                  
                  <Button variant="outline" asChild className="h-auto p-4">
                    <Link to="/create-campaign" className="flex flex-col items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div className="text-center">
                        <div className="font-medium">Tạo chiến dịch</div>
                        <div className="text-sm text-muted-foreground">
                          Khởi tạo hoạt động từ thiện
                        </div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Return Home */}
              <div className="pt-4">
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/">
                    Quay về trang chủ
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;