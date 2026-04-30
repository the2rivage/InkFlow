import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const $id = post.$id;
  const title = post.title;
  const featuredImage = post.featuredImage;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-950 group">

        {/* Image */}
        <div className="w-full h-48 overflow-hidden">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400 dark:text-gray-500 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
          <p className="text-indigo-600 dark:text-indigo-400 text-xs mt-2 font-medium">Read more</p>
        </div>

      </div>
    </Link>
  );
}