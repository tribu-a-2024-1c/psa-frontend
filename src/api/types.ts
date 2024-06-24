export interface Project {
  id: number | string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
}

export interface Task {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  estimation: number;
  status: string;
  description: string;
  project: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    description: string;
  };
  resource?: Resource;
}

export interface Resource {
  legajo?: number;
  Nombre?: string;
  Apellido?: string;
  id?: number;
  lastName?: string;
  name?: string;
}

export interface Ticket {
  id: number;
  title: string;
  severity: string;
  startDate: string;
  endDate: string;
  status: string;
  type: TicketType;
  description: string;
  productName: number;
  clientName: string;
  priority: Priority;
}

export enum TicketType {
  ERROR = 'ERROR',
  CONSULTA = 'CONSULTA',
}

export enum Priority {
  S1 = '7 dias',
  S2 = '15 dias',
  S3 = '30 dias',
  S4 = '60 dias',
}
