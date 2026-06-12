import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Project not found.</p>
      <Link href="/">Back to home</Link>
    </div>
  );
}
