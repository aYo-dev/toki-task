import { useState } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { DataCategories } from '../enums';

interface SelectProps<T> {
  options: string[];
  onChange: (v: T) => void;
  label: string;
  defaultValue: T;
}

export default function SelectButton<A>({options, onChange, label, defaultValue}: SelectProps<string>) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="toki-select-label">{label}</InputLabel>
      <Select
        labelId="toki-select-label"
        id="toki-select"
        value={value}
        label={value}
        onChange={handleChange}
      >
        {options.map(el => (<MenuItem key={nanoid()} value={el}>{el}</MenuItem>))}
      </Select>
    </FormControl>
  );
}