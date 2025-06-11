
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QrCode, Plus, Trash2, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  note: string;
}

interface Purchase {
  id: string;
  documentNumber: string;
  date: string;
  items: PurchaseItem[];
  totalAmount: number;
}

const PurchasePage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [currentPurchase, setCurrentPurchase] = useState<PurchaseItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const { toast } = useToast();

  // Mock products data
  const products = [
    { id: "1", name: "สินค้า A", sku: "SKU001" },
    { id: "2", name: "สินค้า B", sku: "SKU002" },
    { id: "3", name: "สินค้า C", sku: "SKU003" },
  ];

  const generateDocumentNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
    const timeStr = date.getTime().toString().slice(-4);
    return `PUR${dateStr}${timeStr}`;
  };

  const addItemToPurchase = () => {
    if (!selectedProduct || !quantity || !price) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลสินค้า จำนวน และราคาให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: PurchaseItem = {
      id: Date.now().toString(),
      productId: selectedProduct,
      productName: product.name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      total: parseInt(quantity) * parseFloat(price),
      note: note
    };

    setCurrentPurchase([...currentPurchase, newItem]);
    setSelectedProduct("");
    setQuantity("");
    setPrice("");
    setNote("");

    toast({
      title: "เพิ่มสินค้าสำเร็จ",
      description: `เพิ่ม ${product.name} ลงในรายการซื้อแล้ว`
    });
  };

  const removeItemFromPurchase = (itemId: string) => {
    setCurrentPurchase(currentPurchase.filter(item => item.id !== itemId));
  };

  const completePurchase = () => {
    if (currentPurchase.length === 0) {
      toast({
        title: "ไม่มีรายการสินค้า",
        description: "กรุณาเพิ่มสินค้าก่อนทำการบันทึกการซื้อ",
        variant: "destructive"
      });
      return;
    }

    const totalAmount = currentPurchase.reduce((sum, item) => sum + item.total, 0);

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      documentNumber: generateDocumentNumber(),
      date: new Date().toISOString().slice(0, 10),
      items: [...currentPurchase],
      totalAmount: totalAmount
    };

    setPurchases([newPurchase, ...purchases]);
    setCurrentPurchase([]);

    toast({
      title: "บันทึกการซื้อสำเร็จ",
      description: `บันทึกการซื้อ ${newPurchase.documentNumber} เรียบร้อยแล้ว`
    });
  };

  const totalAmount = currentPurchase.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-6">
      {/* Add Product to Purchase */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            สร้างรายการซื้อ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2">
              <Label>เลือกสินค้า</Label>
              <div className="flex gap-2">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสินค้า" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label>จำนวน</Label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label>ราคาซื้อ</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            
            <div>
              <Label>หมายเหตุ</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="หมายเหตุ (ถ้ามี)"
              />
            </div>
          </div>
          
          <Button onClick={addItemToPurchase} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มสินค้า
          </Button>
        </CardContent>
      </Card>

      {/* Current Purchase Items */}
      {currentPurchase.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>รายการสินค้าที่เลือก</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentPurchase.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x ฿{item.price.toLocaleString()} = ฿{item.total.toLocaleString()}
                    </p>
                    {item.note && <p className="text-sm text-muted-foreground">หมายเหตุ: {item.note}</p>}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItemFromPurchase(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">รวมทั้งหมด:</span>
                  <span className="text-lg font-bold text-blue-600">฿{totalAmount.toLocaleString()}</span>
                </div>
              </div>
              
              <Button onClick={completePurchase} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                บันทึกการซื้อ
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchase History */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle>ประวัติการซื้อ</CardTitle>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">ยังไม่มีประวัติการซื้อ</p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold">{purchase.documentNumber}</h4>
                      <p className="text-sm text-muted-foreground">{purchase.date}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      ฿{purchase.totalAmount.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {purchase.items.map((item) => (
                      <div key={item.id} className="text-sm flex justify-between">
                        <span>{item.productName} x {item.quantity}</span>
                        <span>฿{item.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchasePage;
