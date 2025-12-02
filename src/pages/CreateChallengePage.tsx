import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { addChallenge } from "@/store/slices/challengesSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, ArrowLeft, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import { toast } from "sonner";

const CreateChallengePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    difficulty: "",
    category: "",
    requirements: "",
  });
  const [endDate, setEndDate] = useState<Date>();
  const [tasks, setTasks] = useState<string[]>([""]);

  const difficulties = ["Dễ", "Trung bình", "Khó"];
  const categories = [
    "Môi trường",
    "Cộng đồng", 
    "Giáo dục",
    "Sức khỏe",
    "Kỹ năng",
    "Sáng tạo",
    "Thể thao",
    "Công nghệ"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const updateTask = (index: number, value: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newChallenge = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      reward: parseFloat(formData.reward),
      difficulty: formData.difficulty,
      category: formData.category,
      endDate: endDate?.toISOString(),
      tasks: tasks.filter(task => task.trim() !== "")
    };
    
    dispatch(addChallenge(newChallenge));
    toast.success("Thử thách đã được tạo thành công!");
    navigate("/challenges");
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
              <h1 className="text-3xl font-bold">Tạo thử thách mới</h1>
              <p className="text-muted-foreground">Khuyến khích cộng đồng tham gia các hoạt động ý nghĩa</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin thử thách</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tên thử thách *</Label>
                  <Input
                    id="title"
                    placeholder="Ví dụ: Thử thách 30 ngày không rác thải nhựa"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả thử thách *</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết về thử thách, mục đích và ý nghĩa của nó"
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                  <div className="space-y-2">
                    <Label>Độ khó *</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn độ khó" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                          {endDate ? format(endDate, "dd/MM/yyyy") : "Chọn ngày"}
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
                  <Label htmlFor="reward">Phần thưởng</Label>
                  <Input
                    id="reward"
                    placeholder="Ví dụ: Huy hiệu, điểm tích lũy, giải thưởng..."
                    value={formData.reward}
                    onChange={(e) => handleInputChange("reward", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nhiệm vụ và yêu cầu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Danh sách nhiệm vụ *</Label>
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Nhiệm vụ ${index + 1}`}
                        value={task}
                        onChange={(e) => updateTask(index, e.target.value)}
                        required
                      />
                      {tasks.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeTask(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTask}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm nhiệm vụ
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Yêu cầu tham gia</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Các yêu cầu cần thiết để tham gia thử thách (độ tuổi, kỹ năng, thiết bị...)"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh minh họa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Thêm hình ảnh cho thử thách</p>
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
                Tạo thử thách
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChallengePage;