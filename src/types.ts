import type { ButtonProps } from '@mui/material/Button';
import type { SxProps } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';
import type { GeoJSONFeature } from 'maplibre-gl';

import type { THEME_COLOR_OPTIONS } from './constants';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type AV = {
  readonly momentId: Moment['id'];
  readonly pause: () => void | Promise<void>;
  readonly play: () => void | Promise<void>;
  readonly storyId: Story['id'];
  readonly type: AVType;
};

export type AVType = 'audio' | 'video';

export type Award = {
  readonly label: string;
  readonly name?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly year?: string;
  readonly icon?: {
    readonly name: string;
    readonly source: string;
  };
  readonly style?: 'default' | 'ribbon' | 'medal' | 'laurel';
  readonly color: {
    readonly dark: string;
    readonly light: string;
  };
  readonly conferred_by?: {
    readonly label: string;
    readonly description?: string;
    readonly title?: string;
  };
  readonly image?: string;
  readonly website?: string;
};

export type AwardMomentData = {
  readonly name?: string;
  readonly awards: Award[];
  readonly backgroundImage?: string;
};

export type BaseContentBlock<Name=ContentBlockType, T=object> = {
  readonly id?: string;
  readonly sx?: SxProps;
  readonly type: Name;
} & T;

export type Button = GoToOptions & {
  readonly color?: Color;
  readonly is_disabled?: boolean;
  readonly label?: string;
  readonly variant?: ButtonProps['variant']; // 'text' | 'outlined' | 'contained'
};

export type Caption = AtLeastOne<{
  readonly button?: Button;
  readonly content?: string;
}>;

export type CardsLayout = 'grid' | 'orbit' | 'stack';

export type CardsBaseMomentData<T> = {
  readonly fit?: MomentContentFit;
  readonly layout?: CardsLayout;
  readonly size?: MomentContentSize;
} & T;

export type CardsContentMomentData = CardsBaseMomentData<{
  readonly cards: Content[];
  readonly grid_columns_max?: NullableGridColumns;
}>;

export type Collection = {
  readonly badge?: NullableString;
  readonly description?: NullableString;
  readonly featured_stories?: StorySummary[];
  readonly id: number;
  readonly image?: NullableString;
  readonly is_featured?: boolean;
  readonly name: string;
  readonly search_facets?: Nullable<SearchFacets>;
  readonly status: StoriesAPIStatus;
  readonly stories?: StorySummary[];
  readonly subtitle?: NullableString;
  readonly total_stories_count?: number;
};

export type CollectionId = Collection['id'];

export type Color = {
  readonly background: ColorString;
  readonly text?: Nullable<ColorString>;
};

export type ColorHex = `#${string}`;

export type ColorString = ThemeColorOption | ColorHex;

export type Content = {
  readonly blocks: ContentBlock[];
  readonly id?: string;
  readonly sx?: SxProps;
};

export type ContentBlock = TextContentBlock | ImageContentBlock | RichTextContentBlock;

export type ContentBlockType = 'IMAGE' | 'TEXT' | 'RICH_TEXT';

export type DataSource = 'api' | 'local';

export type EditableCollectionKey = 'badge' | 'description' | 'image' | 'name' | 'status' | 'subtitle';

export type EditableStoryKey = 'description' | 'image' | 'is_featured' | 'label' | 'moments' | 'status';

export type GalleryMomentData = {
  readonly fit?: MomentContentFit;
  readonly images: Image[];
  readonly layout?: CardsLayout;
  readonly size?: MomentContentSize;
};

export type GeoCoordinates = {
  readonly latlong: [number, number]; // [latitude, longitude]
  readonly latitude: number;
  readonly longlat: [number, number]; // [longitude, latitude]
  readonly longitude: number;
};

export type GeoMap = {
  readonly feature_collection: StoriesAPIGeoJSONFeatureCollection;
  readonly focal_point: {
    readonly coordinates: GeoCoordinates;
    readonly zoom: number;
  };
  readonly id: GeoMapId;
  readonly information: Record<string, {
    readonly content?: Content;
    readonly description?: string;
    readonly focal_point: GeoMapFocalPoint;
    readonly image?: string;
    readonly key: string;
    readonly label: string;
    readonly tooltip_format: 'LABEL' | 'STORY';
  }>;
  readonly tiles_url?: string;
};

