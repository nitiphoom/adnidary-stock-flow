
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Plus, Search, Edit, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  minStock: number;
  currentStock: number;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    unit: "",
    price: "",
    minStock: ""
  });

  const categories = ["อาหาร", "เครื่องดื่ม", "ของใช้", "เครื่องสำอาง", "อื่นๆ"];
  const units = ["ชิ้น", "กิโลกรัม", "ลิตร", "แพ็ค", "กล่อง"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.sku || !formData.name || !formData.category) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      sku: formData.sku,
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      price: parseFloat(formData.price) || 0,
      minStock: parseInt(formData.minStock) || 0,
      currentStock: 0
    };

    setProducts([...products, newProduct]);
    setFormData({
      sku: "",
      name: "",
      category: "",
      unit: "",
      price: "",
      minStock: ""
    });
    setIsFormVisible(false);
    
    toast({
      title: "เพิ่มสินค้าสำเร็จ",
      description: `เพิ่มสินค้า ${newProduct.name} เรียบร้อยแล้ว`
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="ค้นหาสินค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-md border-white/20"
          />
        </div>
        <Button
          onClick={() => setIsFormVisible(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มสินค้า
        </Button>
      </div>

      {/* Add Product Form */}
      {isFormVisible && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              เพิ่มสินค้าใหม่
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">รหัสสินค้า (SKU)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      placeholder="ป้อนรหัสสินค้า"
                      required
                    />
                    <Button type="button" variant="outline" size="icon">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อสินค้า</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ป้อนชื่อสินค้า"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
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
                  <Label htmlFor="unit">หน่วยนับ</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหน่วยนับ" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">ราคาขาย</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minStock">จำนวนขั้นต่ำ</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormVisible(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  บันทึก
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">หมวดหมู่:</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">หน่วย:</span>
                  <span className="text-sm font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ราคา:</span>
                  <span className="text-sm font-medium text-green-600">
                    ฿{product.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">สต๊อกปัจจุบัน:</span>
                  <Badge variant={product.currentStock <= product.minStock ? "destructive" : "default"}>
                    {product.currentStock} {product.unit}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              {searchTerm ? "ไม่พบสินค้าที่ค้นหา" : "ยังไม่มีสินค้าในระบบ"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductManagement;
