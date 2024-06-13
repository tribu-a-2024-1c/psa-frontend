import { EyeIcon, FilePenIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useEffect } from 'react';

import { client } from '@/api/common/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

export function ProjectPage() {
  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await client.projects.get('/projects');
      console.log(projects );
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-950 md:p-6">
        <div className="mb-4 flex items-center">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button className="ml-auto" size="sm">
            Add Project
          </Button>
        </div>
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PRJ001</TableCell>
                <TableCell>Empanada Revolution</TableCell>
                <TableCell>Redesign the empanada business website</TableCell>
                <TableCell>2023-04-01</TableCell>
                <TableCell>2023-06-30</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>Don Carlos</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="size-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="size-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PRJ002</TableCell>
                <TableCell>Dulce de Leche App</TableCell>
                <TableCell>
                  Develop a mobile app for the dulce de leche shop
                </TableCell>
                <TableCell>2023-03-15</TableCell>
                <TableCell>2023-07-31</TableCell>
                <TableCell>In Progress</TableCell>
                <TableCell>Doña Marta</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="size-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="size-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PRJ003</TableCell>
                <TableCell>Mate Master</TableCell>
                <TableCell>Implement a new mate brewing system</TableCell>
                <TableCell>2023-01-01</TableCell>
                <TableCell>2023-12-31</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>El Cholo</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <EyeIcon className="size-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="size-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="mt-4">
              <PlusIcon className="size-4" />
              <span className="sr-only">Add Project</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add New Project</AlertDialogTitle>
              <AlertDialogDescription>
                Please fill in the project details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-id">Project ID</Label>
                  <Input id="project-id" placeholder="Enter project ID" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-title">Title</Label>
                  <Input id="project-title" placeholder="Enter project title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Enter project description"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-start-date">Start Date</Label>
                  <Input
                    id="project-start-date"
                    type="date"
                    placeholder="Enter start date"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-end-date">End Date</Label>
                  <Input
                    id="project-end-date"
                    type="date"
                    placeholder="Enter end date"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-state">State</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select project state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>State</SelectLabel>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-client">Client</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Client</SelectLabel>
                        <SelectItem value="don-carlos">Don Carlos</SelectItem>
                        <SelectItem value="dona-marta">Doña Marta</SelectItem>
                        <SelectItem value="el-cholo">El Cholo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-product">Product</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Product</SelectLabel>
                        <SelectItem value="product-a">Product A</SelectItem>
                        <SelectItem value="product-b">Product B</SelectItem>
                        <SelectItem value="product-c">Product C</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Save</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
