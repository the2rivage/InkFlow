import { PostCard, Container } from "../components";
import appwriteservices from "../appwrite/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteservices.listPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);

  if (posts.length === 0 || !status) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Container>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📖</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              No posts yet
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Login to read and explore posts
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <Container>
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Latest Posts
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Explore what the community is writing
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="transform transition-transform duration-200 hover:-translate-y-1"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
