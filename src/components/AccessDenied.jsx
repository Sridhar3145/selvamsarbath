export default function AccessDenied() {
 return (
  <div className=" flex flex-col items-center justify-center min-h-[70vh] bg-[#F4F6FD] px-4">
   <h1 className="text-6xl font-bold text-red-500 mb-4">
    403
   </h1>

   <h2 className="text-3xl font-semibold text-[#1F2937] mb-2">
    Access Denied
   </h2>

   <p className="text-gray-600 text-center max-w-md">
    You do not have permission to access this page.
   </p>
  </div>
 );
}