"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreHorizontal, Loader2, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createService, deleteService } from "./actions";
import { toast } from "sonner";
import { Service } from "@prisma/client";

interface ServicesClientProps {
    initialServices: Service[];
    userId: string;
}

export function ServicesClient({ initialServices, userId }: ServicesClientProps) {
    const [services, setServices] = useState(initialServices);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = (serviceId: string) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        
        startTransition(async () => {
            const result = await deleteService(serviceId, userId);
            if (result.success) {
                toast.success("Service deleted");
            } else {
                toast.error(result.error || "Failed to delete");
            }
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Services</h2>
                    <p className="text-slate-500">Manage your consultation offerings and pricing.</p>
                </div>
                <Button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
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
                        {initialServices.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-slate-500">
                                    No services found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        ) : (
                            initialServices.map((service) => (
                                <TableRow key={service.id} className="hover:bg-white/40 border-b border-slate-50">
                                    <TableCell className="font-medium text-slate-900">
                                        {service.name}
                                        <div className="text-xs text-slate-500 font-normal truncate max-w-[250px]">{service.description}</div>
                                    </TableCell>
                                    <TableCell>{service.duration_minutes} mins</TableCell>
                                    <TableCell className="font-bold text-slate-900">${Number(service.price)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => handleDelete(service.id)}
                                                disabled={isPending}
                                                className="text-slate-400 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>

            <CreateServiceDialog 
                open={isCreateOpen} 
                onOpenChange={setIsCreateOpen} 
                userId={userId} 
            />
        </>
    );
}

function CreateServiceDialog({ open, onOpenChange, userId }: { open: boolean; onOpenChange: (open: boolean) => void; userId: string }) {
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        startTransition(async () => {
            const result = await createService(userId, {}, formData);
            if (result.success) {
                toast.success("Service created");
                onOpenChange(false);
            } else {
                toast.error(result.error);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                        Create a new consultation offering for your clients.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Service Name</Label>
                        <Input id="name" name="name" placeholder="e.g. 1:1 Consultation" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Briefly describe what's included..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duration (min)</Label>
                            <Input id="duration" name="duration" type="number" defaultValue="30" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input id="price" name="price" type="number" step="0.01" defaultValue="50.00" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
