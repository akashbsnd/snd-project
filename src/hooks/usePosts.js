import { useState, useEffect } from "react";
import { client } from "../lib/sanityClient";

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  "authorName": author->name,
  "authorSlug": author->slug.current,
  "authorImage": author->image.asset->url,
  mainImage
}[0..50]`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  "slug": slug.current,
  "authorName": author->name,
  "authorSlug": author->slug.current,
  "authorImage": author->image.asset->url,
  mainImage,
  body
}`;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client
      .fetch(POSTS_QUERY)
      .then((data) => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
}

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client
      .fetch(POST_QUERY, { slug })
      .then((data) => {
        setPost(data || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [slug]);

  return { post, loading, error };
}
