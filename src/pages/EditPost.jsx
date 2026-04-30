import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteServices from "../appwrite/config";
import { Container, PostForm } from "../components";
export default function EditPost() {
  const [post, setPost] = useState();
  const { slug } = useParams(); // <-- getting name from URL
  const navigate = useNavigate();
  useEffect(() => {
    appwriteServices.getPost(slug).then((Post) => {
      if (Post) {
        setPost(Post);
      }
    });
  }, [slug, navigate]);
  
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} slug={slug}></PostForm>
      </Container>
    </div>
  ) : null;
}
