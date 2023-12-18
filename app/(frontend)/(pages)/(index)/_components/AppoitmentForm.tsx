import ScheduleIcon from "@/components/icons/ScheduleIcon";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppoitnmentForm = () => {
  return (
    <div className="relative">
      <header className="md:absolute md:bottom-full w-full text-white uppercase flex items-center gap-2 font-bold px-4 py-6 bg-[rgba(12,_12,_12,_.6)]">
        <ScheduleIcon className="text-[#a89d8e]" height={30} width={30} />{" "}
        Appoitment form
      </header>
      <form className="bg-white p-5 w-full flex flex-col gap-3">
        <DatePicker placeholder="Appoitment time" />
        <Input placeholder="Your full name *" type="text" />
        <Input placeholder="Phone number *" type="tel" />
        <Input placeholder="Email address *" type="email" />
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose gender *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export default AppoitnmentForm;
