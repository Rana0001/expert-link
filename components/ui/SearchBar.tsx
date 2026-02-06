import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="max-w-md mx-auto relative">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <form action="/browse" className="relative bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl flex items-center gap-2">
          <Search className="ml-4 text-slate-400 dark:text-slate-500" size={20} />
          <input 
            type="text" 
            name="q"
            placeholder="Search 'React', 'Marketing', 'Legal'..."
            className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 h-10 w-full"
          />
          <Button type="submit" size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700">
            Find Expert
          </Button>
        </form>
      </div>
    </div>
  );
}
