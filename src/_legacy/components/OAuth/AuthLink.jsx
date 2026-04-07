import { useEffect, useState } from "react";
import { labels } from "../../static/labels";
import axios from "axios";

export default function AuthLink() {
  const [authLink, setAuthLink] = useState("");

  useEffect(() => {
    async function generateToken() {
      try {
        const generatedToken = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/generateToken`,
        );
        setAuthLink(generatedToken.data.url);
      } catch (err) {
        console.error(
          `There was an error grabbing the generateToken endpoint: ${err.message}`,
        );
        throw new Error(
          `There was an error grabbing the generateToken endpoint: ${err.message}`,
        );
      }
    }
    generateToken();
  }, []);

  return <a href={authLink}>{labels.checkout.signIn}</a>;
}
