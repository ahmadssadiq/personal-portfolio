import Link from 'next/link';

export default function Navigation() {
  return (
    <div>
      <p className="mb-8 text-base font-normal text-muted">Azimov</p>
      <nav className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-base font-medium text-muted hover:text-link-hover"
        >
          About
        </Link>
        <Link
          href="/news"
          className="text-base font-medium text-muted hover:text-link-hover"
        >
          News
        </Link>
      </nav>
    </div>
  );
}