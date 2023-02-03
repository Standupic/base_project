import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authorization from '../thunks/authorization';

const useAuthorization = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorization({}));
  }, []);
};

export default useAuthorization;
