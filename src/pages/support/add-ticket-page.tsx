import { useEffect, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import {
  type Client,
  Priority,
  type ProductWithVersion,
  type Task,
} from '@/api/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
}

function FormTextarea({ id, label, placeholder, control }: FormTextareaProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Textarea
            {...field}
            id={id}
            placeholder={placeholder}
            className="min-h-[100px]"
          />
        )}
      />
    </div>
  );
}

interface FormSelectProps {
  id: string;
  label: string;
  options: string[];
  control: Control<FieldValues>;
  onChange?: (value: string) => void;
}

function FormSelect({
  id,
  label,
  options,
  control,
  onChange,
}: FormSelectProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            onValueChange={(value) => {
              field.onChange(value);
              onChange && onChange(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

interface FormItemProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  control: Control<FieldValues>;
}

function FormItem({
  id,
  label,
  placeholder,
  type = 'text',
  control,
}: FormItemProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input {...field} id={id} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
}

export function AddTicketPage() {
  const [products, setProducts] = useState<ProductWithVersion[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProductClients, setSelectedProductClients] = useState<
    Client[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    client.support
      .get<ProductWithVersion[]>('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setProducts([]);
        console.error('Error fetching products:', error);
      })
      .finally(() => setIsLoading(false));

    client.projects
      .get<Task[]>('/projects/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        setTasks([]);
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const fetchClients = (selectedProduct: string) => {
    const [name, version] = selectedProduct.split(' - ');
    const product = products.find(
      (p) => p.name === name && p.version === version,
    );
    setSelectedProductClients(product ? product.clients : []);
  };

  const createTicket = (payload: any) => {
    client.support
      .post('/tickets', { ...payload })
      .then(() => {
        navigate('/tickets');
      })
      .catch((error) => {
        console.error('Error creating ticket:', error);
      });
  };

  const onSubmit = (data: FieldValues) => {
    createTicket(data);
  };

  const productOptions = products.map(
    (product) => `${product.name} - ${product.version}`,
  );

  const taskOptions = tasks.map((task) => ({
    label: task.title,
    value: task.id.toString(),
  }));

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Crear Ticket Nuevo</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormItem
            id="title"
            label="Título"
            placeholder="Ingrese título del ticket"
            control={control}
          />
          <FormTextarea
            id="description"
            label="Descripción"
            placeholder="Ingrese descripción del ticket"
            control={control}
          />
          <FormItem
            id="startDate"
            label="Fecha de Inicio"
            type="date"
            placeholder="Ingrese fecha de inicio"
            control={control}
          />
          <FormItem
            id="endDate"
            label="Fecha de Finalización"
            type="date"
            placeholder="Ingrese fecha de finalización"
            control={control}
          />
          <FormSelect
            id="productVersion"
            label="Producto y Versión"
            options={productOptions}
            control={control}
            onChange={fetchClients}
          />
          {selectedProductClients.length > 0 && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Clientes Asociados</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProductClients.length > 0 ? (
                  selectedProductClients.map((client) => (
                    <div key={client.id}>
                      <p>{client.razonSocial}</p>
                    </div>
                  ))
                ) : (
                  <p>No hay clientes asociados</p>
                )}
              </CardContent>
            </Card>
          )}
          <div className="grid gap-2">
            <Label htmlFor="taskIds">Tareas</Label>
            <Controller
              name="taskIds"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  defaultValue={field.value || []}
                  options={taskOptions}
                  onValueChange={(values) =>
                    field.onChange(values.map((v) => v))
                  }
                  placeholder="Seleccionar tareas"
                />
              )}
            />
          </div>
          <FormSelect
            id="severity"
            label="Severidad"
            options={['Baja', 'Media', 'Alta']}
            control={control}
          />
          <FormSelect
            id="status"
            label="Estado"
            options={['Abierto', 'En Progreso', 'Cerrado']}
            control={control}
          />
          <FormSelect
            id="type"
            label="Tipo"
            options={['ERROR', 'CONSULTA']}
            control={control}
          />
          <FormSelect
            id="priority"
            label="Prioridad"
            options={Object.values(Priority)}
            control={control}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => navigate('/tickets')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
