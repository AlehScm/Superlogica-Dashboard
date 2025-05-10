import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 125 30" // Increased width from 100 to 125
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Superlógica Logo"
      {...props}
    >
      <text 
        x="5" 
        y="22" 
        fontFamily="var(--font-geist-sans), Arial, sans-serif" 
        fontSize="20" 
        fontWeight="bold" 
        fill="currentColor"
      >
        Superlógica
      </text>
    </svg>
  );
}
