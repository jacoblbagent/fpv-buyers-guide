import type { Theme } from '../theme';
import { CATEGORIES } from '../catalog';
import ThemeToggle from './ThemeToggle';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export default function Nav({ theme, onToggle }: Props) {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top">
          fpv<span className="nav__brand-acc">guide</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`}>
              {c.label}
            </a>
          ))}
        </nav>
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>
    </header>
  );
}