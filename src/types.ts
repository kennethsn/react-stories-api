export interface Collection {
  description: string;
  id: number;
  name: string;
}

export interface Color {
  background: string;
  text?: NullableString;
}

export type GroupedMoments = Array<MomentOrMomentGroup>;

export type Icon = ImageIcon | MuiIcon | NoIcon;

export type Image = {
  fit?: ImageFit;
  // Note: Size works best with fit: 'cover' or left/right captions
  size?: ImageSize;
  url: string;
};

export type ImageCaption = {
  content: string;
  fit?: ImageCaptionFit;
  position?: ImageCaptionPosition;
};

export type ImageCaptionFit = 'card' | 'full-width';

export type ImageCaptionPosition = 'bottom' | 'left' | 'right' | 'top';

export type ImageFit = 'card' | 'cover' | 'full';

export type ImageIcon = {
  type: 'image';
  url: string;
};

export type ImageMomentData = {
  caption?: ImageCaption;
  image: Image;
};

export type ImageSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type InputMoment = Omit<Moment, 'index' | 'icon'> & {
  icon?: Icon;
  index?: number;
};

export type InputStory = Omit<Story, 'moments'> & {
  moments: InputMoment[];
};

export type Moment<T=MomentData> = {
  color?: Color;
  data: T;
  group?: MomentGroup;
  icon: Icon;
  index: number;
  label: string;
  subtitle?: NullableString;
  title?: NullableString;
  type: MomentType;
};

export type MomentData = ImageMomentData;

export type MomentGroup = {
  id: string;
  label: string;
};

export type MomentGroupWithMoments = MomentGroup & { moments: Moment[] };

export type MomentOrMomentGroup = (Moment | MomentGroupWithMoments) & { key: string };

// KSN TODO: remove string when all moments are typed
export type MomentType = 'base' | 'image' | 'video' | string;

export type MuiIcon = {
  name: string;
  type: 'mui';
};

export type NoIcon = {
  type: 'none';
};

type NullableString = string | null;

export interface Story {
  description?: NullableString;
  id: string;
  image?: NullableString;
  label: string;
  moments: Moment[];
}
