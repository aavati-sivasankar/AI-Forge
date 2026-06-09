function LoadingSpinner() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "300px",
      }}
    >
      <div
        className="spinner-border text-primary"
        role="status"
      />

      <p className="mt-3">
        Loading...
      </p>
    </div>
  );
}

export default LoadingSpinner;