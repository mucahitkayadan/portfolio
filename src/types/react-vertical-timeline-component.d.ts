declare module 'react-vertical-timeline-component' {
  import type { ComponentType, CSSProperties, ReactNode } from 'react';

  export interface VerticalTimelineElementProps {
    className?: string;
    contentStyle?: CSSProperties;
    contentArrowStyle?: CSSProperties;
    date?: string;
    iconStyle?: CSSProperties;
    icon?: ReactNode;
    children?: ReactNode;
  }

  export const VerticalTimeline: ComponentType<{ children?: ReactNode }>;
  export const VerticalTimelineElement: ComponentType<VerticalTimelineElementProps>;
}

declare module 'react-vertical-timeline-component/style.min.css';
