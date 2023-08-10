import React from 'react';
import axios from 'axios';
import { GW_URL } from '../config';
import { useQuery } from '@tanstack/react-query';

const useFetchSchoolDetails = ({ school_id, parentConfig }) => {
  const fetchSchoolDetails = async (school_id, parentConfig) => {
    const res = await axios.get(`${GW_URL}/schools/${school_id}`, parentConfig);
    console.log(13, res);
    return res;
  };

  const { data, isLoading, isError, error } = useQuery(['school_id', school_id], () =>
    fetchSchoolDetails(school_id, parentConfig)
  );

  return { data, isLoading, isError, error };
};

export default useFetchSchoolDetails;
