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

const initialData = [
  { id: 1, name: "Lion", species: "Panthera leo", habitat: "Grasslands" },
  { id: 2, name: "Elephant", species: "Loxodonta", habitat: "Savanna" },
  { id: 3, name: "Penguin", species: "Spheniscidae", habitat: "Antarctica" },
  { id: 4, name: "Dolphin", species: "Delphinidae", habitat: "Ocean" },
];

const EditableTableDemo = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (animal) => {
    setEditingId(animal.id);
    setEditForm(animal);
  };

  const handleSave = () => {
    setData(data.map((item) => (item.id === editingId ? editForm : item)));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Editable Animal Data Table</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Habitat</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                  />
                ) : (
                  animal.name
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    name="species"
                    value={editForm.species}
                    onChange={handleChange}
                  />
                ) : (
                  animal.species
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <Input
                    name="habitat"
                    value={editForm.habitat}
                    onChange={handleChange}
                  />
                ) : (
                  animal.habitat
                )}
              </TableCell>
              <TableCell>
                {editingId === animal.id ? (
                  <div className="space-x-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
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