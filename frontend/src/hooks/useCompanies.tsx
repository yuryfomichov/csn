import { useEffect, useState } from "react";

const API = process.env.REACT_APP_BACKEND;

function useCompanies() {
  const [companies, setCompanies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(`${API}/api/companies`, {
          method: "POST",
        });
        const companies = await response.json();
        setCompanies(companies);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { companies, error, loading };
}
export { useCompanies };
