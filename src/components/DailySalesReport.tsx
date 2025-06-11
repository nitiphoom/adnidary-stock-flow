
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, Check, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DailySalesItem {
  id: string;
  order: number;
  sku: string;
  productName: string;
  quantity: number;
  deliveryDate: string;
  orderNumber: string;
  trackingNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string;
}

const DailySalesReport = () => {
  const [salesData, setSalesData] = useState<DailySalesItem[]>([]);
  const [isUploaded, setIsUploaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockSalesData: DailySalesItem[] = [
    {
      id: "1",
      order: 1,
      sku: "SKU001",
      productName: "สินค้า A",
      quantity: 2,
      deliveryDate: "2024-01-15",
      orderNumber: "ORD001",
      trackingNumber: "TH123456789",
      customerName: "คุณสมชาย",
      customerPhone: "081-234-5678",
      customerAddress: "123 ถนนสุขุมวิท กรุงเทพฯ 10110",
      note: "ส่งด่วน"
    },
    {
      id: "2",
      order: 2,
      sku: "SKU002",
      productName: "สินค้า B",
      quantity: 1,
      deliveryDate: "2024-01-15",
      orderNumber: "ORD002",
      trackingNumber: "TH987654321",
      customerName: "คุณสมหญิง",
      customerPhone: "082-345-6789",
      customerAddress: "456 ถนนพหลโยธิน กรุงเทพฯ 10400",
      note: ""
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      setTimeout(() => {
        setSalesData(mockSalesData);
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
      description: "บันทึกข้อมูลการขายรายวันแล้ว"
    });
  };

  const updateSalesItem = (id: string, field: keyof DailySalesItem, value: string | number) => {
    setSalesData(salesData.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deleteSalesItem = (id: string) => {
    setSalesData(salesData.filter(item => item.id !== id));
    toast({
      title: "ลบรายการสำเร็จ",
      description: "ลบรายการขายแล้ว"
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            อัปโหลดข้อมูลการขายรายวัน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <Label htmlFor="sales-file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium text-primary hover:underline">
                    คลิกเพื่อเลือกไฟล์ Excel
                  </span>
                  <Input
                    id="sales-file-upload"
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
      {salesData.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>ตรวจสอบข้อมูลหลังอัปโหลด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">ลำดับ</TableHead>
                    <TableHead>รหัสสินค้า</TableHead>
                    <TableHead>ชื่อสินค้า</TableHead>
                    <TableHead>จำนวน</TableHead>
                    <TableHead>วันที่ส่ง</TableHead>
                    <TableHead>เลขออเดอร์</TableHead>
                    <TableHead>เลขพัสดุ</TableHead>
                    <TableHead>ชื่อผู้รับ</TableHead>
                    <TableHead>เบอร์ผู้รับ</TableHead>
                    <TableHead>ที่อยู่ผู้รับ</TableHead>
                    <TableHead>หมายเหตุ</TableHead>
                    <TableHead className="w-20">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.sku}
                            onChange={(e) => updateSalesItem(item.id, "sku", e.target.value)}
                            className="h-8 w-20"
                          />
                        ) : (
                          item.sku
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.productName}
                            onChange={(e) => updateSalesItem(item.id, "productName", e.target.value)}
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
                            onChange={(e) => updateSalesItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                            className="h-8 w-16"
                          />
                        ) : (
                          item.quantity
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            type="date"
                            value={item.deliveryDate}
                            onChange={(e) => updateSalesItem(item.id, "deliveryDate", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.deliveryDate
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.orderNumber}
                            onChange={(e) => updateSalesItem(item.id, "orderNumber", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.orderNumber
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.trackingNumber}
                            onChange={(e) => updateSalesItem(item.id, "trackingNumber", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.trackingNumber
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.customerName}
                            onChange={(e) => updateSalesItem(item.id, "customerName", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.customerName
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.customerPhone}
                            onChange={(e) => updateSalesItem(item.id, "customerPhone", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          item.customerPhone
                        )}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {editingId === item.id ? (
                          <Input
                            value={item.customerAddress}
                            onChange={(e) => updateSalesItem(item.id, "customerAddress", e.target.value)}
                            className="h-8"
                          />
                        ) : (
                          <div className="truncate" title={item.customerAddress}>
                            {item.customerAddress}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item.id ? (
                          <Input
                            value={item.note}
                            onChange={(e) => updateSalesItem(item.id, "note", e.target.value)}
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
                            onClick={() => deleteSalesItem(item.id)}
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

export default DailySalesReport;
