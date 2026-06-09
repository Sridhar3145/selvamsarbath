import { Link } from "react-router-dom";
import blogs from "../data/blogs";
import { Helmet } from "react-helmet-async";

export default function Blogs() {
 return (
  <>

   <Helmet>
    <title>Nannari Sarbath Blogs | Sarbath | Syrup</title>

    <meta
     name="description"
     content="Read blogs about Nannari Sarbath benefits and traditional summer drinks."
    />

    <link
     rel="canonical"
     href="https://selvamsarbath.onrender.com/blog"
    />
   </Helmet>


   <section className="max-w-6xl mx-auto px-4 py-10">

    <h1 className="text-4xl font-bold text-center mb-3 text-[#1F2937]">
     Nannari Sarbath Blog
    </h1>

    <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
     Explore traditional sarbath recipes, summer drink guides,
     and useful information about Nannari, Rose and Pineapple Sarbath.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

     {blogs.map((blog) => (
      <article
       key={blog.id}
       className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
      >

       <img
        src={blog.image}
        alt={blog.title}
        className="h-56 w-full object-fit"
        loading="lazy"
       />

       <div className="p-6">

        <h2 className="text-2xl font-semibold mb-3 text-[#1F2937]">
         {blog.title}
        </h2>

        <p className="text-gray-600 mb-5">
         {blog.description}
        </p>

        <Link
         to={`/blog/${blog.slug}`}
         className="inline-flex items-center gap-2 bg-[#814BF6] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6d3df0] hover:scale-105 transition-all duration-300"
        >
         Read More
        </Link>

       </div>

      </article>
     ))}

    </div>

   </section>
  </>
 );
}