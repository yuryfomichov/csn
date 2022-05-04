import { useEffect, useRef, useState } from "react";

const API = process.env.REACT_APP_BACKEND;

export enum Specialities {
  Plumbing = "plumbing",
  Electrical = "electrical",
  Painting = "painting",
  Carpentry = "carpentry",
  Cleaning = "cleaning",
}

export type CompanyModel = {
  id: number;
  name: string;
  city: string;
  logo: string;
  specialities: Specialities[];
};

function useCompanies(searchQuery: string, specialitiesFilter: string[]) {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeout = useRef<any>();

  useEffect(() => {
    clearTimeout(timeout.current);

    const sendRequest = async function () {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/companies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_query: searchQuery,
            specialities: specialitiesFilter,
          }),
        });
        const data = await response.json();
        setCompanies(data.companies);
        setCount(data.count);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    timeout.current = setTimeout(sendRequest, 500);
  }, [searchQuery, specialitiesFilter]);

  return { companies, count, error, loading };
}
export { useCompanies };
