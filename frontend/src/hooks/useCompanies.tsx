import { useEffect, useRef, useState } from "react";

const API = process.env.REACT_APP_BACKEND;

export type CompanyModel = {
  name: string;
  city: string;
};

function useCompanies(searchQuery: string) {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
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
          body: JSON.stringify({ company_query: searchQuery }),
        });
        const data = await response.json();
        setCompanies(data.companies);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    timeout.current = setTimeout(sendRequest, 500);
  }, [searchQuery]);

  return { companies, error, loading };
}
export { useCompanies };
