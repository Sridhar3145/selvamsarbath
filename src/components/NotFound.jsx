

function NotFound() {
 return (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
   <h1 className="text-6xl font-bold text-red-500">404</h1>

   <h2 className="mt-4 text-2xl font-semibold">
    Oops! Page Not Found
   </h2>

   <p className="mt-2 text-gray-600">
    The page you are looking for doesn't exist.
   </p>
  </div>
 );
}

export default NotFound;