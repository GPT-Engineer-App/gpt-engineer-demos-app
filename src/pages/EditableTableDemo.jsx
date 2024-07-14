import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, FileOutput, Plus } from "lucide-react";
import { useAnimals } from "@/integrations/supabase";

const EditableTableDemo = () => {
  const { data: animals, isLoading, isError } = useAnimals();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return <div className="container mx-auto px-4 py-8">Error fetching animals data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Animals</h1>
          <p className="text-gray-500">Manage your animals data.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><FileOutput className="mr-2 h-4 w-4" /> Export</Button>
          <Button variant="default"><Plus className="mr-2 h-4 w-4" /> Add Animal</Button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell className="font-medium">{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.image_url}</TableCell>
                <TableCell>{new Date(animal.created_at).toLocaleString()}</TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing {animals.length} animals</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default EditableTableDemo;