import { labels } from "../../../static/labels";
import AuthLink from "../../OAuth/AuthLink";

export default function CheckoutHero({ isCurrUser }) {
  const clearCookies = () => {
    const cookies = ['userId', 'accessToken', 'refreshToken', 'cart_backup', 'jwt'];
    cookies.forEach((cookie) => {
      document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    clearCookies();
  };

  return (
    <div className="flex mb-4 justify-between">
      <h3>{labels.checkout.contactInfo}</h3>
      <div>
        <div>
          <span className="underline decoration-bbf-text-decoration-color">
            {isCurrUser ? (
              <a
                href={`${import.meta.env.VITE_BACKEND_API_URL}/signOut`}
                onClick={handleSignOut}
              >
                Sign out
              </a>
            ) : (
              <AuthLink />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
