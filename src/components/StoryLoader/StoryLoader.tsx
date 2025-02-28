import StatusPage from '../UI/StatusPage/StatusPage';
import type { StoryLoaderProps } from './StoryLoader.types';

export default function StoryLoader({ isFullscreen }: StoryLoaderProps) {
  return (
    <StatusPage
      isFullscreen={isFullscreen}
      isLoading
      message="Building your story..."
    />
  );
}
