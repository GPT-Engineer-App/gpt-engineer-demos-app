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
import { Filter, FileOutput, Plus, Pencil, Trash2 } from "lucide-react";
import { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal } from "@/integrations/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const EditableTableDemo = () => {
  const { data: animals, isLoading, isError } = useAnimals();
  const addAnimalMutation = useAddAnimal();
  const updateAnimalMutation = useUpdateAnimal();
  const deleteAnimalMutation = useDeleteAnimal();

  const [editingAnimal, setEditingAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "", image_url: "" });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return <div className="container mx-auto px-4 py-8">Error fetching animals data.</div>;
  }

  const handleAddAnimal = async () => {
    try {
      await addAnimalMutation.mutateAsync(newAnimal);
      setNewAnimal({ name: "", species: "", image_url: "" });
      toast.success("Animal added successfully");
    } catch (error) {
      toast.error("Failed to add animal");
    }
  };

  const handleUpdateAnimal = async () => {
    try {
      await updateAnimalMutation.mutateAsync(editingAnimal);
      setEditingAnimal(null);
      toast.success("Animal updated successfully");
    } catch (error) {
      toast.error("Failed to update animal");
    }
  };

  const handleDeleteAnimal = async (id) => {
    try {
      await deleteAnimalMutation.mutateAsync(id);
      toast.success("Animal deleted successfully");
    } catch (error) {
      toast.error("Failed to delete animal");
    }
  };

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default"><Plus className="mr-2 h-4 w-4" /> Add Animal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Animal</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newAnimal.name} onChange={(e) => setNewAnimal({...newAnimal, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="species" className="text-right">Species</Label>
                  <Input id="species" value={newAnimal.species} onChange={(e) => setNewAnimal({...newAnimal, species: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image_url" className="text-right">Image URL</Label>
                  <Input id="image_url" value={newAnimal.image_url} onChange={(e) => setNewAnimal({...newAnimal, image_url: e.target.value})} className="col-span-3" />
                </div>
              </div>
              <Button onClick={handleAddAnimal}>Add Animal</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>
                  {animal.image_url && (
                    <img src={animal.image_url} alt={animal.name} className="w-12 h-12 object-cover rounded" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{new Date(animal.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setEditingAnimal(animal)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Animal</DialogTitle>
                        </DialogHeader>
                        {editingAnimal && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">Name</Label>
                              <Input id="edit-name" value={editingAnimal.name} onChange={(e) => setEditingAnimal({...editingAnimal, name: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-species" className="text-right">Species</Label>
                              <Input id="edit-species" value={editingAnimal.species} onChange={(e) => setEditingAnimal({...editingAnimal, species: e.target.value})} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-image_url" className="text-right">Image URL</Label>
                              <Input id="edit-image_url" value={editingAnimal.image_url} onChange={(e) => setEditingAnimal({...editingAnimal, image_url: e.target.value})} className="col-span-3" />
                            </div>
                          </div>
                        )}
                        <Button onClick={handleUpdateAnimal}>Update Animal</Button>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="icon" onClick={() => handleDeleteAnimal(animal.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
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