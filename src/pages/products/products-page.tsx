import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { ProductWithVersion } from '@/api/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ProductsTable } from './products-table';

type PageClient = {
  id: number;
  'razon social': string;
  CUIT: string;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ProductsPage() {
  const [products, setProducts] = useState<ProductWithVersion[] | null>(null);
  const [clients, setClients] = useState<PageClient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const query = useQuery();
  const clientId = query.get('clientId');

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

    client.client
      .get<PageClient[]>('/')
      .then((response) => {
        const fetchedClients = response.data;
        setClients(fetchedClients);
      })
      .catch((error) => {
        setClients([]);
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleClientChange = (value: string) => {
    navigate(`?clientId=${value}`);
  };

  const filteredProducts = products?.filter((product) =>
    clientId && clientId !== 'all'
      ? product.clients.some((client) => client.id.toString() === clientId)
      : true,
  );

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Productos</h1>
          <div className="flex gap-2">
            <Select
              onValueChange={handleClientChange}
              defaultValue={clientId || 'all'}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione un cliente" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cliente</SelectLabel>
                  <SelectItem value="all">Todos los clientes</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client['razon social']} ({client.CUIT})
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {!isLoading &&
          !filteredProducts?.length &&
          'No hay productos disponibles'}
        {(isLoading || (filteredProducts && filteredProducts?.length > 0)) && (
          <ProductsTable products={filteredProducts} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
