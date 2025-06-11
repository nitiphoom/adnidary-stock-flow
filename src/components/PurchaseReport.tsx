import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingDown, DollarSign, Package, Calendar } from "lucide-react";

const PurchaseReport = () => {
  const [viewType, setViewType] = useState("overview");
  const [period, setPeriod] = useState("monthly");

  // Mock purchase data
  const monthlyPurchaseData = [
    { month: "ม.ค.", quantity: 320, amount: 85000 },
    { month: "ก.พ.", quantity: 280, amount: 72000 },
    { month: "มี.ค.", quantity: 410, amount: 105000 },
    { month: "เม.ย.", quantity: 360, amount: 95000 },
    { month: "พ.ค.", quantity: 450, amount: 115000 },
    { month: "มิ.ย.", quantity: 520, amount: 135000 },
  ];

  const weeklyPurchaseData = [
    { week: "สัปดาห์ 1", quantity: 85, amount: 22000 },
    { week: "สัปดาห์ 2", quantity: 120, amount: 31000 },
    { week: "สัปดาห์ 3", quantity: 95, amount: 25000 },
    { week: "สัปดาห์ 4", quantity: 140, amount: 36000 },
  ];

  // Mock daily purchase data
  const dailyPurchaseData = [
    { day: "วันจันทร์", quantity: 65, amount: 18000 },
    { day: "วันอังคาร", quantity: 72, amount: 20000 },
    { day: "วันพุธ", quantity: 58, amount: 15500 },
    { day: "วันพฤหัสบดี", quantity: 85, amount: 23000 },
    { day: "วันศุกร์", quantity: 95, amount: 26000 },
    { day: "วันเสาร์", quantity: 110, amount: 29000 },
    { day: "วันอาทิตย์", quantity: 68, amount: 18500 },
  ];

  const branchPurchaseData = [
    { branch: "สาขา A", quantity: 850, amount: 220000 },
    { branch: "สาขา B", quantity: 680, amount: 175000 },
    { branch: "สาขา C", quantity: 520, amount: 135000 },
  ];

  const purchaserData = [
    { person: "คุณสมชาย", quantity: 420, amount: 115000 },
    { person: "คุณสมหญิง", quantity: 380, amount: 95000 },
    { person: "คุณสมศักดิ์", quantity: 320, amount: 85000 },
    { person: "คุณสมใจ", quantity: 250, amount: 68000 },
  ];

  const getCurrentData = () => {
    if (period === "daily") return dailyPurchaseData;
    if (period === "weekly") return weeklyPurchaseData;
    return monthlyPurchaseData;
  };

  const getTotalStats = () => {
    const data = getCurrentData();
    return {
      totalQuantity: data.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: data.reduce((sum, item) => sum + item.amount, 0),
      avgPerPeriod: data.reduce((sum, item) => sum + item.amount, 0) / data.length
    };
  };

  const stats = getTotalStats();

  const getDataKey = () => {
    if (period === "daily") return "day";
    if (period === "weekly") return "week";
    return "month";
  };

  const getPeriodLabel = () => {
    if (period === "daily") return "รายวัน";
    if (period === "weekly") return "รายสัปดาห์";
    return "รายเดือน";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ยอดซื้อรวม</p>
                <p className="text-3xl font-bold">฿{stats.totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100">จำนวนที่ซื้อ</p>
                <p className="text-3xl font-bold">{stats.totalQuantity.toLocaleString()}</p>
              </div>
              <Package className="h-10 w-10 text-indigo-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100">เฉลี่ยต่อเดือน</p>
                <p className="text-3xl font-bold">฿{Math.round(stats.avgPerPeriod).toLocaleString()}</p>
              </div>
              <TrendingDown className="h-10 w-10 text-teal-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            ตัวเลือกรายงาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">ประเภทรายงาน</label>
              <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">ภาพรวม</SelectItem>
                  <SelectItem value="branch">รายสาขา</SelectItem>
                  <SelectItem value="person">รายบุคคล</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {viewType === "overview" && (
              <div>
                <label className="text-sm font-medium mb-2 block">ช่วงเวลา</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">รายวัน</SelectItem>
                    <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                    <SelectItem value="monthly">รายเดือน</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      {viewType === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Purchase Amount Chart */}
          <Card className="bg-white/80 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle>ยอดซื้อ ({getPeriodLabel()})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getDataKey()} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, "ยอดซื้อ"]} />
                  <Bar dataKey="amount" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Purchase Quantity Chart */}
          <Card className="bg-white/80 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle>จำนวนที่ซื้อ ({getPeriodLabel()})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={getDataKey()} />
                  <YAxis />
                  <Tooltip formatter={(value) => [Number(value).toLocaleString(), "จำนวน"]} />
                  <Line type="monotone" dataKey="quantity" stroke="#06b6d4" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Branch Report */}
      {viewType === "branch" && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>รายงานการซื้อรายสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchPurchaseData.map((branch, index) => (
                <div key={branch.branch} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{branch.branch}</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-orange-600">
                        ฿{branch.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {branch.quantity.toLocaleString()} ชิ้น
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${(branch.amount / branchPurchaseData[0].amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Purchaser Report */}
      {viewType === "person" && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>รายงานการซื้อรายบุคคล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {purchaserData.map((person, index) => (
                <div key={person.person} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{person.person}</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-indigo-600">
                        ฿{person.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {person.quantity.toLocaleString()} ชิ้น
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${(person.amount / purchaserData[0].amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PurchaseReport;
