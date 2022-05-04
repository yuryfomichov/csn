import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { CompanyModel } from "../hooks/useCompanies";

type Props = {
  companies: CompanyModel[];
  loading: boolean;
  error: any;
};

function CompaniesTable({ companies, loading, error }: Props) {
  if (loading && !companies.length) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>Cannot Load the data</>;
  }

  if (companies.length === 0) {
    return <>No data to show</>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>header 3</TableCell>
          <TableCell>header 4</TableCell>
          <TableCell>Header 5</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.name}>
            <TableCell scope="row">{company.name}</TableCell>
            <TableCell scope="row">{company.city}</TableCell>
            <TableCell scope="row">1</TableCell>
            <TableCell scope="row">2</TableCell>
            <TableCell scope="row">3</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { CompaniesTable };
