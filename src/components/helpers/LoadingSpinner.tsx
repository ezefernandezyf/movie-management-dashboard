type Props = {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
};

export const LoadingSpinner = ({
  size = 'md',
  label = 'Cargando...',
}: Props): React.JSX.Element => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center">
      <svg
        className={`${sizeClass} animate-spin text-indigo-400`}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.2" />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};
