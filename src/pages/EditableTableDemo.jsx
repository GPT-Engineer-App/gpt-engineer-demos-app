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
import { Filter, FileExport, Plus } from "lucide-react";

const initialData = [
  { id: 1, name: "Laser Lemonade Machine", status: "Draft", price: "$499.99", totalSales: 25, createdAt: "2023-07-12 10:42 AM" },
  { id: 2, name: "Hypernova Headphones", status: "Active", price: "$129.99", totalSales: 100, createdAt: "2023-10-18 03:21 PM" },
  { id: 3, name: "AeroGlow Desk Lamp", status: "Active", price: "$39.99", totalSales: 50, createdAt: "2023-11-29 08:15 AM" },
  { id: 4, name: "TechTonic Energy Drink", status: "Draft", price: "$2.99", totalSales: 0, createdAt: "2023-12-25 11:59 PM" },
  { id: 5, name: "Gamer Gear Pro Controller", status: "Active", price: "$59.99", totalSales: 75, createdAt: "2024-01-01 12:00 AM" },
  { id: 6, name: "Luminous VR Headset", status: "Active", price: "$199.99", totalSales: 30, createdAt: "2024-02-14 02:14 PM" },
];

const EditableTableDemo = () => {
  const [data, setData] = useState(initialData);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your products and view their sales performance.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          <Button variant="outline"><FileExport className="mr-2 h-4 w-4" /> Export</Button>
          <Button variant="default"><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.totalSales}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
                <TableCell>...</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-6 of 32 products</p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default EditableTableDemo;