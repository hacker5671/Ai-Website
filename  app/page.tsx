import { getCsrfToken, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SignInPage() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-gray-800 p-6 rounded">
      <h2 className="text-xl mb-4">Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Loading..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}