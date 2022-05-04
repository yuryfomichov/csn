import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Specialities, useCompanies } from "../hooks/useCompanies";
import { CompaniesTable } from "./CompaniesTable";

function CompaniesContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialitiesFilter, setSpecialitiesFilter] = useState<Specialities[]>(
    []
  );
  const { companies, count, loading, error } = useCompanies(
    searchQuery,
    specialitiesFilter
  );

  const handleChange = (event: SelectChangeEvent<Specialities[]>) => {
    const {
      target: { value },
    } = event;
    setSpecialitiesFilter(
      typeof value === "string" ? (value.split(",") as Specialities[]) : value
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" flexDirection="row" sx={{ padding: 1 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            label="Company name"
            variant="standard"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-label">Specialities Filter</InputLabel>
          <Select
            labelId="multiple-label"
            id="demo-multiple-name"
            multiple
            value={specialitiesFilter}
            onChange={handleChange}
            variant="standard"
          >
            {Object.values(Specialities).map((name: string) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <CompaniesTable companies={companies} loading={loading} error={error} />
      <Box sx={{ padding: 1 }}>{count}</Box>
    </Box>
  );
}

export { CompaniesContainer };
