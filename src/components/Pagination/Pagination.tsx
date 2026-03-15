type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  ariaLabel?: string;
};

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  ariaLabel = 'Paginación',
}: Props): React.JSX.Element | null => {
  if (totalPages <= 1) return null;

  const left = Math.max(2, currentPage - siblingCount);
  const right = Math.min(totalPages - 1, currentPage + siblingCount);

  const shouldShowLeftDots = left > 2;
  const shouldShowRightDots = right < totalPages - 1;

  const pages: (number | 'DOT')[] = [1];

  if (shouldShowLeftDots) {
    pages.push('DOT');
  } else {
    pages.push(...range(2, left - 1));
  }

  pages.push(...range(left, right));

  if (shouldShowRightDots) {
    pages.push('DOT');
  } else {
    pages.push(...range(right + 1, totalPages - 1));
  }

  pages.push(totalPages);

  const onClickPage = (p: number) => {
    if (p === currentPage) return;
    onPageChange(p);
  };

  return (
    <nav aria-label={ariaLabel} className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Anterior"
        className="px-2 py-1 rounded-md bg-gray-800 text-gray-100 disabled:opacity-50"
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === 'DOT' ? (
          <span key={`dot-${idx}`} className="px-2 py-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === currentPage ? 'page' : undefined}
            onClick={() => onClickPage(p)}
            className={`px-3 py-1 rounded-md ${p === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-100'}`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Siguiente"
        className="px-2 py-1 rounded-md bg-gray-800 text-gray-100 disabled:opacity-50"
      >
        ›
      </button>
    </nav>
  );
};
