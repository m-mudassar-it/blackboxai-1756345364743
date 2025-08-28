import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import { createProduct, updateProduct, getProduct, getCategories, prepareProductFormData, Category, ProductImage } from '@/lib/api';
import { ASSETS_BASE_URL } from '@/lib/config';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  discount: z.number().min(0).max(100).optional(),
  category_id: z.string().optional(),
  sku: z.string().min(1, 'SKU is required'),
  quantity: z.number().min(0).optional(),
  items_per_pack: z.number().min(1).optional(),
  tags: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSuccess: () => void;
  productId?: string;
}

export const ProductForm = ({ onSuccess, productId }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('no-category');
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: 'active',
      discount: 0,
      quantity: 0,
      items_per_pack: 1,
      category_id: 'no-category',
    },
  });

  useEffect(() => {
    loadCategories();
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadProduct = async () => {
    if (!productId) return;
    
    try {
      const product = await getProduct(productId);
      
      // Load categories first if not already loaded
      if (categories.length === 0) {
        await loadCategories();
      }
      
      const categoryId = product.category_id || 'no-category';
      setSelectedCategory(categoryId);
      
      // Load existing images
      if (product.images) {
        setExistingImages(product.images);
      }
      
      reset({
        title: product.title,
        description: product.description || '',
        price: parseFloat(product.price),
        discount: product.discount ? parseFloat(product.discount) : 0,
        category_id: categoryId,
        sku: product.sku,
        quantity: product.quantity || 0,
        items_per_pack: product.items_per_pack || 1,
        tags: product.tags || '',
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        meta_keywords: product.meta_keywords || '',
        status: product.status as 'active' | 'inactive',
      });
    } catch (error) {
      console.error('Error loading product:', error);
      toast({
        title: 'Error',
        description: 'Failed to load product details',
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = async (files: FileList, isPrimary: boolean = false) => {
    setUploadingImage(true);
    
    try {
      const fileArray = Array.from(files);
      
      // Validate file types
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload only JPEG, PNG, or WebP images.',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate file size (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = fileArray.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        toast({
          title: 'File Too Large',
          description: 'Please upload images smaller than 5MB each.',
          variant: 'destructive',
        });
        return;
      }
      
      if (isPrimary) {
        setPrimaryImage(fileArray[0]);
        // Create preview for primary image
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview([e.target?.result as string]);
        };
        reader.readAsDataURL(fileArray[0]);
      } else {
        setAdditionalImages(prev => [...prev, ...fileArray]);
        // Create previews for additional images
        fileArray.forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview(prev => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        });
      }
      
      toast({
        title: 'Images Uploaded',
        description: `${fileArray.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Upload Error',
        description: 'Failed to upload images. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number, isPrimary: boolean = false) => {
    if (isPrimary) {
      setPrimaryImage(null);
      setImagePreview([]);
    } else {
      setAdditionalImages(prev => prev.filter((_, i) => i !== index));
      setImagePreview(prev => prev.filter((_, i) => i !== index + 1));
    }
  };

  const getCategoryName = (categoryId: string) => {
    if (!categoryId || categoryId === 'no-category') return 'No Category';
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const removeExistingImage = (imageId: string) => {
    setRemovedImages(prev => [...prev, imageId]);
    setExistingImages(prev => prev.filter(img => img.id !== imageId));
  };

  const getImageUrl = (imageUrl: string) => {
    // Construct full URL for images served from nodeassets
    return `${ASSETS_BASE_URL}/${imageUrl}`;
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
                     const formData = prepareProductFormData({
        title: data.title,
          sku: data.sku,
        price: data.price,
          description: data.description,
          category_id: data.category_id === 'no-category' ? undefined : data.category_id,
          discount: data.discount,
          quantity: data.quantity,
          items_per_pack: data.items_per_pack,
          total_quantity: (data.quantity || 0) * (data.items_per_pack || 1),
          tags: data.tags,
          meta_title: data.meta_title,
          meta_description: data.meta_description,
          meta_keywords: data.meta_keywords,
          status: data.status,
          primaryImage: primaryImage || undefined,
          additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
          existingImages: existingImages.map(img => img.id),
          removedImages: removedImages,
        });

      let result;
      if (productId) {
        result = await updateProduct(productId, formData);
      } else {
        result = await createProduct(formData);
      }

      toast({
        title: productId ? 'Product Updated' : 'Product Created',
        description: `Product has been ${productId ? 'updated' : 'created'} successfully.`,
      });

      if (!productId) {
        reset();
        setSelectedCategory('no-category');
        setPrimaryImage(null);
        setAdditionalImages([]);
        setImagePreview([]);
        setExistingImages([]);
        setRemovedImages([]);
      }
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Enter product title"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="Enter SKU"
          />
          {errors.sku && (
            <p className="text-sm text-destructive">{errors.sku.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            {...register('discount', { valueAsNumber: true })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="category">Category</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={loadCategories}
              disabled={loadingCategories}
              className="h-6 px-2 text-xs"
            >
              {loadingCategories ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Refresh'
              )}
            </Button>
          </div>
                     <Select onValueChange={(value) => {
             setSelectedCategory(value);
             setValue('category_id', value);
           }} value={selectedCategory}>
             <SelectTrigger disabled={loadingCategories}>
               <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select a category"}>
                 {selectedCategory === 'no-category' ? 'No Category' : 
                  selectedCategory && selectedCategory !== 'no-category' ? getCategoryName(selectedCategory) : 
                  'Select a category'}
               </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {loadingCategories ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm">Loading categories...</span>
                </div>
              ) : categories.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No categories available. Please create categories first.
                </div>
              ) : (
                                 <>
                   <SelectItem value="no-category">No Category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
                 </>
              )}
            </SelectContent>
          </Select>
          {categories.length === 0 && !loadingCategories && (
            <p className="text-sm text-muted-foreground">
              No categories found. You can still create a product without a category.
            </p>
          )}
        </div>

        <div className="space-y-2">
           <Label htmlFor="quantity">Quantity</Label>
          <Input
             id="quantity"
            type="number"
            min="0"
             {...register('quantity', { valueAsNumber: true })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
           <Label htmlFor="items_per_pack">Items per Pack</Label>
           <Input
             id="items_per_pack"
             type="number"
             min="1"
             {...register('items_per_pack', { valueAsNumber: true })}
             placeholder="1"
           />
         </div>

         <div className="space-y-2">
           <Label htmlFor="total_quantity">Total Quantity</Label>
           <Input
             id="total_quantity"
             type="number"
             disabled
             value={(() => {
               const quantity = watch('quantity') || 0;
               const itemsPerPack = watch('items_per_pack') || 1;
               return quantity * itemsPerPack;
             })()}
             placeholder="0"
           />
           <p className="text-xs text-muted-foreground">
             Auto-calculated: Quantity × Items per Pack
           </p>
         </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value: 'active' | 'inactive') => setValue('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Enter product description"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
          <Input
          id="tags"
          {...register('tags')}
          placeholder="Enter tags separated by commas"
        />
      </div>

            {/* Primary Image Upload */}
      <div className="space-y-4">
        <Label>Primary Image *</Label>
        
        {/* Existing Primary Images */}
        {existingImages.filter(img => img.is_primary).length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Existing Primary Images:</p>
            <div className="flex flex-wrap gap-4">
              {existingImages
                .filter(img => img.is_primary)
                .map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={getImageUrl(image.image_url)}
                      alt="Primary"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* New Primary Image Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleImageUpload(e.target.files, true)}
            className="hidden"
            id="primary-image"
            disabled={uploadingImage}
          />
          <label htmlFor="primary-image" className={`cursor-pointer ${uploadingImage ? 'opacity-50' : ''}`}>
            {uploadingImage ? (
              <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <p className="mt-2 text-sm text-gray-600">
              {uploadingImage ? 'Uploading...' : 'Click to upload new primary image'}
            </p>
          </label>
        </div>
        {primaryImage && (
          <div className="relative inline-block">
            <img
              src={imagePreview[0]}
              alt="New Primary"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(0, true)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Additional Images Upload */}
      <div className="space-y-4">
        <Label>Additional Images</Label>
        
        {/* Existing Additional Images */}
        {existingImages.filter(img => !img.is_primary).length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Existing Additional Images:</p>
            <div className="flex flex-wrap gap-4">
              {existingImages
                .filter(img => !img.is_primary)
                .map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={getImageUrl(image.image_url)}
                      alt="Additional"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
              <button
                type="button"
                      onClick={() => removeExistingImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                      <X className="h-4 w-4" />
              </button>
                  </div>
          ))}
        </div>
      </div>
        )}
        
        {/* New Additional Images Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => e.target.files && handleImageUpload(e.target.files, false)}
            className="hidden"
            id="additional-images"
            disabled={uploadingImage}
          />
          <label htmlFor="additional-images" className={`cursor-pointer ${uploadingImage ? 'opacity-50' : ''}`}>
            {uploadingImage ? (
              <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            ) : (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <p className="mt-2 text-sm text-gray-600">
              {uploadingImage ? 'Uploading...' : 'Click to upload new additional images'}
            </p>
          </label>
        </div>
        <div className="flex flex-wrap gap-4">
          {additionalImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={imagePreview[index + 1]}
                alt={`New Additional ${index + 1}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index, false)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SEO Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="meta_title">SEO Title</Label>
          <Input
            id="meta_title"
            {...register('meta_title')}
            placeholder="SEO optimized title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">SEO Description</Label>
          <Textarea
            id="meta_description"
            {...register('meta_description')}
            placeholder="SEO meta description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_keywords">SEO Keywords</Label>
            <Input
            id="meta_keywords"
            {...register('meta_keywords')}
            placeholder="Enter keywords separated by commas"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {productId ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
};