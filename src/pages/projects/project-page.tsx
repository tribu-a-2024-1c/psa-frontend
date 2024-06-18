import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { client } from '@/api/common/client';
import type { Project } from '@/api/types';
import { Button } from '@/components/ui/button';

import { PROJECTS_MOCK } from './constants';
import { ProjectTable } from './project-table';

export function ProjectPage() {
  const [projects, setProjects] = useState<Project[] | null>(PROJECTS_MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = () => {
      client.projects
        .get('/projects')
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <Button
            className="ml-auto"
            size="sm"
            onClick={() => navigate('/projects/new')}
          >
            Crear Proyecto
          </Button>
        </div>
        {projects && projects?.length > 0 ? (
          <ProjectTable projects={projects} />
        ) : (
          'No products available'
        )}
      </div>
    </div>
  );
}
