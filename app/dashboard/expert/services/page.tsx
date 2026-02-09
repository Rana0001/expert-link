"use client";

import { useBookingStore } from "@/lib/store/booking-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreHorizontal } from "lucide-react";
import { MOCK_EXPERTS } from "@/lib/mock/experts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ServicesPage() {
  const expert = MOCK_EXPERTS[0]; // Simulating logged in user

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold text-slate-900">Services</h2>
            <p className="text-slate-500">Manage your consultation offerings and pricing.</p>
         </div>
         <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Plus size={16} className="mr-2" /> Add Service
         </Button>
       </div>

       <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
               <TableRow className="hover:bg-transparent border-b border-slate-100">
                  <TableHead className="w-[300px]">Service Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {expert.services.map((service) => (
                  <TableRow key={service.id} className="hover:bg-white/40 border-b border-slate-50">
                     <TableCell className="font-medium text-slate-900">
                        {service.name}
                        <div className="text-xs text-slate-500 font-normal truncate max-w-[250px]">{service.description}</div>
                     </TableCell>
                     <TableCell>{service.durationInMinutes} mins</TableCell>
                     <TableCell className="font-bold text-slate-900">${service.price}</TableCell>
                     <TableCell className="text-right">
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
          </Table>
       </Card>
    </div>
  );
}
