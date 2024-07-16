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
import { Filter, FileOutput, Plus, MoreHorizontal } from "lucide-react";
import { useAnimals, useAddAnimal, useUpdateAnimal, useDeleteAnimal } from "@/integrations/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase";
import { useSupabaseAuth } from "@/integrations/supabase/auth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const EditableTableDemo = () => {
  const { data: animals, isLoading, isError } = useAnimals();
  const addAnimalMutation = useAddAnimal();
  const updateAnimalMutation = useUpdateAnimal();
  const deleteAnimalMutation = useDeleteAnimal();
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  const [editingAnimal, setEditingAnimal] = useState(null);
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "", image_url: "" });
  const [file, setFile] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (isError) {
    return <div className="container mx-auto px-4 py-8">Error fetching animals data.</div>;
  }

  const handleFileChange = (event, isEdit = false) => {
    const selectedFile = event.target.files[0];
    if (isEdit) {
      setEditFile(selectedFile);
    } else {
      setFile(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `public/${fileName}`;
    const { data, error } = await supabase.storage
      .from('animals')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('animals')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddAnimal = async () => {
    if (!session) {
      toast.error("You must be logged in to add an animal");
      navigate("/login");
      return;
    }

    try {
      let imageUrl = newAnimal.image_url;
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await addAnimalMutation.mutateAsync({ ...newAnimal, image_url: imageUrl });
      setNewAnimal({ name: "", species: "", image_url: "" });
      setFile(null);
      setIsAddDialogOpen(false);
      toast.success("Animal added successfully");
    } catch (error) {
      toast.error("Failed to add animal");
    }
  };

  const handleUpdateAnimal = async () => {
    if (!session) {
      toast.error("You must be logged in to update an animal");
      navigate("/login");
      return;
    }

    try {
      let imageUrl = editingAnimal.image_url;
      if (editFile) {
        imageUrl = await uploadImage(editFile);
      }
      await updateAnimalMutation.mutateAsync({ ...editingAnimal, image_url: imageUrl });
      setEditingAnimal(null);
      setEditFile(null);
      setIsEditDialogOpen(false);
      toast.success("Animal updated successfully");
    } catch (error) {
      toast.error("Failed to update animal");
    }
  };

  const handleDeleteAnimal = async (id) => {
    if (!session) {
      toast.error("You must be logged in to delete an animal");
      navigate("/login");
      return;
    }

    try {
      await deleteAnimalMutation.mutateAsync(id);
      toast.success("Animal deleted successfully");
    } catch (error) {
      toast.error("Failed to delete animal");
    }
  };

  const ActionMenu = ({ animal }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {
          if (!session) {
            toast.error("You must be logged in to edit an animal");
            navigate("/login");
            return;
          }
          setEditingAnimal(animal);
          setIsEditDialogOpen(true);
        }}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteAnimal(animal.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" onClick={() => {
                if (!session) {
                  toast.error("You must be logged in to add an animal");
                  navigate("/login");
                  return;
                }
                setIsAddDialogOpen(true);
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Animal
              </Button>
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
                  <Label htmlFor="image" className="text-right">Image</Label>
                  <Input id="image" type="file" onChange={(e) => handleFileChange(e)} className="col-span-3" />
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
                  <ActionMenu animal={animal} />
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
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                <Label htmlFor="edit-image" className="text-right">Image</Label>
                <Input id="edit-image" type="file" onChange={(e) => handleFileChange(e, true)} className="col-span-3" />
              </div>
              {editingAnimal.image_url && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Current Image</Label>
                  <img src={editingAnimal.image_url} alt={editingAnimal.name} className="w-24 h-24 object-cover rounded col-span-3" />
                </div>
              )}
            </div>
          )}
          <Button onClick={handleUpdateAnimal}>Update Animal</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableTableDemo;