import { InfinitySpin } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

export const Loader = () => {
  return (
    <>
      <Spinner>
        <InfinitySpin width="300" color="#cc3366 " />
      </Spinner>
    </>
  );
};
