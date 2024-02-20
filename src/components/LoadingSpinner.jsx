import ClipLoader from 'react-spinners/ClipLoader';

export default function LoadingSpinner() {
  return (
    <div className="grid h-72 place-content-center">
      <ClipLoader
        color={'#6366f1'}
        loading={true}
        cssOverride={{}}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
