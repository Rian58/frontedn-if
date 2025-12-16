import { useState, useEffect } from "react";
import apiClient from "../api/index";

const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(endpoint, options);
        if (response.data.data) {
          setData(response.data);
        } else {
          setData(response.data);
        }
      } catch (err) {
        console.error(`Error Fetching ${endpoint}`, err);
        setError(err.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, JSON.stringify(options)]);
  return { data, loading, error };
};

export default useFetch;
