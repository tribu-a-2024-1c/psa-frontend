import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Task } from '@/api/types';
import { Button } from '@/components/ui/button';

import { TaskTable } from './task-table';

export function TaskPage() {
  const [tasks, setTasks] = useState<Task[] | null>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = () => {
      setIsLoading(true);
      client.projects
        .get('/projects/tasks')
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        })
        .finally(() => setIsLoading(false));
    };

    fetchTask();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Tareas</h1>
          <Button
            className="ml-auto"
            size="sm"
            onClick={() => navigate('/tasks/new')}
          >
            Crear Tarea
          </Button>
        </div>
        {isLoading && 'Cargando tareas...'}
        {!isLoading && !tasks?.length && 'No hay tareas disponibles'}
        {!isLoading && tasks && tasks?.length > 0 && (
          <TaskTable tasks={tasks} />
        )}
      </div>
    </div>
  );
}
