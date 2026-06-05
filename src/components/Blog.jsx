import { Link } from "react-router-dom";
import blogs from "../data/blogs";

export default function Blogs() {
 return (
  <section className="max-w-6xl mx-auto px-4 py-10">
   <h1 className="text-4xl font-bold text-center mb-8">
    SarbathKart Blog
   </h1>

   <div className="grid md:grid-cols-2 gap-6">
    {blogs.map((blog) => (
     <div
      key={blog.id}
      className="bg-white rounded-xl shadow-md overflow-hidden"
     >
      <img
       src={blog.image}
       alt={blog.title}
       className="h-52 w-full object-cover"
      />

      <div className="p-5">
       <h2 className="text-2xl font-semibold mb-2">
        {blog.title}
       </h2>

       <p className="text-gray-600 mb-4">
        {blog.description}
       </p>

       <Link
        to={`/blog/${blog.slug}`}
        className="text-blue-600 font-semibold"
       >
        Read More →
       </Link>
      </div>
     </div>
    ))}
   </div>
  </section>
 );
}