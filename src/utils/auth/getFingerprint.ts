import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();

  return visitorId;
};
