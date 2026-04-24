import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// appwrite gives the id as $id (just the syntax)
export default function PostCard({ $id, title, featuredImage }) {
  // featuredImage is the id of image stored in database
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 ">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}
