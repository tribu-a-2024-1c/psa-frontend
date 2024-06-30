import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Project, Resource, Task } from '@/api/types';
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

import { TaskTable } from './task-table';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function TaskPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const navigate = useNavigate();
  const query = useQuery();
  const projectId = query.get('projectId');
  const resourceId = query.get('resourceId');

  useEffect(() => {
    client.projects
      .get('/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });

    client.psa
      .get<Resource[]>('/')
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

  useEffect(() => {
    const fetchTasks = () => {
      if (projectId === 'all' || !projectId) {
        client.projects
          .get('/projects/tasks')
          .then((response) => {
            setTasks(response.data);
          })
          .catch((error) => {
            console.error('Error fetching tasks:', error);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(true);
        client.projects
          .get(`/projects/${projectId}/tasks`)
          .then((response) => {
            setTasks(response.data);
          })
          .catch((error) => {
            console.error('Error fetching tasks:', error);
          })
          .finally(() => setIsLoading(false));
      }
    };

    fetchTasks();
  }, [projectId, resourceId]);

  const handleProjectChange = (value: string) => {
    navigate(`?projectId=${value}`);
  };

  const handleResourceChange = (value: string) => {
    navigate(`?resourceId=${value}`);
  };

  const filteredTasks = tasks?.filter((task) =>
    resourceId && resourceId !== 'all'
      ? String(task.resource?.id) === resourceId
      : true,
  );

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Tareas</h1>
          <div className="flex gap-2">
            <Select onValueChange={handleProjectChange}>
              <SelectTrigger className="ml-auto w-[200px]">
                <SelectValue placeholder="Seleccione un proyecto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Proyecto</SelectLabel>
                  <SelectItem value="all">Todos los proyectos</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={String(project.id)}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleResourceChange}>
              <SelectTrigger className="ml-auto w-[200px]">
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
            <Button
              className="ml-auto h-[40px]"
              size="sm"
              onClick={() => navigate('/tasks/new')}
            >
              Crear Tarea
            </Button>
          </div>
        </div>
        {!isLoading &&
          (!filteredTasks || filteredTasks.length === 0) &&
          'No hay tareas disponibles'}
        {((filteredTasks && filteredTasks.length > 0) || isLoading) && (
          <TaskTable tasks={filteredTasks} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
