import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import { toast } from "sonner";

const CreateCampaignPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    location: "",
    beneficiaries: "",
    timeline: "",
  });
  const [endDate, setEndDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();

  const categories = [
    "Giáo dục",
    "Y tế",
    "Môi trường",
    "Trẻ em",
    "Người cao tuổi",
    "Cộng đồng",
    "Thiên tai",
    "Động vật"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send data to backend
    toast.success("Chiến dịch đã được tạo thành công!");
    console.log("Campaign data:", { ...formData, startDate, endDate });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Tạo chiến dịch mới</h1>
              <p className="text-muted-foreground">Chia sẻ câu chuyện và kêu gọi sự hỗ trợ từ cộng đồng</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề chiến dịch *</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề hấp dẫn cho chiến dịch của bạn"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết *</Label>
                  <Textarea
                    id="description"
                    placeholder="Hãy kể câu chuyện của bạn. Tại sao chiến dịch này quan trọng? Ai sẽ được hỗ trợ?"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="goal">Mục tiêu quyên góp (VNĐ) *</Label>
                    <Input
                      id="goal"
                      type="number"
                      placeholder="1000000"
                      value={formData.goal}
                      onChange={(e) => handleInputChange("goal", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Danh mục *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm thực hiện</Label>
                  <Input
                    id="location"
                    placeholder="Thành phố, tỉnh"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thời gian và đối tượng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ngày bắt đầu</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "dd/MM/yyyy") : "Chọn ngày bắt đầu"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Ngày kết thúc</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "dd/MM/yyyy") : "Chọn ngày kết thúc"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beneficiaries">Đối tượng thụ hưởng</Label>
                  <Input
                    id="beneficiaries"
                    placeholder="Ví dụ: 50 trẻ em tại trường tiểu học ABC"
                    value={formData.beneficiaries}
                    onChange={(e) => handleInputChange("beneficiaries", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Kế hoạch thực hiện</Label>
                  <Textarea
                    id="timeline"
                    placeholder="Mô tả các giai đoạn thực hiện dự án"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh và tài liệu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Thêm hình ảnh cho chiến dịch</p>
                  <p className="text-muted-foreground mb-4">Kéo thả hoặc click để chọn file</p>
                  <Button variant="outline">Chọn file</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/">
                <Button variant="outline">Hủy</Button>
              </Link>
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                Tạo chiến dịch
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;