import { ChangeEvent, useState } from 'react';
import { Option, SelectedOption } from '../types';

type CustomSelectProps = {
  label: string;
  options: Option[];
  onChange: (obj: SelectedOption) => void;
};

export default function CustomSelect({
  label,
  options,
  onChange,
}: CustomSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const label = event.target.selectedOptions[0].getAttribute('data-label')!;
    setSelectedValue(value);
    onChange({
      value,
      label,
    });
  };

  return (
    <div className="flex w-1/4 items-center">
      <label
        htmlFor={`select-${label}`}
        className="mr-4 whitespace-nowrap text-xl font-medium"
      >
        {label}
      </label>
      <select
        id={`select-${label}`}
        value={selectedValue}
        onChange={handleChange}
        className="block w-full appearance-none rounded border border-gray-300 bg-white px-3 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      >
        <option value="" data-label="-">
          -
        </option>
        {options.map((option, i) => (
          <option
            key={`${option.value}-${i}`}
            value={option.value}
            data-label={option.label}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
