import { useState } from 'react';
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { nanoid } from 'nanoid';

interface SelectProps {
  options: string[];
  onChange: (v: string) => void;
}

export default function SelectButton({options, onChange}: SelectProps) {
  const [value, setValue] = useState(options[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="toki-select-label">Category</InputLabel>
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