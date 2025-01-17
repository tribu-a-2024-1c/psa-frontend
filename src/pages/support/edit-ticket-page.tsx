import moment from 'moment';
import React, { useEffect, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from '@/api/common/client';
import {
  type Client,
  type CreateTicketPayload,
  Priority,
  type ProductWithVersion,
  type Resource,
  type Task,
  type Ticket,
  TicketType,
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
        defaultValue=""
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
  options: { label: string; value: string }[];
  control: Control<FieldValues>;
  onChange?: (value: string) => void;
}

const FormSelect = React.forwardRef<HTMLDivElement, FormSelectProps>(
  ({ id, label, options, control, onChange }) => {
    return (
      <div className="grid gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Controller
          name={id}
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={(value) => {
                field.onChange(value);
                onChange && onChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={`Seleccionar ${label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    );
  },
);

FormSelect.displayName = 'FormSelect';

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
        defaultValue=""
        render={({ field }) => (
          <Input {...field} id={id} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
}

export function EditTicketPage() {
  const [products, setProducts] = useState<ProductWithVersion[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedProductClients, setSelectedProductClients] = useState<
    Client[]
  >([]);
  const [selectedProductVersionId, setSelectedProductVersionId] = useState<
    number | null
  >(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado de carga del botón
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId?: string }>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      type: '',
      severity: '',
      priority: '',
      productVersion: '',
      resourceId: '',
      taskIds: [] as number[], // Set default value type to number[]
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse =
          await client.support.get<ProductWithVersion[]>('/products');
        setProducts(productResponse.data);

        const taskResponse =
          await client.projects.get<Task[]>('/projects/tasks');
        setTasks(taskResponse.data);

        const resourceResponse = await client.psa.get<Resource[]>('/');
        setResources(
          Array.isArray(resourceResponse?.data) ? resourceResponse.data : [],
        );

        if (ticketId) {
          const ticketResponse = await client.support.get<Ticket>(
            `/tickets/${ticketId}`,
          );
          const ticket = ticketResponse.data;

          setValue('title', ticket.title);
          setValue('description', ticket.description);
          setValue(
            'startDate',
            moment.utc(ticket.startDate).format('YYYY-MM-DD'),
          );
          setValue('endDate', moment.utc(ticket.endDate).format('YYYY-MM-DD'));
          setValue('status', ticket.status);
          setValue('type', ticket.type);
          setValue('severity', ticket.severity);
          setValue('priority', ticket.priority || '');
          const productVersionLabel = `${ticket.productVersion.product.name} - ${ticket.productVersion.version}`;
          setValue('productVersion', productVersionLabel);
          setSelectedProductVersionId(ticket.productVersion.id);

          if (ticket.productVersion.product.clients) {
            setSelectedProductClients(ticket.productVersion.product.clients);
          }

          if (ticket.resource) {
            setValue(
              'resourceId',
              `${ticket.resource.name} ${ticket.resource.lastName}`,
            );
            setSelectedResource(ticket.resource);
          }

          if (ticket.tasks && ticket.tasks.length > 0) {
            setValue(
              'taskIds',
              ticket.tasks.map((task) => task.id),
            );
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId, setValue]);

  const fetchClients = (selectedProduct: string) => {
    const [name, version] = selectedProduct.split(' - ');
    const product = products.find(
      (p) => p.name === name && p.version === version,
    );
    if (product && product.clients) {
      setSelectedProductClients(product.clients);
      setSelectedProductVersionId(product.id);
    } else {
      setSelectedProductClients([]);
      setSelectedProductVersionId(null);
    }
  };

  const editTicket = (payload: CreateTicketPayload) => {
    client.support
      .put(`/tickets/${ticketId}/updateTicket`, payload)
      .then(() => {
        if (selectedResource) {
          return client.support.post(`/tickets/${ticketId}/resource`, {
            legajo: selectedResource.legajo!,
            nombre: selectedResource.Nombre!,
            apellido: selectedResource.Apellido!,
          });
        }
      })
      .then((response) => {
        if (response) {
          console.log('Resource assigned:', response.data);
        }
        navigate('/tickets');
      })
      .catch((error) => {
        console.error('Error editing or assigning resource to ticket:', error);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the state after submission is done
      });
  };

  const onSubmit = (data: FieldValues) => {
    const { taskIds, resourceId, ...rest } = data as CreateTicketPayload;

    const numericTaskIds = taskIds?.map(Number);

    if (selectedProductVersionId !== null) {
      const payload: CreateTicketPayload = {
        ...rest,
        taskIds: numericTaskIds,
        productVersionId: selectedProductVersionId,
        resource: selectedResource
          ? {
              legajo: selectedResource.legajo!,
              nombre: selectedResource.Nombre!,
              apellido: selectedResource.Apellido!,
            }
          : undefined,
      };

      if (resourceId) {
        const selectedResource = resources.find(
          (resource) =>
            `${resource.Nombre} ${resource.Apellido}` === String(resourceId),
        );

        if (selectedResource) {
          setSelectedResource(selectedResource);
        }
      }

      setIsSubmitting(true); // Set the submitting state to true when starting the submission
      editTicket(payload);
    } else {
      console.error('Product version ID is required');
    }
  };

  const productOptions = products.map((product) => ({
    label: `${product.name} - ${product.version}`,
    value: `${product.name} - ${product.version}`,
  }));

  const taskOptions = tasks.map((task) => ({
    label: task.title,
    value: task.id.toString(), // Convert task id to string
  }));

  const resourceOptions = resources.map((resource) => ({
    label: `${resource.Nombre} ${resource.Apellido}`,
    value: `${resource.Nombre} ${resource.Apellido}`,
  }));

  const severityOptions = [
    { label: 'Baja', value: 'Baja' },
    { label: 'Media', value: 'Media' },
    { label: 'Alta', value: 'Alta' },
  ];

  const statusOptions = [
    { label: 'Abierto', value: 'Abierto' },
    { label: 'En Progreso', value: 'En Progreso' },
    { label: 'Cerrado', value: 'Cerrado' },
  ];

  const typeOptions = [
    { label: 'ERROR', value: TicketType.ERROR },
    { label: 'CONSULTA', value: TicketType.CONSULTA },
  ];

  const priorityOptions = Object.values(Priority).map((priority) => ({
    label: priority,
    value: priority,
  }));

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Editar Ticket</h1>
        {loading ? (
          <Skeleton />
        ) : (
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
                defaultValue={[]}
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
              id="resourceId"
              label="Recurso"
              options={resourceOptions}
              control={control}
              onChange={(value) => {
                const selectedResource = resources.find(
                  (resource) =>
                    `${resource.Nombre} ${resource.Apellido}` === value,
                );
                if (selectedResource) {
                  setSelectedResource(selectedResource);
                }
              }}
            />
            <FormSelect
              id="severity"
              label="Severidad"
              options={severityOptions}
              control={control}
            />
            <FormSelect
              id="status"
              label="Estado"
              options={statusOptions}
              control={control}
            />
            <FormSelect
              id="type"
              label="Tipo"
              options={typeOptions}
              control={control}
            />
            <FormSelect
              id="priority"
              label="Prioridad"
              options={priorityOptions}
              control={control}
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => navigate('/tickets')}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Actualizando...' : 'Editar'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Skeleton Loader Component
function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Título</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Descripción</span>
        </div>
        <div className="h-24 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Fecha de Inicio</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Fecha de Finalización</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Producto y Versión</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Recurso</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded">
          <span>Prioridad</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
}

export default Skeleton;
