import { TextField } from '@material-ui/core';

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
