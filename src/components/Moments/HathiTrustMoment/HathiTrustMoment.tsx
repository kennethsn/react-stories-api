import { buildIFrameMomentFromHathiTrust } from '../../../utils/hathiTrustUtils';
import IFrameMoment from '../IFrameMoment/IFrameMoment';
import type { HathiTrustMomentProps } from './HathiTrustMoment.types';

export default function HathiTrustMoment({ moment }: HathiTrustMomentProps) {
  const iframeMoment = buildIFrameMomentFromHathiTrust(moment);
  return (
    <IFrameMoment moment={iframeMoment} />
  );
}
