import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search words, translations, or definitions",
}: SearchInputProps) {
  return (
    <label className="flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-3 shadow-[0_18px_48px_rgba(148,163,184,0.12)] backdrop-blur-xl">
      <Search className="h-4 w-4 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}
