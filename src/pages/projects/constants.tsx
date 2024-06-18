import { EyeIcon, FilePenIcon, TrashIcon } from 'lucide-react';

export const PROJECTS_MOCK = [
  {
    id: 'PRJ001',
    title: 'Empanada Revolution',
    startDate: '2023-04-01',
    endDate: '2023-06-30',
    status: 'In Progress',
    description: 'Redesign the empanada business website',
    client: {
      id: 0,
      name: 'Don Carlos',
      contract: 'string',
      address: 'string',
      phone: 'string',
      projects: ['string'],
    },
    product: {
      id: 0,
      name: 'string',
    },
  },
  {
    id: 'PRJ002',
    title: 'Dulce de Leche App',
    startDate: '2023-03-15',
    endDate: '2023-07-31',
    status: 'In Progress',
    description: 'Develop a mobile app for the dulce de leche shop',
    client: {
      id: 0,
      name: 'Doña Marta',
      contract: 'string',
      address: 'string',
      phone: 'string',
      projects: ['string'],
    },
    product: {
      id: 0,
      name: 'string',
    },
  },
  {
    id: 'PRJ003',
    title: 'Mate Master',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'Completed',
    description: 'Implement a new mate brewing system',
    client: {
      id: 0,
      name: 'El Cholo',
      contract: 'string',
      address: 'string',
      phone: 'string',
      projects: ['string'],
    },
    product: {
      id: 0,
      name: 'string',
    },
  },
];

export const TABLE_COLUMNS = [
  'ID',
  'Nombre',
  'Descripción',
  'Fecha de Inicio',
  'Fecha de Finalización',
  'Estado',
  'Cliente',
  'Acciones',
];

export const PROJECT_STATES = ['No comenzado', 'En Progreso', 'Finalizado'];
export const PROJECT_CLIENTS = ['Don Carlos', 'Doña Marta', 'El Cholo'];
export const PROJECT_PRODUCTS = ['Product A', 'Product B', 'Product C'];

export const ACTION_BUTTONS = [
  { label: 'View', icon: <EyeIcon className="size-4" /> },
  { label: 'Edit', icon: <FilePenIcon className="size-4" /> },
  { label: 'Delete', icon: <TrashIcon className="size-4" /> },
];
