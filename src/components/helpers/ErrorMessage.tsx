type Props = {
    error?: string | Error | null;
    onRetry?: () => void;
    isRetrying?: boolean;
};

export const ErrorMessage = ({ error, onRetry, isRetrying = false }: Props): React.JSX.Element => {
    const message = typeof error === 'string' ? error : error?.message ?? 'Ocurrió un error';

    return (
        <div role="alert" className="card flex flex-col items-start gap-3 p-4 bg-red-800 border border-red-700">
            <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 8v4" stroke="#FECACA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16h.01" stroke="#FECACA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#FECACA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="text-sm font-semibold text-red-100">Error</h4>
            </div>

            <p className="text-sm text-red-200">{message}</p>

            {onRetry && (
                <div>
                    <button
                        type="button"
                        onClick={onRetry}
                        disabled={isRetrying}
                        className={`px-3 py-2 rounded-md text-sm text-white ${isRetrying ? 'bg-red-600 opacity-70 cursor-wait' : 'bg-red-500 hover:bg-red-400'} transition`}
                    >
                        {isRetrying ? 'Reintentando...' : 'Reintentar'}
                    </button>
                </div>
            )}
        </div>
    );
}
