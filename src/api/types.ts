export interface Client {
  id: number;
  razonSocial: string;
  cuit: string;
}

export interface ProductWithVersion {
  id: number;
  name: string;
  version: string;
  clients: Client[];
}

export interface Resource {
  legajo?: number;
  Nombre?: string;
  Apellido?: string;
  id?: number;
  lastName?: string;
  name?: string;
}

export interface Project {
  id?: number | string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  leader?: {
    legajo: number;
    nombre: string;
    apellido: string;
    name?: string;
    lastName?: string;
  };
}

export interface ShowProject {
  id?: number | string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  leader?: {
    legajo: number;
    name: string;
    lastName: string;
  };
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
  ticket?: Ticket;
}

export interface Ticket {
  id: number;
  title: string;
  severity: string | null;
  startDate: string;
  endDate: string;
  status: string;
  type: TicketType;
  description: string;
  productVersion: {
    id: number;
    version: string;
    product: {
      id: number;
      name: string;
      clients: Client[];
    };
  };
  resource?: {
    id: number;
    name: string;
    lastName: string;
  } | null;
  priority?: Priority;
  tasks?: Task[];
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

export interface CreateTicketPayload {
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  description: string;
  priority: string;
  productVersionId: number;
  resourceId?: number;
  resource?: {
    legajo: number;
    nombre: string;
    apellido: string;
  };
  taskIds?: number[];
}