export type GeoMapFocalPoint = {
  readonly coordinates: GeoCoordinates;
  readonly zoom: number;
};

export type GeoMapId = string;

export type GeoMapMomentData = {
  readonly fit?: MomentContentFit;
  readonly geo_map: GeoMap;
  readonly size?: MomentContentSize;
};

export type GoToBaseOptions<T> = {
  readonly formatter?: string;
  readonly new_tab?: boolean;
} & T;

export type GoToCollectionOptions = GoToBaseOptions<{
  readonly collection_id: Collection['id'];
}>;

export type GoToMomentOptions = GoToStoryOptions & {
  readonly moment_id: Moment['id'];
};

export type GoToOptions =
  GoToCollectionOptions |
  GoToMomentOptions |
  GoToStoryOptions |
  GoToURLOptions;

export type GoToStoryOptions = GoToCollectionOptions & {
  readonly story_id: Story['id'];
};

export type GoToURLOptions = GoToBaseOptions<{
  readonly url: string;
}>;

export type GoToPathFn = (path: string) => void;

export type GridColumns = {
  lg?: NullableNumber;
  md?: NullableNumber;
  sm?: NullableNumber;
  xs?: NullableNumber;
};

export type GroupedMoments = Array<MomentOrMomentGroup>;

export type HathiTrustMomentData = AtLeastOne<{
  readonly hathi_trust_id: string;
  readonly url: string;
}> & {
  readonly fit?: MomentContentFit;
  readonly page_number?: number;
  readonly size?: MomentContentSize;
  readonly view?: 'flip' | 'scroll';
};

export type HTMLMomentData = {
  readonly content: string; // HTML String
  readonly fit?: MomentContentFit;
  readonly size?: MomentContentSize;
};

export type Icon = ImageIcon | MuiIcon | NoIcon;

export type IFrameMomentData = {
  readonly iframe: {
    readonly fit?: MomentContentFit;
    readonly size?: MomentContentSize;
    readonly url: string;
  }
};

export type Image = {
  readonly alt?: string;
  readonly caption?: string;
  readonly caption_button?: Button; // TODO: eventually merge with caption
  readonly fit?: MomentContentFit;
  readonly position?: string; // Object-fit CSS property for cover fit
  // Note: Size works best with fit: 'cover' or left/right captions
  readonly size?: MomentContentSize;
  readonly url: string;
};

export type ImageContentBlock = BaseContentBlock<'IMAGE', {
  readonly image: Image;
}>;

export type ImageIcon = {
  readonly name: string;
  readonly type: 'image';
  readonly url: string;
};

export type ImageMomentData = {
  readonly image: Image;
};

export type InputMoment = Omit<Moment, 'icon' | 'id' | 'index'> & {
  readonly icon?: Icon;
  readonly id?: string;
  readonly index?: number;
};

export type InputStory = Omit<Story, 'moments'> & {
  readonly moments: InputMoment[];
};

export type LibraryMomentData = {
  readonly fit?: MomentContentFit;
  readonly graphic?: string;
  readonly onSelect?: (id: string) => void;
  readonly shelves: Record<string, LibraryShelf>
  readonly size?: MomentContentSize;
  readonly title?: string;
};

export type LibraryShelf = {
  readonly graphic?: { url: string };
  readonly items: Array<{
    readonly author?: string;
    readonly color?: {
      accent?: string;
      cover?: string;
      text?: string;
    };
    readonly description?: string;
    readonly id: string;
    readonly image?: string;
    readonly subtitle?: string;
    readonly title: string;
    readonly url?: string;
  }>;
  readonly title?: string;
};

export type MarkdownMomentData = {
  readonly content: string;
  readonly fit?: MomentContentFit;
  readonly size?: MomentContentSize;
};

export type Moment<T=MomentData> = {
  readonly color?: Color;
  readonly data: { caption?: MomentCaption } & T;
  readonly group?: MomentGroup;
  readonly icon?: Icon;
  readonly id: string;
  readonly index: number;
  readonly label: string;
  readonly subtitle?: NullableString;
  readonly title?: NullableString;
  readonly type: MomentType;
};

export type MomentCaption = Caption & {
  readonly fit?: MomentCaptionFit;
  readonly position?: MomentCaptionPosition;
};

export type MomentCaptionFit = 'card' | 'full-width';

