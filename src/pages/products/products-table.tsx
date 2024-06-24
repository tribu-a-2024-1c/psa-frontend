import { Link } from 'react-router-dom';

import type { ProductWithVersion } from '@/api/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { TABLE_COLUMNS } from './constants';

export function ProductsTable({
  products,
  isLoading,
}: {
  products: ProductWithVersion[] | null | undefined;
  isLoading: boolean;
}) {
  const sortedProducts = products
    ? [...products].sort((a, b) => {
        const idA = typeof a.id === 'number' ? a.id : parseInt(a.id, 10);
        const idB = typeof b.id === 'number' ? b.id : parseInt(b.id, 10);
        return idB - idA;
      })
    : [];

  return (
    <div className="rounded-lg border bg-gray-100 shadow-sm dark:bg-gray-950">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <TableRow key={index}>
                    {TABLE_COLUMNS.map((_, idx) => (
                      <TableCell key={idx}>
                        <div className="h-6 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="h-6 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                    </TableCell>
                  </TableRow>
                ))
            : sortedProducts?.map((product: ProductWithVersion) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">{product.id}</TableCell>
                  <TableCell className="text-center">{product.name}</TableCell>
                  <TableCell className="text-center">
                    {product.version}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-center">
                    {product.clients.map((client) => (
                      <div key={client.id}>
                        {client.razonSocial} ({client.cuit})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      to={`/tickets?productId=${product.id}`}
                      className="underline"
                    >
                      Ver tickets asociados
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
