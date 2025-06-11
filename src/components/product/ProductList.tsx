
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  searchTerm: string;
  onEditProduct?: (product: Product) => void;
}

const ProductList = ({ products, searchTerm, onEditProduct }: ProductListProps) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-md border-white/20">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            {searchTerm ? "ไม่พบสินค้าที่ค้นหา" : "ยังไม่มีสินค้าในระบบ"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEditProduct}
        />
      ))}
    </div>
  );
};

export default ProductList;
