import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useKycManager = () => {
  // const kycContract = useContra;
  const [state, setState] = useState(false);
  return [state, setState];
};
