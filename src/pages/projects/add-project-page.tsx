import { useEffect, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Resource } from '@/api/types';
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
}

function FormSelect({ id, label, options, control }: FormSelectProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Controller
        name={id}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px]">
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
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Seleccionar ${label.toLowerCase()}`}>
                {field.value
                  ? `${field.value.Nombre} ${field.value.Apellido}`
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
        render={({ field }) => (
          <Input {...field} id={id} type={type} placeholder={placeholder} />
        )}
      />
    </div>
  );
}

export function AddProjectPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const [resources, setResources] = useState<Resource[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el estado de carga del botón

  useEffect(() => {
    client.psa
      .get<Resource[]>('/')
      .then((response) => {
        if (Array.isArray(response?.data)) {
          setResources(response.data);
        } else {
          setResources([]);
        }
      })
      .catch((error) => {
        setResources([]);
        console.error('Error fetching resources:', error);
      });
  }, []);

  const createProject = (payload: unknown) => {
    setIsSubmitting(true); // Set the submitting state to true when starting the submission
    client.projects
      .post('/projects', payload)
      .then(() => {
        navigate('/projects');
      })
      .catch((error) => {
        console.error('Error creating project:', error);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the state after submission is done
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
    setIsSubmitting(true); // Set the submitting state to true when starting the submission
    createProject(payload);
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Crear Proyecto Nuevo</h1>
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
            options={PROJECT_STATES}
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
