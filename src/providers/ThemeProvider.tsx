import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="class">
      {children}
    </NextThemeProvider>
  );
}
