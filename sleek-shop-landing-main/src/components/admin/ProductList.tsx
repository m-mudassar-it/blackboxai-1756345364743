import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Eye } from 'lucide-react';
import { ProductForm } from './ProductForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getProductsWithCategories, getProducts, deleteProduct, updateProductStatus, Product } from '@/lib/api';

interface ProductListProps {
  onUpdate: () => void;
}

export const ProductList = ({ onUpdate }: ProductListProps) => {
  const [products, setProducts] = useState<(Product & { category_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // Try to get products with categories first
      let productsData;
      try {
        productsData = await getProductsWithCategories();
      } catch (error) {
        // Fallback to regular products if categories endpoint is not available
        console.warn('Categories endpoint not available, falling back to basic products');
        const basicProducts = await getProducts();
        productsData = basicProducts.map(product => ({
          ...product,
          category_name: undefined
        }));
      }
      setProducts(productsData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: 'Product Deleted',
        description: 'Product has been deleted successfully.',
      });
      loadProducts();
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      await updateProductStatus(id, newStatus);
      toast({
        title: 'Status Updated',
        description: `Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully.`,
      });
      loadProducts();
      onUpdate();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update product status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category_name || 'No Category'}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                <TableCell>{product.quantity || 0}</TableCell>
                <TableCell>{product.total_quantity || 0}</TableCell>
                <TableCell>
                  <Badge
                    variant={product.status === 'active' ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => toggleStatus(product.id, product.status)}
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProduct(product.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{product.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteProduct(product.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No products found. Create your first product to get started.
        </div>
      )}

      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              productId={editingProduct}
              onSuccess={() => {
                setEditingProduct(null);
                loadProducts();
                onUpdate();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};