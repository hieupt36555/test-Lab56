import React from 'react';
import { useLoading } from '../context/loadingContext';

const LoadingSpinner: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loading-spinner">
      <div className=" text-primary" >
        <span className="">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
