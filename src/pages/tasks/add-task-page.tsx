import moment from 'moment';
import { useEffect, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Project, Task } from '@/api/types';
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

import { TASK_STATES } from './constants';

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder: string;
  control: Control<FieldValues>;
}

interface FormSelectResourceProps {
  id: string;
  label: string;
  options: Resource[];
  control: Control<FieldValues>;
}

function FormSelectResource({
  id,
  label,
  options = [],
  control,
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
            {...field}
            onValueChange={(value) => {
              try {
                field.onChange(JSON.parse(value));
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
  options: string[] | { value: string; label: string }[];
  control: Control<FieldValues>;
}

function FormSelect({ id, label, options = [], control }: FormSelectProps) {
  const isComplexOptions = (
    option: { value: string; label: string } | string,
  ): option is { value: string; label: string } =>
    typeof option === 'object' && 'value' in option && 'label' in option;

  const safeOptions = Array.isArray(options) ? options : [];

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
                {safeOptions?.map((option) =>
                  isComplexOptions(option) ? (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ) : (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ),
                )}
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

export function AddTaskPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });
  const { projectId, taskId } = useParams<{
    projectId?: string;
    taskId?: string;
  }>();

  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);

  const createTask = (payload: Task) => {
    const { project, resource, ...restPayload } = payload;
    client.projects
      .post(`/projects/${project}/tasks`, {
        ...restPayload,
        ...(resource
          ? {
              recurso: {
                legajo: resource.legajo,
                nombre: resource.Nombre,
                apellido: resource.Apellido,
              },
            }
          : {}),
      })
      .then(() => {
        navigate('/tasks');
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  const editTask = (payload: Task) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { project, resource, ...restPayload } = payload;
    client.projects
      .put(`/projects/tasks/${taskId}`, {
        ...restPayload,
        ...(resource
          ? {
              recurso: {
                legajo: resource.legajo,
                nombre: resource.Nombre,
                apellido: resource.Apellido,
              },
            }
          : {}),
      })
      .then(() => {
        navigate('/tasks');
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  useEffect(() => {
    if (projectId && taskId) {
      client.projects
        .get(`/projects/${projectId}/tasks`)
        .then((response) => {
          const foundTask = response.data.find(
            (task: Task) => task.id === parseInt(taskId),
          );
          if (foundTask) {
            Object.entries(foundTask).forEach(([key, value]) => {
              if (key === 'startDate' || key === 'endDate') {
                setValue(key, moment.utc(value as string).format('YYYY-MM-DD'));
                return;
              }

              if (
                key !== 'id' &&
                key !== 'project' &&
                key !== 'resource' &&
                key !== 'ticket'
              ) {
                setValue(key, value);
              }
            });

            setValue('resource', {
              legajo: foundTask.resource.id,
              Nombre: foundTask.resource.name,
              Apellido: foundTask.resource.lastName,
            });
            setValue('project', foundTask.project.id.toString());
          }
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [projectId, taskId, setValue]);

  useEffect(() => {
    const fetchProjects = () => {
      client.projects
        .get('/projects')
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProjects(response.data);
          } else {
            setProjects([]);
          }
        })
        .catch((error) => {
          setProjects([]);
          console.error('Error fetching projects:', error);
        });
    };

    const fetchResources = () => {
      client.psa
        .get('/af2aa06e-6191-4590-af70-bfa08ef85b93')
        .then((response) => {
          if (Array.isArray(response?.data)) {
            setResources(response?.data);
          } else {
            setResources([]);
          }
        })
        .catch((error) => {
          setResources([]);
          console.error('Error fetching resources:', error);
        });
    };

    fetchProjects();
    fetchResources();
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (projectId && taskId) {
      editTask(data as Task);
    } else {
      createTask(data as Task);
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <h1 className="mb-4 text-2xl font-bold">
          {projectId && taskId ? 'Editar Tarea' : 'Crear Tarea'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormItem
            id="title"
            label="Título"
            placeholder="Ingrese título de la tarea"
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
            options={TASK_STATES}
            control={control}
          />
          <div className="grid gap-2">
            <Label htmlFor="estimation">Estimación</Label>
            <Controller
              name="estimation"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="estimation"
                  type="number"
                  placeholder="Ingrese estimación de la tarea"
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
          </div>
          {projects && (
            <FormSelect
              id="project"
              label="Proyecto"
              options={projects?.map((project) => ({
                value: project.id.toString(),
                label: project.title,
              }))}
              control={control}
            />
          )}
          {resources && (
            <FormSelectResource
              id="resource"
              label="Recurso"
              options={resources}
              control={control}
            />
          )}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => navigate('/tasks')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              {projectId && taskId ? 'Editar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
