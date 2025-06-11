
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, ShoppingCart, Upload, FileText, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import ProductManagement from "@/components/ProductManagement";
import SalesPage from "@/components/SalesPage";
import DailyStockSummary from "@/components/DailyStockSummary";
import DailySalesReport from "@/components/DailySalesReport";
import PurchasePage from "@/components/PurchasePage";
import StockReport from "@/components/StockReport";
import SalesReport from "@/components/SalesReport";
import PurchaseReport from "@/components/PurchaseReport";

const Index = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Adnidary Stock
                </h1>
                <p className="text-sm text-muted-foreground">ระบบจัดการสินค้าคงคลัง</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6 bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-2">
            <TabsTrigger value="products" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <Package className="h-4 w-4" />
              <span className="text-xs">ข้อมูลสินค้า</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-xs">ขาย</span>
            </TabsTrigger>
            <TabsTrigger value="daily-stock" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <Upload className="h-4 w-4" />
              <span className="text-xs">สต๊อกรายวัน</span>
            </TabsTrigger>
            <TabsTrigger value="daily-sales" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <FileText className="h-4 w-4" />
              <span className="text-xs">ขายรายวัน</span>
            </TabsTrigger>
            <TabsTrigger value="purchase" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">ซื้อ</span>
            </TabsTrigger>
            <TabsTrigger value="stock-report" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">รายงานสต๊อก</span>
            </TabsTrigger>
            <TabsTrigger value="sales-report" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">รายงานขาย</span>
            </TabsTrigger>
            <TabsTrigger value="purchase-report" className="flex flex-col items-center gap-1 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg">
              <TrendingDown className="h-4 w-4" />
              <span className="text-xs">รายงานซื้อ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          <TabsContent value="sales">
            <SalesPage />
          </TabsContent>
          
          <TabsContent value="daily-stock">
            <DailyStockSummary />
          </TabsContent>
          
          <TabsContent value="daily-sales">
            <DailySalesReport />
          </TabsContent>
          
          <TabsContent value="purchase">
            <PurchasePage />
          </TabsContent>
          
          <TabsContent value="stock-report">
            <StockReport />
          </TabsContent>
          
          <TabsContent value="sales-report">
            <SalesReport />
          </TabsContent>
          
          <TabsContent value="purchase-report">
            <PurchaseReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
