
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, Filter } from "lucide-react";

interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  lastUpdated: string;
}

const StockReport = () => {
  const [sortBy, setSortBy] = useState("stock-desc");
  const [filterBy, setFilterBy] = useState("all");

  // Mock stock data
  const stockData: StockItem[] = [
    {
      id: "1",
      sku: "SKU001",
      name: "สินค้า A",
      category: "อาหาร",
      currentStock: 150,
      minStock: 50,
      unit: "ชิ้น",
      lastUpdated: "2024-01-15"
    },
    {
      id: "2",
      sku: "SKU002",
      name: "สินค้า B",
      category: "เครื่องดื่ม",
      currentStock: 25,
      minStock: 30,
      unit: "ลิตร",
      lastUpdated: "2024-01-15"
    },
    {
      id: "3",
      sku: "SKU003",
      name: "สินค้า C",
      category: "ของใช้",
      currentStock: 75,
      minStock: 20,
      unit: "แพ็ค",
      lastUpdated: "2024-01-14"
    },
    {
      id: "4",
      sku: "SKU004",
      name: "สินค้า D",
      category: "เครื่องสำอาง",
      currentStock: 5,
      minStock: 10,
      unit: "กล่อง",
      lastUpdated: "2024-01-13"
    }
  ];

  const getFilteredData = () => {
    let filtered = [...stockData];
    
    // Apply filter
    if (filterBy === "low-stock") {
      filtered = filtered.filter(item => item.currentStock <= item.minStock);
    } else if (filterBy === "normal-stock") {
      filtered = filtered.filter(item => item.currentStock > item.minStock);
    }
    
    // Apply sorting
    if (sortBy === "stock-desc") {
      filtered.sort((a, b) => b.currentStock - a.currentStock);
    } else if (sortBy === "stock-asc") {
      filtered.sort((a, b) => a.currentStock - b.currentStock);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();
  const lowStockCount = stockData.filter(item => item.currentStock <= item.minStock).length;
  const totalStock = stockData.reduce((sum, item) => sum + item.currentStock, 0);

  const getStockStatus = (item: StockItem) => {
    if (item.currentStock <= item.minStock) {
      return { status: "low", color: "destructive", icon: <AlertTriangle className="h-4 w-4" /> };
    }
    return { status: "normal", color: "default", icon: null };
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">สินค้าทั้งหมด</p>
                <p className="text-3xl font-bold">{stockData.length}</p>
              </div>
              <Package className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">สต๊อกรวม</p>
                <p className="text-3xl font-bold">{totalStock.toLocaleString()}</p>
              </div>
              <Package className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">สินค้าใกล้หมด</p>
                <p className="text-3xl font-bold">{lowStockCount}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ตัวกรองและการเรียงลำดับ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">เรียงลำดับตาม</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock-desc">สต๊อกมากไปน้อย</SelectItem>
                  <SelectItem value="stock-asc">สต๊อกน้อยไปมาก</SelectItem>
                  <SelectItem value="name">ชื่อสินค้า</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">กรองตามสถานะ</label>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="low-stock">สินค้าใกล้หมด</SelectItem>
                  <SelectItem value="normal-stock">สินค้าปกติ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock List */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle>รายงานสินค้าคงเหลือ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item) => {
              const stockStatus = getStockStatus(item);
              return (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge variant={stockStatus.color as any} className="flex items-center gap-1">
                          {stockStatus.icon}
                          {stockStatus.status === "low" ? "ใกล้หมด" : "ปกติ"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku} | หมวดหมู่: {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        {item.currentStock.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.unit}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">สต๊อกปัจจุบัน:</span>
                      <p className="font-medium">{item.currentStock} {item.unit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">สต๊อกขั้นต่ำ:</span>
                      <p className="font-medium">{item.minStock} {item.unit}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">อัปเดตล่าสุด:</span>
                      <p className="font-medium">{item.lastUpdated}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">สถานะ:</span>
                      <p className={`font-medium ${stockStatus.status === "low" ? "text-red-600" : "text-green-600"}`}>
                        {stockStatus.status === "low" ? "ต้องเติมสต๊อก" : "เพียงพอ"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockReport;
