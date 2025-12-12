import Link from 'next/link';

export const Nav = () => (
  <nav className="flex justify-around p-4 bg-gray-200 dark:bg-gray-800">
    <Link href="/app/dashboard">Dashboard</Link>
    <Link href="/app/analytics">Analytics</Link>
    <Link href="/app/trends">Trends</Link>
    <Link href="/app/library">Library</Link>
    <Link href="/app/commitment">Commitment</Link>
  </nav>
);
