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
}

export interface Ticket {
  id: number;
  title: string;
  severity: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  description: string;
  priorityId: number;
  clientId: number;
  productId: number;
  priority: Priority;
}

export interface Priority {
  id: number;
  name: string;
  days: number;
}
