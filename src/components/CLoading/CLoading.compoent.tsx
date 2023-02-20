
export const CLoadingComponent = () => {
    return (
        <button 
            role='alertdialog' 
            type="button" 
            className="self-center bg-gray-500 text-white" 
            disabled>
            <svg 
                className="animate-spin h-5 w-5 mr-3" 
                viewBox="0 0 24 24"></svg>
            Loading...
        </button>
    )
}