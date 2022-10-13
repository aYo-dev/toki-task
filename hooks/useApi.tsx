import { useEffect, useState } from "react";
import { isEmpty } from 'ramda';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * useApi is hook for fetching data via http request 
 * @param setData - in this task we use useApi to handle only 2 types of data
 * and we can use strict type for the setData parameter
 * but in real scenario the generic type is required
 * @returns 
 */
export const useApi = (setData: <T>(v: T) => void) => {
  const [requestData, setRequestData] = useState({});
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
      setData(result.data);
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

  return { isLoading, isError, request };
};
