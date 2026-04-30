import { PostCard, Container } from "../components";
import appwriteservices from "../appwrite/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    appwriteservices.listPosts().then((posts) => {
      if (posts) {
        setPosts(posts.rows);
      }
    });
  }, []);

  if (!userData) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <Container>

        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            All Posts
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {posts.length} posts published
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗂️</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No posts yet
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mt-1">
              Check back later!
            </p>
          </div>
        ) : (
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
        )}

      </Container>
    </div>
  );
}