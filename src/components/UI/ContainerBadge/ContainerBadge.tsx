import { classNames } from '../../../utils/dom';
import TypographyBadge from '../TypographyBadge/TypographyBadge';
import styles from './ContainerBadge.styles';
import type { ContainerBadgeProps } from './ContainerBadge.types';

export default function ContainerBadge(props: ContainerBadgeProps) {
  const {
    children, className, color, textSx,
  } = props;
  return (
    <TypographyBadge
      className={classNames('container-badge', className)}
      color={color}
      sx={styles.root(props) as never}
      textSx={textSx}
    >
      {children}
    </TypographyBadge>
  );
}
