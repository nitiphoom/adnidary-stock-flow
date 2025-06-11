
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, DollarSign, Package, Calendar } from "lucide-react";

const SalesReport = () => {
  const [viewType, setViewType] = useState("overview");
  const [period, setPeriod] = useState("monthly");

  // Mock sales data
  const monthlySalesData = [
    { month: "ม.ค.", quantity: 450, amount: 125000 },
    { month: "ก.พ.", quantity: 380, amount: 98000 },
    { month: "มี.ค.", quantity: 520, amount: 145000 },
    { month: "เม.ย.", quantity: 490, amount: 135000 },
    { month: "พ.ค.", quantity: 610, amount: 165000 },
    { month: "มิ.ย.", quantity: 580, amount: 158000 },
  ];

  const weeklySalesData = [
    { week: "สัปดาห์ 1", quantity: 120, amount: 35000 },
    { week: "สัปดาห์ 2", quantity: 135, amount: 42000 },
    { week: "สัปดาห์ 3", quantity: 148, amount: 38000 },
    { week: "สัปดาห์ 4", quantity: 167, amount: 45000 },
  ];

  const branchData = [
    { branch: "สาขา A", quantity: 1200, amount: 350000 },
    { branch: "สาขา B", quantity: 890, amount: 245000 },
    { branch: "สาขา C", quantity: 756, amount: 198000 },
  ];

  const salesPersonData = [
    { person: "คุณสมชาย", quantity: 450, amount: 125000 },
    { person: "คุณสมหญิง", quantity: 380, amount: 98000 },
    { person: "คุณสมศักดิ์", quantity: 320, amount: 85000 },
    { person: "คุณสมใจ", quantity: 290, amount: 78000 },
  ];

  const getCurrentData = () => {
    if (period === "weekly") return weeklySalesData;
    return monthlySalesData;
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

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ยอดขายรวม</p>
                <p className="text-3xl font-bold">฿{stats.totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">จำนวนที่ขาย</p>
                <p className="text-3xl font-bold">{stats.totalQuantity.toLocaleString()}</p>
              </div>
              <Package className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">เฉลี่ยต่อเดือน</p>
                <p className="text-3xl font-bold">฿{Math.round(stats.avgPerPeriod).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-purple-200" />
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
          {/* Sales Amount Chart */}
          <Card className="bg-white/80 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle>ยอดขาย ({period === "monthly" ? "รายเดือน" : "รายสัปดาห์"})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={period === "monthly" ? "month" : "week"} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, "ยอดขาย"]} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sales Quantity Chart */}
          <Card className="bg-white/80 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle>จำนวนที่ขาย ({period === "monthly" ? "รายเดือน" : "รายสัปดาห์"})</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={period === "monthly" ? "month" : "week"} />
                  <YAxis />
                  <Tooltip formatter={(value) => [Number(value).toLocaleString(), "จำนวน"]} />
                  <Line type="monotone" dataKey="quantity" stroke="#82ca9d" strokeWidth={2} />
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
            <CardTitle>รายงานการขายรายสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchData.map((branch, index) => (
                <div key={branch.branch} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{branch.branch}</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        ฿{branch.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {branch.quantity.toLocaleString()} ชิ้น
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(branch.amount / branchData[0].amount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sales Person Report */}
      {viewType === "person" && (
        <Card className="bg-white/80 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle>รายงานการขายรายบุคคล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesPersonData.map((person, index) => (
                <div key={person.person} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{person.person}</h3>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        ฿{person.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {person.quantity.toLocaleString()} ชิ้น
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(person.amount / salesPersonData[0].amount) * 100}%` }}
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

export default SalesReport;
