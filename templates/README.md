
# HTML Templates สำหรับระบบจัดการสินค้า

Templates เหล่านี้เป็น HTML ธรรมดาที่สามารถใช้กับ backend framework ใดก็ได้

## ไฟล์ที่รวมอยู่

1. **index.html** - หน้าหลัก (Dashboard)
2. **sales.html** - หน้าขายสินค้า
3. **products.html** - หน้าจัดการสินค้า
4. **sales-report.html** - หน้ารายงานการขาย

## Features

### หน้าหลัก (index.html)
- แสดงภาพรวมข้อมูลสำคัญ
- การ์ดสรุปยอดขาย, จำนวนสินค้า, คำสั่งซื้อ
- เมนูเข้าถึงหน้าต่างๆ

### หน้าขาย (sales.html)
- ฟอร์มเลือกสินค้าและจำนวน
- ระบบรถเข็นสินค้า
- การคำนวณส่วนลดและราคารวม
- ระบบชำระเงิน

### หน้าจัดการสินค้า (products.html)
- แสดงรายการสินค้าแบบ grid
- เพิ่ม/แก้ไข/ลบสินค้า
- ค้นหาสินค้า
- ฟอร์มข้อมูลสินค้าครบถ้วน

### หน้ารายงานการขาย (sales-report.html)
- แสดงสถิติการขายรวม
- กราฟแสดงยอดขายและจำนวนที่ขาย
- รายงานรายสาขาและรายบุคคล
- ตัวเลือกช่วงเวลา (รายวัน/สัปดาห์/เดือน)

## Dependencies

Templates ใช้ CDN สำหรับ libraries ต่างๆ:
- **Tailwind CSS** - สำหรับ styling
- **Lucide Icons** - สำหรับ icons
- **Chart.js** - สำหรับกราฟ (ใช้ในหน้ารายงาน)

## การใช้งาน

1. วาง templates ไว้ใน web server ของคุณ
2. แก้ไข JavaScript เพื่อเชื่อมต่อกับ backend API
3. ปรับแต่ง styling ตามต้องการ

## การเชื่อมต่อ Backend

### ตัวอย่างการส่งข้อมูลไป Backend (JavaScript)

```javascript
// เพิ่มสินค้า
async function addProduct(productData) {
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    });
    return response.json();
}

// บันทึกการขาย
async function saveSale(saleData) {
    const response = await fetch('/api/sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(saleData)
    });
    return response.json();
}

// ดึงข้อมูลรายงาน
async function getSalesReport(period) {
    const response = await fetch(`/api/reports/sales?period=${period}`);
    return response.json();
}
```

## การปรับแต่ง

- แก้ไข CSS classes ใน Tailwind เพื่อเปลี่ยนสี/รูปแบบ
- เพิ่ม/ลด fields ในฟอร์มตามความต้องการ
- ปรับ JavaScript functions เพื่อรองรับ API ของคุณ
- เพิ่ม validation และ error handling

## Browser Support

Templates รองรับ modern browsers ที่สนับสนุน:
- ES6+ JavaScript
- CSS Grid และ Flexbox
- Fetch API

สำหรับ legacy browsers อาจต้องเพิ่ม polyfills
