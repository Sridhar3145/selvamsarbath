import { useParams } from "react-router-dom";
import blogs from "../data/blogs";
import { Helmet } from "react-helmet-async";

function BlogDetails() {
 const { slug } = useParams();

 const blog = blogs.find((item) => item.slug === slug);

 if (!blog) {
  return (
   <div className="text-center py-20 text-2xl">
    Blog Not Found
   </div>
  );
 }

 return (
  <>
   <Helmet>
    <title>{blog.title} | Sarbath | Syrup</title>

    <meta
     name="description"
     content={blog.description}
    />

    <link
     rel="canonical"
     href={`https://selvamsarbath.onrender.com/blog/${blog.slug}`}
    />
   </Helmet>

   <section className="max-w-4xl mx-auto px-6 py-10">
    <img
     src={blog.image}
     alt={blog.title}
     className="w-full h-[400px] object-cover rounded-2xl"
    />

    <h1 className="text-4xl font-bold mt-8 mb-6">
     {blog.title}
    </h1>

    <div className="text-gray-700 leading-8">
     {blog.content.split("\n").map((line, index) => {
      const text = line.trim();

      if (!text) return <br key={index} />;


      if (text.startsWith("- ")) {
       return (
        <li
         key={index}
         className="ml-6 list-disc text-lg font-normal text-gray-700"
        >
         {text.substring(2)}
        </li>
       );
      }

      if (text.length < 60) {
       return (
        <h2
         key={index}
         className="text-2xl font-bold text-black mt-8 mb-3"
        >
         {text}
        </h2>
       );
      }


      return (
       <p
        key={index}
        className="text-lg leading-8 text-gray-700 mb-4"
       >
        {text}
       </p>
      );

     })}
    </div>
   </section>
  </>
 );
}

export default BlogDetails;