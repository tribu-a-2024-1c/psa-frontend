import { useEffect, useState } from 'react';

import { client } from '@/api/common/client';
import type { ProductWithVersion } from '@/api/types';

import { ProductsTable } from './products-table';

export function ProductsPage() {
  const [products, setProducts] = useState<ProductWithVersion[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client.support
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setProducts([]);
        console.error('Error fetching products:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Productos</h1>
        </div>
        {!isLoading && !products?.length && 'No hay productos disponibles'}
        {(isLoading || (products && products?.length > 0)) && (
          <ProductsTable products={products} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
