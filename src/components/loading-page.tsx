export function LoadingPage({className}: {className?: string}) {
    return (
        <div className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center h-screen ${className ? ` ${className}` : ''}`}>
            <div className="loader"></div>
        </div>
    );
}