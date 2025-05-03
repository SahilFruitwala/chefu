import { redirect } from "next/navigation";

export default function AppPage() {
  redirect("/app/recipes");
  return null; // This ensures the component doesn't render anything
}