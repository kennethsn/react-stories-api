import LibraryMomentStore from '../../../state/moments/libraryMomentStore';

export interface BookItem {
  color?: {
    accent: string;
    cover: string;
    text: string;
  };
  author?: string;
  description?: string;
  image?: string;
  instance?: string;
  label: string;
  manifest_url?: string;
  provider?: string;
  url?: string;
}

export interface BookshelfProps {
  graphic?: { url: string };
  items: BookItem[];
  moment: LibraryMomentStore;
  onSelect?: (book: BookItem) => void;
  style?: React.CSSProperties;
  title: string;
}
