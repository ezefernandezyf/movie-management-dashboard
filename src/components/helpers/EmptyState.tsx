type Props = {
    title?: string;
    description?: string;
    ctaLabel?: string;
    onCta?: () => void;
};

export const EmptyState = ({
    title = 'No se encontraron resultados',
    description = 'Intenta con otra búsqueda o crea una nueva película.',
    ctaLabel,
    onCta,
}: Props): React.JSX.Element => {
    return (
        <section className="flex flex-col items-center gap-4 text-center p-8 card">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 5h18v12H3z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 19h18" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
            <p className="text-sm text-gray-400 max-w-md">{description}</p>

            {ctaLabel && onCta && (
                <button
                    type="button"
                    onClick={onCta}
                    className="mt-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
                >
                    {ctaLabel}
                </button>
            )}
        </section>
    );
}