export type MomentCaptionPosition = 'bottom' | 'left' | 'right' | 'top';

export type MomentContentFit = 'card' | 'cover' | 'full';

export type MomentContentSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MomentData =
  AwardMomentData |
  CardsContentMomentData |
  GalleryMomentData |
  GeoMapMomentData |
  ImageMomentData |
  IFrameMomentData |
  HathiTrustMomentData |
  HTMLMomentData |
  LibraryMomentData |
  MarkdownMomentData |
  PDFMomentData |
  StatsMomentData |
  StoriesMomentData |
  TextMomentData |
  TimelineMomentData |
  VideoMomentData |
  WikidataMomentData |
  WikipediaMomentData |
  YouTubeMomentData;

export type MomentGroup = {
  readonly id: string;
  readonly label: string;
};

export type MomentGroupWithMoments<T=Moment> = MomentGroup & {
  readonly isGroup: true;
  readonly moments: T[];
};

export type MomentId = Moment['id'];

export type MomentOrMomentGroup = (Moment | MomentGroupWithMoments);

// KSN TODO: remove string when all moments are typed
export type MomentType =
  'award' |
  'base' |
  'gallery' |
  'hathiTrust' |
  'html' |
  'iframe' |
  'image' |
  'library' |
  'markdown' |
  'pdf' |
  'stats' |
  'stories' |
  'text' |
  'timeline' |
  'video' |
  'wikidata' |
  'wikipedia' |
  'youTube' |
  string;

export type MuiIcon = {
  readonly name: string;
  readonly type: 'mui';
};

export type Mutable<T, Keys extends keyof T = keyof T> = {
  -readonly [P in Keys]: T[P];
} & Omit<T, Keys>;

export type MutableCollection = Mutable<Collection, EditableCollectionKey>;

export type MutableMoment<T=MomentData> = Mutable<
Moment<T>,
'color' | 'data' | 'group' | 'icon' | 'index' | 'label' | 'subtitle' | 'title'
>;

export type MutableStory = Mutable<Story, EditableStoryKey>;

export type NoIcon = {
  readonly type: 'none';
};

export type Nullable<T> = T | null | undefined;

export type NullableBoolean = Nullable<boolean>;

export type NullableGridColumns = Nullable<GridColumns>;

export type NullableNumber = Nullable<number>;

export type NullableString = Nullable<string>;

export type ProjectId = number;

export type PDFMomentData = {
  readonly fit?: MomentContentFit;
  readonly size?: MomentContentSize;
  readonly url: string;
};

export type RichTextContentBlock = BaseContentBlock<'RICH_TEXT', {
  readonly html: string;
}>;

export type SaveStatus = 'FAILED' | 'SAVING' | 'SUCCESS';

export type SearchFacet = {
  readonly key: string;
  readonly label?: NullableString;
  readonly fill_rate: number;
  readonly value_refs: SearchFacetValueRef[];
};

export type SearchFacets = SearchFacet[];

export type SearchFacetValueRef = {
  readonly count: number;
  readonly fill_rate: number;
  readonly label?: NullableString;
  readonly value: string;
};

export type SelectedSearchFacets = Record<string, string[]>;

export type SerializableRecord = Record<string, SerializeableValue>;

export type SerializeableValue = boolean | null | number | object | string;

export type Stat = {
  readonly color?: {
    background: string;
  };
  readonly description?: string;
  readonly icon?: Icon;
  readonly image?: string;
  readonly label?: string;
  readonly type: StatType;
  readonly url?: string;
  readonly value?: StatValue;
};

export type StatListValueItem = {
  readonly description?: string;
  readonly icon?: Icon;
  readonly label: string;
};

export type StatsMomentData = CardsBaseMomentData<{
  readonly stats: Stat[];
}>;

export type StatNumberValue = {
  readonly amount: number;
  readonly unit?: string;
};

export enum StatType {
  list = 'list',
  number = 'number',
  string = 'string',
}

export type StatValue = string | StatListValueItem[] | StatNumberValue;

export type StoriesAPICollectionsQueryParams = {
  readonly page?: number; // KSN TODO: Pagination
  readonly page_size?: number; // KSN TODO: Pagination
  readonly q?: string; // KSN TODO: Search
  readonly featured?: boolean;
  readonly project_id: ProjectId;
  readonly statuses?: StoriesAPIStatus[];
};

