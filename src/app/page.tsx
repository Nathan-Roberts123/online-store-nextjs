import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return <h1>Home</h1>;
}
