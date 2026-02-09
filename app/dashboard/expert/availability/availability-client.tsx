"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useTransition } from "react";
import { Clock, Loader2 } from "lucide-react";
import { updateAvailability } from "./actions";
import { toast } from "sonner";

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

interface AvailabilityClientProps {
    initialAvailability: {
        days: number[];
        startHour: number;
        endHour: number;
    };
    userId: string;
}

export function AvailabilityClient({ initialAvailability, userId }: AvailabilityClientProps) {
    const [startHour, setStartHour] = useState(initialAvailability.startHour.toString());
    const [endHour, setEndHour] = useState(initialAvailability.endHour.toString());
    const [activeDays, setActiveDays] = useState<number[]>(initialAvailability.days || []);
    const [isPending, startTransition] = useTransition();

    const toggleDay = (dayIndex: number) => {
        if (activeDays.includes(dayIndex)) {
            setActiveDays(activeDays.filter(d => d !== dayIndex));
        } else {
            setActiveDays([...activeDays, dayIndex].sort());
        }
    };

    const handleSave = () => {
        const payload = {
            days: activeDays,
            startHour: parseInt(startHour),
            endHour: parseInt(endHour)
        };

        startTransition(async () => {
            const result = await updateAvailability(userId, payload);
            if (result.success) {
                toast.success("Availability updated");
            } else {
                toast.error(result.error);
            }
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Schedule */}
            <Card className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl">
                <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                    <CardDescription>Configure which days you are available.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {DAYS.map((day, index) => {
                        const isActive = activeDays.includes(index);
                        return (
                            <div key={day} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                                <div className="flex items-center gap-4">
                                    <Switch checked={isActive} onCheckedChange={() => toggleDay(index)} />
                                    <span className={`font-medium ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{day}</span>
                                </div>
                                
                                {isActive ? (
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-slate-700">
                                            {startHour}:00
                                        </div>
                                        <span className="text-slate-400">-</span>
                                        <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-slate-700">
                                            {endHour}:00
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-sm text-slate-400 italic">Unavailable</span>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {/* Global Settings */}
            <div className="space-y-6">
                <Card className="bg-white/60 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock size={16} /> Global Hours
                        </CardTitle>
                        <CardDescription>Update start/end times for all active days.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Start Time</label>
                                <Select value={startHour} onValueChange={setStartHour}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {HOURS.map(h => (
                                            <SelectItem key={h} value={h.toString()}>
                                                {h.toString().padStart(2, '0')}:00
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase">End Time</label>
                                <Select value={endHour} onValueChange={setEndHour}>
                                    <SelectTrigger className="bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {HOURS.map(h => (
                                            <SelectItem key={h} value={h.toString()}>
                                                {h.toString().padStart(2, '0')}:00
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <Button 
                            className="w-full bg-slate-900 text-white mt-4" 
                            onClick={handleSave}
                            disabled={isPending}
                        >
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
