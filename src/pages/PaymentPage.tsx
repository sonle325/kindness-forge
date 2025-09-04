import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  QrCode, 
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock
} from "lucide-react";
import Navigation from "@/components/ui/navigation";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [amount, setAmount] = useState("100000");
  const [customAmount, setCustomAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const predefinedAmounts = [
    { value: "50000", label: "50.000 VNĐ" },
    { value: "100000", label: "100.000 VNĐ" },
    { value: "200000", label: "200.000 VNĐ" },
    { value: "500000", label: "500.000 VNĐ" },
    { value: "1000000", label: "1.000.000 VNĐ" },
  ];

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Thẻ tín dụng/ghi nợ",
      icon: CreditCard,
      description: "Visa, Mastercard, JCB, American Express"
    },
    {
      id: "bank-transfer",
      name: "Chuyển khoản ngân hàng",
      icon: Building2,
      description: "Vietcombank, Techcombank, BIDV, ACB"
    },
    {
      id: "e-wallet",
      name: "Ví điện tử",
      icon: Smartphone,
      description: "MoMo, ZaloPay, ViettelPay, ShopeePay"
    },
    {
      id: "qr-code",
      name: "Quét mã QR",
      icon: QrCode,
      description: "Thanh toán nhanh bằng QR code"
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Thanh toán thành công!",
        description: `Bạn đã ủng hộ ${parseInt(amount || customAmount).toLocaleString()} VNĐ`,
      });
      navigate(`/payment-success?amount=${amount || customAmount}&campaign=${id}`);
    }, 2000);
  };

  const finalAmount = customAmount || amount;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Thanh toán ủng hộ</h1>
              <p className="text-muted-foreground">Hoàn tất việc ủng hộ chiến dịch từ thiện</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Amount Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Chọn số tiền ủng hộ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {predefinedAmounts.map((amountOption) => (
                      <button
                        key={amountOption.value}
                        onClick={() => {
                          setAmount(amountOption.value);
                          setCustomAmount("");
                        }}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          amount === amountOption.value && !customAmount
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {amountOption.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount">Hoặc nhập số tiền khác</Label>
                    <Input
                      id="custom-amount"
                      placeholder="Nhập số tiền (VNĐ)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount("");
                      }}
                      type="number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Chọn phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <method.icon className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details Form */}
              {paymentMethod === "credit-card" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin thẻ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Số thẻ</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Ngày hết hạn</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Tên trên thẻ</Label>
                      <Input id="card-name" placeholder="NGUYEN VAN A" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "bank-transfer" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin chuyển khoản</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số tài khoản:</strong> 1234567890</p>
                      <p><strong>Chủ tài khoản:</strong> KINDNESS FORGE</p>
                      <p><strong>Nội dung:</strong> UNG HO {id}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-ref">Mã tham chiếu (nếu có)</Label>
                      <Input id="bank-ref" placeholder="Nhập mã tham chiếu từ ngân hàng" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentMethod === "qr-code" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Quét mã QR để thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="bg-muted/50 p-6 rounded-lg">
                      <QrCode className="h-32 w-32 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">
                        Mã QR sẽ được tạo sau khi xác nhận
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sử dụng app ngân hàng hoặc ví điện tử để quét mã QR
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Payment Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Thông tin ủng hộ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chiến dịch:</span>
                      <span className="font-medium">Xây dựng trường học</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Số tiền:</span>
                      <span className="font-medium">
                        {parseInt(finalAmount || "0").toLocaleString()} VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phí giao dịch:</span>
                      <span className="font-medium text-green-600">Miễn phí</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">
                      {parseInt(finalAmount || "0").toLocaleString()} VNĐ
                    </span>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">Thanh toán được bảo mật</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handlePayment}
                    disabled={!finalAmount || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Xác nhận ủng hộ
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {/* Security Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Mã hóa SSL 256-bit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Tuân thủ PCI DSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Bảo mật thông tin cá nhân</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;