import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound: FC = () => {
  const nav = useNavigate();

  useEffect(
    () =>
      nav('/', {
        replace: true,
      }),
    [],
  );

  return null;
};

export default PageNotFound;
