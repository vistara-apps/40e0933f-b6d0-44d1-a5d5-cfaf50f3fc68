'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl mb-4">⚖️</div>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          We encountered an error while processing your legal request.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
