import { useNavigate } from 'react-router-dom';

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

import { PROJECT_CLIENTS, PROJECT_PRODUCTS, PROJECT_STATES } from './constants';

function FormTextarea({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} className="min-h-[100px]" />
    </div>
  );
}

function FormSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select>
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
    </div>
  );
}

function FormItem({
  id,
  label,
  placeholder = '',
  type = 'text',
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

export function AddProjectPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">Crear Proyecto Nuevo</h1>
        <div className="grid gap-4">
          <FormItem
            id="project-title"
            label="Título"
            placeholder="Ingrese título del proyecto"
          />
          <FormTextarea
            id="project-description"
            label="Descripción"
            placeholder="Ingrese descripción del proyecto"
          />
          <FormItem
            id="project-start-date"
            label="Fecha de Inicio"
            type="date"
            placeholder="Ingrese fecha de inicio"
          />
          <FormItem
            id="project-end-date"
            label="Fecha de Finalización"
            type="date"
            placeholder="Ingrese fecha de finalización"
          />
          <FormSelect
            id="project-state"
            label="Estado"
            options={PROJECT_STATES}
          />
          <FormSelect
            id="project-client"
            label="Cliente"
            options={PROJECT_CLIENTS}
          />
          <FormSelect
            id="project-product"
            label="Producto"
            options={PROJECT_PRODUCTS}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => navigate('/projects')}>
            Cancelar
          </Button>
          <Button onClick={() => navigate('/projects')}>Agregar</Button>
        </div>
      </div>
    </div>
  );
}
