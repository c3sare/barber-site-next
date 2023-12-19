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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AppoitnmentForm = () => {
  return (
    <div className="relative">
      <header className="md:absolute md:bottom-full w-full text-white uppercase flex items-center gap-2 font-bold px-4 py-6 bg-[rgba(12,_12,_12,_.6)]">
        <ScheduleIcon className="text-[#a89d8e]" height={30} width={30} />{" "}
        Appoitment form
      </header>
      <form className="bg-white p-5 w-full flex flex-col gap-3 border-x border-b border-gray-100">
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
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <label
            htmlFor="newsletter"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to our newsletter. We won{"'"}t spam!
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree with the{" "}
            <Link className="underline" href="/terms">
              terms and conditions
            </Link>
            .
          </label>
        </div>
        <div className="py-4 flex gap-x-2 justify-center mx-[-20px] border-t border-t-gray-100">
          <Button type="submit">SUBMIT</Button>
          <Button type="reset">RESET</Button>
        </div>
      </form>
    </div>
  );
};

export default AppoitnmentForm;
