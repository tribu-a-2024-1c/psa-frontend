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
import { Textarea } from '@/components/ui/textarea';

function FormTextarea({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} placeholder={placeholder} className="min-h-[100px]" />
    </div>
  );
}

function FormSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function FormItem({
  id,
  label,
  placeholder = '',
  type = 'text',
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

export function AddProjectDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-auto" size="sm">
          Add Project
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
            <FormItem
              id="project-id"
              label="Project ID"
              placeholder="Enter project ID"
            />
            <FormItem
              id="project-title"
              label="Title"
              placeholder="Enter project title"
            />
            <FormTextarea
              id="project-description"
              label="Description"
              placeholder="Enter project description"
            />
            <FormItem
              id="project-start-date"
              label="Start Date"
              type="date"
              placeholder="Enter start date"
            />
            <FormItem
              id="project-end-date"
              label="End Date"
              type="date"
              placeholder="Enter end date"
            />
            <FormSelect
              id="project-state"
              label="State"
              options={['In Progress', 'Completed', 'On Hold']}
            />
            <FormSelect
              id="project-client"
              label="Client"
              options={['Don Carlos', 'Doña Marta', 'El Cholo']}
            />
            <FormSelect
              id="project-product"
              label="Product"
              options={['Product A', 'Product B', 'Product C']}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
