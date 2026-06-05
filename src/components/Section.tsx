import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

export default function Section({ children, className = '', id, style, fullWidth = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={className} 
      style={{
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        ...style
      }}
    >
      <div className={fullWidth ? 'full-width' : 'container'}>
        {children}
      </div>
    </section>
  );
}
