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
