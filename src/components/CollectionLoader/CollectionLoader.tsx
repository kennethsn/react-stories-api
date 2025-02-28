import StatusPage from '../UI/StatusPage/StatusPage';
import type { CollectionLoaderProps } from './CollectionLoader.types';

export default function CollectionLoader({ isFullscreen }: CollectionLoaderProps) {
  return (
    <StatusPage
      isFullscreen={isFullscreen}
      isLoading
      message="Loading collection..."
    />
  );
}
