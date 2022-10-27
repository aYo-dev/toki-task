import { useEffect, useState } from "react";
import { isEmpty } from 'ramda';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * useApi is hook for fetching data via http request 
 * @param responseDataDefaultValue - Initial state of the response data
 * @returns 
 */
export const useApi = <T,>(responseDataDefaultValue: T) => {
  const [requestData, setRequestData] = useState({});
  const [responseData, setResponseData] = useState(responseDataDefaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const request = (data: AxiosRequestConfig) => {
    setRequestData(data);
  }

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(requestData);
      setResponseData(result.data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if(!isEmpty(requestData)) {
      fetchData();
    }
  }, [requestData]);

  return { isLoading, isError, request, responseData };
};
