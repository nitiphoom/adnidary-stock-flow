
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product, ProductFormData, CATEGORIES, UNITS } from "@/types/product";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "",
    name: "",
    category: "",
    unit: "",
    price: "",
    minStock: ""
  });

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

    onSubmit(newProduct);
    setFormData({
      sku: "",
      name: "",
      category: "",
      unit: "",
      price: "",
      minStock: ""
    });
    
    toast({
      title: "เพิ่มสินค้าสำเร็จ",
      description: `เพิ่มสินค้า ${newProduct.name} เรียบร้อยแล้ว`
    });
  };

  return (
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
                  {CATEGORIES.map((category) => (
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
                  {UNITS.map((unit) => (
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
              onClick={onCancel}
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
  );
};

export default ProductForm;
