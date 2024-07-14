import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase";

const EditableTableDemo = () => {
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: animals, isLoading, isError } = useQuery({
    queryKey: ['animals'],
    queryFn: async () => {
      const { data, error } = await supabase.from('animals').select('*');
      if (error) throw error;
      return data;
    },
  });

  const updateAnimalMutation = useMutation({
    mutationFn: async (updatedAnimal) => {
      const { data, error } = await supabase
        .from('animals')
        .update(updatedAnimal)
        .eq('id', updatedAnimal.id)
        .select();
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['animals']);
      toast({
        title: "Animal updated",
        description: "The animal has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update animal: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setEditedData(animal);
  };

  const handleSave = async () => {
    await updateAnimalMutation.mutateAsync(editedData);
    setEditingId(null);
    setEditedData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Editable Animals Table</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                ) : (
                  animal.name
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    value={editedData.species || ''}
                    onChange={(e) => handleInputChange(e, 'species')}
                  />
                ) : (
                  animal.species
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    type="number"
                    value={editedData.age || ''}
                    onChange={(e) => handleInputChange(e, 'age')}
                  />
                ) : (
                  animal.age
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <>
                    <Button onClick={handleSave} className="mr-2">Save</Button>
                    <Button onClick={handleCancel} variant="outline">Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => handleEdit(animal)}>Edit</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EditableTableDemo;