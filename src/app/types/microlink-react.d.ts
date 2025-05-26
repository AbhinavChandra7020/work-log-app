declare module '@microlink/react' {
  import * as React from 'react';

  interface MicrolinkProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string;
    size?: 'small' | 'normal' | 'large';
    media?: 'logo' | 'image' | 'video';
    theme?: 'light' | 'dark';
    style?: React.CSSProperties;
    className?: string;
  }

  const Microlink: React.FC<MicrolinkProps>;

  export default Microlink;
}
