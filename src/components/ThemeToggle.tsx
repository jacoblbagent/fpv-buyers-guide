import type { Theme } from '../theme';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        {theme === 'dark' ? (
          // sun
          <>
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
            </g>
          </>
        ) : (
          // moon
          <path
            d="M20 14.2A8.5 8.5 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2Z"
            fill="currentColor"
          />
        )}
      </svg>
    </button>
  );
}