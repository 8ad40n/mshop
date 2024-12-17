import { CategoryPie } from "@/components/Dashboard/categoryPie";
import { MonthlyOrderCount } from "@/components/Dashboard/monthlyOrderCount";
import UpperBoxData from "@/components/Dashboard/upperBoxData";

export default function Page() {
  return (
    <div className="container px-3 md:px-8">
      <div className="text-3xl font-semibold text-left pl-6 py-4 bg-slate-600 shadow-2xl rounded-2xl text-white">
        Dashboard
      </div>

      <UpperBoxData/>
      <div className="flex justify-between items-stretch space-x-4">
        <div className="flex-1">
          <CategoryPie />
        </div>
        <div className="flex-1">
          <MonthlyOrderCount />
        </div>
      </div>
    </div>
  );
}
