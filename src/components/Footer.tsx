import { GitBranchPlus, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex space-x-4">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <GitBranchPlus className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
}
