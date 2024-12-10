import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filter = ({ title, items, selectLabel }) => {
  return (
    <div className="flex flex-col gap-1 w-[46%] sm:w-fit">
      <p className="text-[14px] text-[#6C7275] w-[180px] text-left font-semibold uppercase">
        {title}
      </p>
      <Select>
        <SelectTrigger className="max-w-[180px]">
          <SelectValue placeholder={selectLabel ?? items[0].label} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, idx) => (
            <SelectItem key={idx} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
