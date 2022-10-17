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

interface SelectProps {
  options: string[];
  onChange: (v: string) => void;
  label: string;
  defaultValue: string;
}

export default function SelectButton({options, onChange, label, defaultValue}: SelectProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as DataCategories);
    onChange(event.target.value as DataCategories);
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