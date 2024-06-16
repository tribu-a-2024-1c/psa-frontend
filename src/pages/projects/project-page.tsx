import { useEffect, useState } from 'react';

import { client } from '@/api/common/client';
import type { Project } from '@/api/types';

import { AddProjectDialog } from './add-project-dialog';
import { PROJECTS_MOCK } from './constants';
import { ProjectTable } from './project-table';

export function ProjectPage() {
  const [projects, setProjects] = useState<Project[] | null>(PROJECTS_MOCK);

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
          <h1 className="text-2xl font-bold">Projects</h1>
          <AddProjectDialog />
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
