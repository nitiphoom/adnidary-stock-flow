
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Check, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockItem {
  id: string;
  order: number;
  sku: string;
  productName: string;
  quantity: number;
  note: string;
}

const DailyStockSummary = () => {
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockStockData: StockItem[] = [
    { id: "1", order: 1, sku: "SKU001", productName: "สินค้า A", quantity: 100, note: "สินค้าใหม่" },
    { id: "2", order: 2, sku: "SKU002", productName: "สินค้า B", quantity: 50, note: "" },
    { id: "3", order: 3, sku: "SKU003", productName: "สินค้า C", quantity: 75, note: "ตรวจนับซ้ำ" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      setTimeout(() => {
        setStockData(mockStockData);
        setIsUploaded(true);
        toast({
          title: "อัปโหลดสำเร็จ",
          description: `ประมวลผลไฟล์ ${file.name} เรียบร้อยแล้ว`
        });
      }, 1000);
    }
  };

  const confirmUpload = () => {
    toast({
      title: "ยืนยันข้อมูลสำเร็จ",
      description: "บันทึกข้อมูลสินค้าคงเหลือรายวันแล้ว"
    });
  };

  const updateStockItem = (id: string, field: keyof StockItem, value: string | number) => {
    setStockData(stockData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteStockItem = (id: string) => {
    setStockData(stockData.filter(item => item.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "ลบรายการสินค้าแล้ว"
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            อัปโหลดข้อมูลสินค้าคงเหลือรายวัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-primary hover:underline">
                    คลิกเพื่อเลือกไฟล์ Excel
                  </span>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  รองรับไฟล์ .xlsx, .xls, .csv
                </p>
              </div>
            </div>
            
            {isUploaded && (
              <div className="flex justify-center">
                <Button 
                  onClick={confirmUpload}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Check className="h-4 w-4 mr-2" />
                  ยืนยันข้อมูล
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Review Section */}
      {stockData.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>ตรวจสอบข้อมูลหลังอัปโหลด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">ลำดับ</TableHead>
                    <TableHead>รหัสสินค้า (SKU)</TableHead>
                    <TableHead>ชื่อสินค้า</TableHead>
                    <TableHead className="w-24">จำนวน</TableHead>
                    <TableHead>หมายเหตุ</TableHead>
                    <TableHead className="w-24">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.sku}
                            onChange={(e) => updateStockItem(item.id, "sku", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.sku
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.productName}
                            onChange={(e) => updateStockItem(item.id, "productName", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.productName
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateStockItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                            className="h-8"
                          />
                        ) : (
                          item.quantity.toLocaleString()
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.note}
                            onChange={(e) => updateStockItem(item.id, "note", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.note
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {editingId === item.id ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(item.id)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteStockItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyStockSummary;
