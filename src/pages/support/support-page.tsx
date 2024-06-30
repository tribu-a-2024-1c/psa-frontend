import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { ProductWithVersion, Resource, Ticket } from '@/api/types';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SupportTable } from './support-table';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [products, setProducts] = useState<ProductWithVersion[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const query = useQuery();
  const productId = query.get('productId');
  const resourceId = query.get('resourceId');
  const status = query.get('status');

  useEffect(() => {
    client.support
      .get('/tickets')
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        setTickets([]);
        console.error('Error fetching tickets:', error);
      })
      .finally(() => setIsLoading(false));

    client.support
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setProducts([]);
        console.error('Error fetching products:', error);
      });

    client.psa
      .get<Resource[]>('/772e9395-6097-4072-925d-f6a0f822320b')
      .then((response) => {
        if (Array.isArray(response?.data)) {
          const normalizedResources = response.data.map((resource) => ({
            id: resource.legajo,
            name: resource.Nombre,
            lastName: resource.Apellido,
          }));
          setResources(normalizedResources);
        } else {
          setResources([]);
        }
      })
      .catch((error) => {
        setResources([]);
        console.error('Error fetching resources:', error);
      });
  }, []);

  const handleProductChange = (value: string) => {
    navigate(`?productId=${value}`);
  };

  const handleResourceChange = (value: string) => {
    navigate(`?resourceId=${value}`);
  };

  const handleStatusChange = (value: string) => {
    navigate(`?status=${value}`);
  };

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesProduct =
      productId && productId !== 'all'
        ? ticket.productVersion.product.id.toString() === productId
        : true;
    const matchesResource =
      resourceId && resourceId !== 'all'
        ? ticket.resource?.id.toString() === resourceId
        : true;
    const matchesStatus =
      status && status !== 'all' ? ticket.status === status : true;
    return matchesProduct && matchesResource && matchesStatus;
  });

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tickets</h1>
          <div className="flex gap-2">
            <Select
              onValueChange={handleProductChange}
              defaultValue={productId || 'all'}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione un producto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Producto</SelectLabel>
                  <SelectItem value="all">Todos los productos</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name} - {product.version}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleResourceChange}
              defaultValue={resourceId || 'all'}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione un recurso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Recurso</SelectLabel>
                  <SelectItem value="all">Todos los recursos</SelectItem>
                  {resources.map((resource) => (
                    <SelectItem key={resource.id} value={String(resource.id)}>
                      {resource.name} {resource.lastName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleStatusChange}
              defaultValue={status || 'all'}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Seleccione un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estado</SelectLabel>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Abierto">Abierto</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Cerrado">Cerrado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="ml-auto h-[40px]"
              size="sm"
              onClick={() => navigate('/tickets/new')}
            >
              Crear Ticket
            </Button>
          </div>
        </div>
        {!isLoading && !filteredTickets?.length && 'No hay tickets disponibles'}
        {(isLoading || (filteredTickets && filteredTickets?.length > 0)) && (
          <SupportTable tickets={filteredTickets} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
