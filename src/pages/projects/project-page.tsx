import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { ShowProject } from '@/api/types';
import { Button } from '@/components/ui/button';

import { ProjectTable } from './project-table';

export function ProjectPage() {
  const [projects, setProjects] = useState<ShowProject[] | null>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    client.projects
      .get('/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        setProjects([]);
        console.error('Error fetching projects:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 px-4 py-2">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <Button
            className="ml-auto h-[40px]"
            size="sm"
            onClick={() => navigate('/projects/new')}
          >
            Crear Proyecto
          </Button>
        </div>
        {!isLoading && !projects?.length && 'No hay proyectos disponibles'}
        {(isLoading || (projects && projects?.length > 0)) && (
          <ProjectTable projects={projects} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}
