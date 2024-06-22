import { useEffect } from 'react';

export function LoadingOverlay() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-3 bg-black/90 h-screen w-full fixed top-0 left-0 z-50">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <path
          d="M36.6666 20C36.6666 29.2047 29.2047 36.6667 19.9999 36.6667C10.7952 36.6667 3.33325 29.2047 3.33325 20C3.33325 10.7953 10.7952 3.33334 19.9999 3.33334C29.2047 3.33334 36.6666 10.7953 36.6666 20ZM7.49992 20C7.49992 26.9036 13.0964 32.5 19.9999 32.5C26.9035 32.5 32.4999 26.9036 32.4999 20C32.4999 13.0964 26.9035 7.5 19.9999 7.5C13.0964 7.5 7.49992 13.0964 7.49992 20Z"
          fill="#505050"
        />
        <path
          d="M19.9999 3.33334C22.1886 3.33334 24.3559 3.76443 26.378 4.60201C28.4001 5.43959 30.2374 6.66725 31.785 8.21489C33.3327 9.76253 34.5603 11.5999 35.3979 13.6219C36.2355 15.644 36.6666 17.8113 36.6666 20L32.4999 20C32.4999 18.3585 32.1766 16.733 31.5484 15.2165C30.9202 13.6999 29.9995 12.3219 28.8387 11.1612C27.678 10.0004 26.3 9.07969 24.7835 8.45151C23.2669 7.82333 21.6414 7.5 19.9999 7.5L19.9999 3.33334Z"
          fill="white"
        />
      </svg>
      <h2 className='text-white'>Cargando...</h2>
    </div>
  );
}
