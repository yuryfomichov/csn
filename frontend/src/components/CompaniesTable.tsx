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
          <TableCell>Id</TableCell>
          <TableCell></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Specialities</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell scope="row">{company.id}</TableCell>
            <TableCell scope="row">
              <img src={company.logo} alt=""></img>
            </TableCell>
            <TableCell scope="row">{company.name}</TableCell>
            <TableCell scope="row">{company.city}</TableCell>
            <TableCell scope="row">{company.specialities.join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { CompaniesTable };
