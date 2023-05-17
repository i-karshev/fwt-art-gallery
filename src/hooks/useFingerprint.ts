import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const useFingerprint = () => {
  const [fingerprintHash, setFingerprintHash] = useState('');

  useEffect(() => {
    const setFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setFingerprintHash(visitorId);
    };
    // eslint-disable-next-line no-void
    void setFingerprint();
  }, []);

  return fingerprintHash;
};
