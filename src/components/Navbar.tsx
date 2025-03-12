import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/activities">Activities</Link>
        <Link href="/media">Media</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </nav>
  );
}
