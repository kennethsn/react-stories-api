import type LibraryMomentStore from '../../../state/moments/libraryMomentStore';

export type BookItem = {
  readonly color?: {
    readonly accent?: string;
    readonly cover?: string;
    readonly text?: string;
  };
  readonly author?: string;
  readonly description?: string;
  readonly image?: string;
  readonly instance?: string;
  readonly label: string;
  readonly manifest_url?: string;
  readonly provider?: string;
  readonly title?: string;
  readonly url?: string;
};

export type BookshelfProps = {
  readonly graphic?: { readonly url: string };
  readonly items: BookItem[];
  readonly moment: LibraryMomentStore;
  readonly onSelect?: (book: BookItem) => void;
  readonly style?: React.CSSProperties;
  readonly title: string;
};
