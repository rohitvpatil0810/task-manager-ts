import config from "@/config/config";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

const GoogleSignin = () => {
  const auth = useAuth();

  useEffect(() => {
    // global google
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: config.googleClientId,
      callback: auth?.googleSignin,
    });
    const googleSignInButton = document.getElementById("google-signin");
    // @ts-ignore
    google.accounts.id.renderButton(googleSignInButton, {
      theme: "filled_black",
      logo_alignment: "left",
      size: "large",
      text: "continue_with",
      locale: "en",
    });
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center"
      id="google-signin"
    ></div>
  );
};

export default GoogleSignin;
