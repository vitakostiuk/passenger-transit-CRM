/** @jsxImportSource @emotion/react */

import PulseLoader from 'react-spinners/PulseLoader';

const wrapperStyles = {
  position: 'absolute',
  top: 0,
  left: '30%',
};

const Loader = () => {
  return (
    <div css={wrapperStyles}>
      <PulseLoader margin={300} size={13} color={'#4f65f1'} />
    </div>
  );
};

export default Loader;
