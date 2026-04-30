import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  let isAuthor = false;
  const userData = useSelector((state) => state.auth.userData);
  if (post && userData) {
    if (post?.userID === userData.$id) isAuthor = true;
  }

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <Container>

        {/* Top Section — Image Left, Title + Content Right */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left — Featured Image */}
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 h-72 lg:h-full max-h-96 shadow-sm dark:shadow-none">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — Single Box: Title + Content */}
          <div className="lg:w-3/5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col shadow-sm dark:shadow-none">

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2 leading-snug">
                {post.title}
              </h1>
              <h2 className="text-gray-500 dark:text-gray-300 font-medium text-lg mt-2 leading-snug">
                by {post.username} •{" "}
                <span className="text-sm text-gray-400 dark:text-gray-400">
                  {new Date(post.$createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </h2>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-200 dark:border-gray-700" />

            {/* Content */}
            <div className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert prose-sm max-w-none overflow-y-auto max-h-64">
              {parse(post.content)}
            </div>

          </div>
        </div>

        {/* Author Actions — Outside & Below the box */}
        {isAuthor && (
          <div className="flex gap-3 mt-6">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md">
                ✏️ Edit
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="px-6 py-2.5 bg-red-600 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md"
            >
              🗑️ Delete
            </button>
          </div>
        )}

      </Container>
    </div>
  ) : null;
}