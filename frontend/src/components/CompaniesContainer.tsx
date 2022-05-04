import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useCompanies } from "../hooks/useCompanies";
import { CompaniesTable } from "./CompaniesTable";

function CompaniesContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const { companies, loading, error } = useCompanies(searchQuery);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ padding: 1 }}>
        <TextField
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          id="standard-basic"
          label="Company name"
          variant="standard"
        />{" "}
      </Box>
      <CompaniesTable companies={companies} loading={loading} error={error} />
    </Box>
  );
}

export { CompaniesContainer };
