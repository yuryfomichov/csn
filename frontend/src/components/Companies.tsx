import { useCompanies } from "../hooks/useCompanies";

function Companies() {
  const { companies, loading, error } = useCompanies();
  return <>{JSON.stringify(companies)}</>;
}

export { Companies };
