import * as React from 'react';
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

interface SelectProps {
  options: string[];
  onChange: (v: string) => void;
}

export default function SelectButton({options, onChange}: SelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="toki-select-label">Age</InputLabel>
      <Select
        labelId="toki-select-label"
        id="toki-select"
        value={options[0]}
        label={options[0]}
        onChange={handleChange}
      >
        {options.map(el => (<MenuItem value={el}>el</MenuItem>))}
      </Select>
    </FormControl>
  );
}