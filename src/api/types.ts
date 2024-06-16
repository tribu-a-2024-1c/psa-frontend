export interface Project {
  id: number | string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  client: {
    id: number;
    name: string;
    contract: string;
    address: string;
    phone: string;
    projects: string[];
  };
  product: {
    id: number;
    name: string;
  };
}
