
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
          </div>
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
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
  );
};

export default ProductCard;
