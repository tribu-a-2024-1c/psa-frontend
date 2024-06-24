import axios from 'axios';

const projectsService = axios.create({
  baseURL: `${import.meta.env.VITE_API_PROJECTS_URL}`,
});

const supportService = axios.create({
  baseURL: `${import.meta.env.VITE_API_SUPPORT_URL}`,
});

const psaService = axios.create({
  baseURL: 'https://run.mocky.io/v3',
});

projectsService.defaults.headers.common['projects-Type'] = 'application/json';
projectsService.defaults.headers.common.Accept = 'application/json';

supportService.defaults.headers.common['projects-Type'] = 'application/json';
supportService.defaults.headers.common.Accept = 'application/json';

psaService.defaults.headers.common['projects-Type'] = 'application/json';
psaService.defaults.headers.common.Accept = 'application/json';

export const client = {
  projects: projectsService,
  support: supportService,
  psa: psaService,
};
