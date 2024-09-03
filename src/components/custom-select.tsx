import { ChangeEvent, useState } from 'react';
import { Option } from '../types';

type CustomSelectProps = {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label,
  options,
  onChange,
}: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <label htmlFor={`select-${label}`} className="mr-4 text-xl font-medium">
        {label}
      </label>
      <select
        id={`select-${label}`}
        value={selectedValue}
        onChange={handleChange}
        className="block appearance-none rounded border border-gray-300 bg-white px-3 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      >
        <option value="">-</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
