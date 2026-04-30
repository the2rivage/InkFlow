import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post, slug }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) appwriteService.deleteFile(post.featuredImage);
      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbpost) navigate(`/post/${dbpost.$id}`);
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      data.featuredImage = file ? file.$id : "placeholderImage123";
      const dbpost = await appwriteService.createPost({
        ...data,
        userID: userData.$id,
        username: userData.name,
      });
      if (dbpost) navigate(`/post/${dbpost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4">

        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {post ? "Edit Post" : "Create New Post"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {post ? "Update your post details below" : "Fill in the details to publish a new post"}
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6">

          {/* Left — Main Content */}
          <div className="lg:w-2/3 flex flex-col gap-5">

            {/* Title */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none">
              <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                Title
              </label>
              <input
                placeholder="Enter post title..."
                className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                {...register("title", { required: true })}
              />
            </div>

            {/* Slug */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none">
              <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                Slug
              </label>
              <input
                placeholder="auto-generated-slug"
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none cursor-not-allowed"
                {...register("slug", { required: true })}
                onInput={(e) =>
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            {/* Content Editor */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700 px-3 shadow-sm">
              <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
                
              </label>
              <RTE
                name="content"
                control={control} 
                defaultValue={getValues("content")}
              />
            </div>

          </div>

          {/* Right — Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-5">

            {/* Featured Image */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none">
              <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:cursor-pointer file:transition-colors file:duration-200"
                {...register("image")}
              />
              {post && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-2">
                    Current image
                  </p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm dark:shadow-none">
              <label className="block text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                Status
              </label>
              <select
                className="w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-200"
                {...register("status", { required: true })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 shadow-md"
            >
              {post ? "✏️ Update Post" : "🚀 Publish Post"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}