import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Project } from '@/api/types';
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
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const createProject = (payload: Project) => {
    client.projects
      .post('/projects', { ...payload })
      .then(() => {
        navigate('/projects');
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };

  const onSubmit = (data: FieldValues) => {
    createProject(data as Project);
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
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => navigate('/projects')}>
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