import { ReactNode } from 'react';

export type StoryProps = {
  active?: number;
  children: ReactNode;
  description?: string;
  image?: string;
  label?: string;
  logo?: string;
  onChange?: (active: number) => void;
  type?: string;
};
