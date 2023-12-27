import { useState, useEffect } from "react";
import { getCountry } from "../api/modules/dashboardModule";

const useCountryName = (code) => {
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountry(code);
        setCountryName(response.country_name);
      } catch (error) {}
    };

    fetchData();
  }, [code]);

  return countryName;
};

export default useCountryName;
