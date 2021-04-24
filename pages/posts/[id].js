import { useSession } from "next-auth/client";
import Input from "../../apps/posts/views/Input";

export default function CreatePost() {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in! Please sign in first</h1>
        </div>
      </main>
    );
  } else if (session && !session.user.groups.includes("admin")) {
    return (
      <main>
        <div>
          <h1>You aren't authorized to view this content</h1>
        </div>
      </main>
    );
  }
  return <Input />;
}
