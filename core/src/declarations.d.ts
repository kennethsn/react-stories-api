declare module '*.jpg' {
  const fileName: string;
  export = fileName;
}
declare module '*.png' {
  const fileName: string;
  export = fileName;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export = content;
}
