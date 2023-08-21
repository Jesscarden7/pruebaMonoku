import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:4000/api";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, options) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, options);
      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        console.log(data);
        setError(data.msg || "Error desconocido");
      }

      return data;
    } catch (err) {
      setLoading(false);
      setError("Contacte al administrador.");
      throw err;
    }
  }, []);

  return { loading, error, fetchData };
};

export default useApi;