export type StoriesAPICollectionsResponse = StoriesAPIListResponse<{
  readonly collections: Collection[];
}>;

export type StoriesAPIFormatters = {
  readonly collectionPageTitle: string;
  readonly collectionPath: string;
  readonly collectionStoriesListHeader: string;
  readonly momentPath: string;
  readonly momentQueryParamKey: string;
  readonly storyCollectionButtonLabel: string; // KSN TODO: add support for this
  readonly storyPageTitle: string;
  readonly storyPath: string;
};

export type StoriesAPIGeoJSONFeature<T=object> = {
  readonly geometry: GeoJSONFeature['geometry'];
  readonly properties: StoriesAPIGeoJSONFeatureProperties & T;
  readonly type: 'Feature';
};

export type StoriesAPIGeoJSONFeatureCollection = {
  readonly features: StoriesAPIGeoJSONFeature[];
  readonly type: 'FeatureCollection';
};

export type StoriesAPIGeoJSONFeatureProperties = {
  readonly elevation?: NullableNumber;
  readonly focal_point: GeoMapFocalPoint;
  readonly information_key: string;
};

export type StoriesAPIListResponse<T> = {
  readonly count: number;
  readonly last_page: number;
  readonly total_count: number;
} & T;

export type StoriesAPIStatus = 'ARCHIVED' | 'DRAFT' | 'PREVIEW' | 'PUBLISHED';

export type StoriesAPIStoriesQueryParams = {
  readonly page?: number;
  readonly page_size?: number;
  readonly q?: string;
  readonly statuses?: StoriesAPIStatus[];
};

export type StoriesAPIStoriesResponse = StoriesAPIListResponse<{
  readonly stories: StorySummary[];
}>;

export type StoriesMomentData = CardsBaseMomentData<{
  readonly stories: StorySummary[];
}>;

export type Story = {
  readonly collection_id: CollectionId;
  readonly collection_name: string;
  readonly description?: NullableString;
  readonly id: string;
  readonly image?: NullableString;
  readonly is_featured?: boolean;
  readonly label: string;
  readonly moments: Moment[];
  readonly status: StoriesAPIStatus;
};

export type StoryId = Story['id'];

export type StoryOrSummary = Story | StorySummary;

export type StorySummary = Omit<Story, 'moments'> & {
  readonly moments?: Moment[];
};

export type TextContentBlock = BaseContentBlock<'TEXT', {
  readonly text: string;
  readonly variant?: TypographyProps['variant'];
}>;

export type TextMomentData = {
  readonly caption: {
    content: string;
    position?: MomentCaptionPosition;
  };
};

export type ThemeColorOption = typeof THEME_COLOR_OPTIONS[number];

export type Timeline = {
  readonly events: TimelineEvent[];
};

export type TimelineEvent = {
  readonly button?: Button,
  readonly dot?: {
    readonly type: 'icon';
    readonly icon: Icon;
  } | {
    readonly type: 'text';
    readonly text?: string // Defaults to date.year
  },
  readonly date: {
    readonly day?: number;
    readonly label: string;
    readonly month?: number;
    readonly year?: number;
  };
  readonly description?: string;
  readonly image?: {
    readonly alt: string;
    readonly position?: string; // Object-fit CSS property for cover fit
    readonly url: string;
  };
  readonly title: string;
};

export type TimelineMomentData = {
  readonly fit?: MomentContentFit;
  readonly size?: MomentContentSize;
  readonly timeline: Timeline;
};

export type VideoMomentData = {
  readonly fit?: MomentContentFit;
  readonly show_controls?: boolean;
  readonly size?: MomentContentSize;
  readonly start_at?: number; // Seconds
  readonly url: string;
};

export type WikidataMomentData = WikimediaBaseMomentData<AtLeastOne<{
  readonly entity_id: string; // QID
  readonly url: string;
}>>;

export type WikimediaBaseMomentData<T> = {
  readonly fit?: MomentContentFit;
  readonly language_code?: string;
  readonly size?: MomentContentSize;
} & T;

export type WikipediaMomentData = WikimediaBaseMomentData<AtLeastOne<{
  readonly page_key: string;
  readonly url: string;
}>>;

export type YouTubeMomentData = AtLeastOne<{ readonly video_id: string; readonly url: string }> &
Omit<VideoMomentData, 'url'>;
