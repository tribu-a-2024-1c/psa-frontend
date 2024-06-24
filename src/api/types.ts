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
