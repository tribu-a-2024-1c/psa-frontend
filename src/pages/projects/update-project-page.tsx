import moment from 'moment';
import React, { useEffect, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from '@/api/common/client';
import { type Project, type Resource } from '@/api/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { PROJECT_STATES } from './constants';

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

interface FormSelectResourceProps {
  id: string;
  label: string;
  options: Resource[];
  control: Control<FieldValues>;
  setValue: (name: string, value: unknown) => void;
  getValues: () => Resource | undefined;
}

function FormSelectResource({
  id,
  label,
  options = [],
  control,
  setValue,
}: FormSelectResourceProps) {
  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value ? JSON.stringify(field.value) : ''}
            onValueChange={(value) => {
              try {
                const resource: Resource = JSON.parse(value);
                field.onChange(resource);
                setValue('leader', resource);
              } catch (error) {
                console.error('Invalid JSON:', value, error);
                field.onChange(null);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`}>
                {field.value
                  ? `${(field.value as Resource).Nombre} ${
                      (field.value as Resource).Apellido
                    }`
                  : `Seleccionar ${label.toLowerCase()}`}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {safeOptions.map((option) => (
                  <SelectItem
                    key={option.legajo}
                    value={JSON.stringify(option)}
                  >
                    {`${option.Nombre} ${option.Apellido}`}
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
        defaultValue=""
        render={({ field }) => (
          <Input {...field} id={id} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
}

export function UpdateProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      leader: null,
    },
  });

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resourceResponse = await client.psa.get<Resource[]>('/');
        const mappedResources = resourceResponse.data.map((resource) => ({
          ...resource,
          name: resource.Nombre,
          lastName: resource.Apellido,
        }));
        setResources(mappedResources);

        if (projectId) {
          const projectResponse = await client.projects.get<Project>(
            `/projects/${projectId}`,
          );
          const project = projectResponse.data;

          setValue('title', project.title);
          setValue('description', project.description);
          setValue(
            'startDate',
            moment.utc(project.startDate).format('YYYY-MM-DD'),
          );
          setValue('endDate', moment.utc(project.endDate).format('YYYY-MM-DD'));
          setValue('status', project.status);
          if (project.leader) {
            setValue('leader', {
              ...project.leader,
              Nombre: project.leader.name,
              Apellido: project.leader.lastName,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, setValue]);

  const updateProject = (payload: unknown) => {
    setIsSubmitting(true);
    client.projects
      .put(`/projects/${projectId}`, payload)
      .then(() => {
        navigate('/projects');
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onSubmit = (data: FieldValues) => {
    const leader = getValues('leader') as Resource;
    const payload = {
      ...data,
      leader: {
        legajo: leader.legajo!,
        nombre: leader.Nombre!,
        apellido: leader.Apellido!,
      },
    };
    setIsSubmitting(true);
    updateProject(payload);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Actualizar Proyecto</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormItem
            id="title"
            label="Título"
            placeholder="Ingrese título del proyecto"
            control={control}
          />
          <FormTextarea
            id="description"
            label="Descripción"
            placeholder="Ingrese descripción del proyecto"
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
            id="status"
            label="Estado"
            options={PROJECT_STATES.map((state) => ({
              label: state,
              value: state,
            }))}
            control={control}
          />
          <FormSelectResource
            id="leader"
            label="Líder"
            options={resources}
            control={control}
            setValue={setValue}
            getValues={() => getValues('leader') as Resource}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => navigate('/projects')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Cargando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Skeleton Loader Component
function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Título</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Descripción</span>
        </div>
        <div className="h-24 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Fecha de Inicio</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Fecha de Finalización</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Estado</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/4 rounded bg-gray-300">
          <span>Líder</span>
        </div>
        <div className="h-8 w-full animate-pulse rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
