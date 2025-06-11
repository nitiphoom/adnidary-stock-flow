
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Product } from "@/types/product";
import ProductForm from "./product/ProductForm";
import ProductList from "./product/ProductList";

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    setIsFormVisible(false);
  };

  const handleEditProduct = (product: Product) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", product);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="ค้นหาสินค้า..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-md border-white/20"
          />
        </div>
        <Button
          onClick={() => setIsFormVisible(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มสินค้า
        </Button>
      </div>

      {/* Add Product Form */}
      {isFormVisible && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {/* Products List */}
      <ProductList
        products={products}
        searchTerm={searchTerm}
        onEditProduct={handleEditProduct}
      />
    </div>
  );
};

export default ProductManagement;
