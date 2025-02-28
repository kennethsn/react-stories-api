import type { ButtonProps } from '@mui/material/Button';

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

export type Button = GoToOptions & {
  readonly color?: Color;
  readonly is_disabled?: boolean;
  readonly label?: string;
  readonly variant?: ButtonProps['variant']; // 'text' | 'outlined' | 'contained'
};

export type CardsLayout = 'grid' | 'stack';

export type CardsBaseMomentData<T> = {
  readonly fit?: MomentContentFit;
  readonly layout?: CardsLayout;
  readonly size?: MomentContentSize;
} & T;

export type CardsMomentData = StoriesMomentData;

export type Collection = {
  readonly badge?: string;
  readonly description?: string;
  readonly featured_stories?: StorySummary[];
  readonly id: number;
  readonly image?: string;
  readonly is_featured?: boolean;
  readonly name: string;
  readonly subtitle?: string;
  readonly stories?: StorySummary[];
  readonly total_stories_count?: number;
};

export type CollectionId = Collection['id'];

export type Color = {
  readonly background: ColorString;
  readonly text?: Nullable<ColorString>;
};

export type ColorHex = `#${string}`;

export type ColorString = ThemeColorOption | ColorHex;

export type DataSource = 'api' | 'local';

export type EditableCollectionKey = 'description' | 'image' | 'name' | 'subtitle';

export type EditableStoryKey = 'description' | 'image' | 'is_featured' | 'label' | 'moments' | 'status';

export type GoToBaseOptions<T> = { readonly newTab?: boolean; } & T;

export type GoToCollectionOptions = GoToBaseOptions<{
  readonly collectionId: Collection['id'];
}>;

export type GoToMomentOptions = GoToStoryOptions & {
  readonly momentId: Moment['id'];
};

export type GoToOptions =
  GoToCollectionOptions |
  GoToMomentOptions |
  GoToStoryOptions |
  GoToURLOptions;

export type GoToStoryOptions = GoToCollectionOptions & {
  readonly storyId: Story['id'];
};

export type GoToURLOptions = GoToBaseOptions<{
  readonly url: string;
}>;

export type GoToPathFn = (path: string) => void;

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

export type Icon = ImageIcon | MuiIcon | NoIcon;

export type IFrameMomentData = {
  readonly iframe: {
    readonly fit?: MomentContentFit;
    readonly size?: MomentContentSize;
    readonly url: string;
  }
};

export type Image = {
  readonly fit?: MomentContentFit;
  readonly position?: string; // Object-fit CSS property for cover fit
  // Note: Size works best with fit: 'cover' or left/right captions
  readonly size?: MomentContentSize;
  readonly url: string;
};

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

export type MomentCaption = AtLeastOne<{
  readonly button?: Button;
  readonly content?: string;
}> & {
  readonly fit?: MomentCaptionFit;
  readonly position?: MomentCaptionPosition;
};

export type MomentCaptionFit = 'card' | 'full-width';

export type MomentCaptionPosition = 'bottom' | 'left' | 'right' | 'top';

export type MomentContentFit = 'card' | 'cover' | 'full';

export type MomentContentSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MomentData =
  ImageMomentData |
  IFrameMomentData |
  HathiTrustMomentData |
  StoriesMomentData |
  TimelineMomentData |
  VideoMomentData |
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
  'base' |
  'hathiTrust' |
  'iframe' |
  'image' |
  'stories' |
  'timeline' |
  'video' |
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

export type NullableString = Nullable<string>;

export type SaveStatus = 'FAILED' | 'SAVING' | 'SUCCESS';

export type SerializableRecord = Record<string, SerializeableValue>;

export type SerializeableValue = boolean | null | number | object | string;

export type StoriesAPIFormatters = {
  readonly collectionPath: string;
  readonly collectionStoriesListHeader: string;
  readonly momentPath: string;
  readonly momentQueryParamKey: string;
  readonly storyCollectionBackButtonLabel: string; // KSN TODO: add support for this
  readonly storyPath: string;
};

export type StoriesAPIStoriesQueryParams = {
  readonly page?: number;
  readonly per_size?: number;
  readonly q?: string;
  readonly statuses?: StoryStatus[];
};

export type StoriesAPIStoriesResponse = {
  readonly count: number;
  readonly last_page: number;
  readonly stories: StorySummary[];
  readonly total_count: number;
};

export type StoriesMomentData = CardsBaseMomentData<{
  readonly stories: StorySummary[];
}>;

export type Story = {
  readonly collection_id: Collection['id'];
  readonly description?: NullableString;
  readonly id: string;
  readonly image?: NullableString;
  readonly is_featured?: boolean;
  readonly label: string;
  readonly moments: Moment[];
  readonly status: StoryStatus;
};

export type StoryId = Story['id'];

export type StoryOrSummary = Story | StorySummary;

export type StoryStatus = 'ARCHIVED' | 'DRAFT' | 'PREVIEW' | 'PUBLISHED';

export type StorySummary = Omit<Story, 'moments'> & {
  readonly moments?: Moment[];
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

export type YouTubeMomentData = AtLeastOne<{ readonly video_id: string; readonly url: string }> &
Omit<VideoMomentData, 'url'>;
