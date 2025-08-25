import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, ArrowLeft, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import { toast } from "sonner";

const CreateAuctionPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillName: "",
    skillLevel: "",
    experience: "",
    startingPrice: "",
    minBidIncrement: "",
    duration: "",
    requirements: "",
    deliverables: "",
    category: "",
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const skillCategories = [
    "Lập trình & Công nghệ",
    "Thiết kế & Sáng tạo",
    "Marketing & Truyền thông",
    "Kinh doanh & Tài chính",
    "Giáo dục & Đào tạo",
    "Dịch thuật & Ngôn ngữ",
    "Âm nhạc & Nghệ thuật",
    "Thể thao & Sức khỏe",
    "Kỹ năng sống",
    "Khác"
  ];

  const skillLevels = ["Mới bắt đầu", "Trung cấp", "Nâng cao", "Chuyên gia"];
  const durations = ["1 tuần", "2 tuần", "1 tháng", "2 tháng", "3 tháng", "Tùy chỉnh"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Đấu giá kĩ năng đã được tạo thành công!");
    console.log("Auction data:", { ...formData, startDate, endDate });
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
              <h1 className="text-3xl font-bold">Tạo đấu giá kĩ năng</h1>
              <p className="text-muted-foreground">Chia sẻ kĩ năng của bạn và hỗ trợ các dự án từ thiện</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Thông tin cơ bản
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề đấu giá *</Label>
                  <Input
                    id="title"
                    placeholder="Ví dụ: Thiết kế logo chuyên nghiệp cho tổ chức từ thiện"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả chi tiết *</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả về dịch vụ bạn cung cấp, quy trình làm việc, và lợi ích cho tổ chức từ thiện"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Danh mục kĩ năng *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skillName">Tên kĩ năng cụ thể *</Label>
                    <Input
                      id="skillName"
                      placeholder="Ví dụ: Thiết kế đồ họa, Lập trình web, Dịch thuật..."
                      value={formData.skillName}
                      onChange={(e) => handleInputChange("skillName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Trình độ kĩ năng *</Label>
                    <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange("skillLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trình độ" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh nghiệm (năm)</Label>
                    <Input
                      id="experience"
                      type="number"
                      placeholder="5"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Cài đặt đấu giá
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startingPrice">Giá khởi điểm (VNĐ) *</Label>
                    <Input
                      id="startingPrice"
                      type="number"
                      placeholder="500000"
                      value={formData.startingPrice}
                      onChange={(e) => handleInputChange("startingPrice", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minBidIncrement">Bước giá tối thiểu (VNĐ) *</Label>
                    <Input
                      id="minBidIncrement"
                      type="number"
                      placeholder="50000"
                      value={formData.minBidIncrement}
                      onChange={(e) => handleInputChange("minBidIncrement", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Ngày bắt đầu đấu giá</Label>
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
                    <Label>Ngày kết thúc đấu giá</Label>
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
                  <Label>Thời gian thực hiện dự án</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời gian thực hiện" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chi tiết dự án</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="deliverables">Sản phẩm giao nộp *</Label>
                  <Textarea
                    id="deliverables"
                    placeholder="Mô tả cụ thể những gì bạn sẽ giao cho tổ chức từ thiện (file, format, số lượng...)"
                    value={formData.deliverables}
                    onChange={(e) => handleInputChange("deliverables", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Yêu cầu từ tổ chức</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Những thông tin hoặc tài liệu bạn cần từ tổ chức để hoàn thành công việc"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio và hình ảnh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Thêm hình ảnh mẫu công việc</p>
                  <p className="text-muted-foreground mb-4">Showcase các dự án trước để tăng độ tin cậy</p>
                  <Button variant="outline">Chọn file</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Link to="/">
                <Button variant="outline">Hủy</Button>
              </Link>
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                Tạo đấu giá
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuctionPage;