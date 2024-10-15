type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export interface Collection {
  readonly description: string;
  readonly id: number;
  readonly name: string;
}

export interface Color {
  readonly background: string;
  readonly text?: NullableString;
}

export type GroupedMoments = Array<MomentOrMomentGroup>;

export type HathiTrustMomentData = AtLeastOne<{ hathi_trust_id: string; url: string }> & {
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

export type InputMoment = Omit<Moment, 'index' | 'icon'> & {
  readonly icon?: Icon;
  readonly index?: number;
};

export type InputStory = Omit<Story, 'moments'> & {
  readonly moments: InputMoment[];
};

export type Moment<T=MomentData> = {
  readonly color?: Color;
  readonly data: { caption?: MomentCaption } & T;
  readonly group?: MomentGroup;
  readonly icon: Icon;
  readonly index: number;
  readonly label: string;
  readonly subtitle?: NullableString;
  readonly title?: NullableString;
  readonly type: MomentType;
};

export type MomentCaption = {
  readonly content: string;
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
  TimelineMomentData |
  YouTubeMomentData;

export type MomentGroup = {
  readonly id: string;
  readonly label: string;
};

export type MomentGroupWithMoments = MomentGroup & { moments: Moment[] };

export type MomentOrMomentGroup = (Moment | MomentGroupWithMoments) & { key: string };

// KSN TODO: remove string when all moments are typed
export type MomentType = 'base' | 'hathiTrust' | 'iframe' | 'image' | 'timeline' | 'youTube' | string;

export type MuiIcon = {
  readonly name: string;
  readonly type: 'mui';
};

export type NoIcon = {
  readonly type: 'none';
};

type NullableString = string | null;

export interface Story {
  readonly description?: NullableString;
  readonly id: string;
  readonly image?: NullableString;
  readonly label: string;
  readonly moments: Moment[];
}

export type Timeline = {
  readonly events: TimelineEvent[];
};

export type TimelineEvent = {
  readonly button?: {
    readonly label?: string;
    readonly url: string;
  },
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

export type YouTubeMomentData = AtLeastOne<{ readonly video_id: string; readonly url: string }> & {
  readonly fit?: MomentContentFit;
  readonly show_controls?: boolean;
  readonly size?: MomentContentSize;
  readonly start_at?: number; // Seconds
};
