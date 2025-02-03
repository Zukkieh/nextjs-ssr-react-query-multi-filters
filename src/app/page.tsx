import { User } from "@/@types/user";
import HomePage from "@/components/page/home";

export default async function Home() {
  const response = await fetch("http://localhost:3030/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json() as User[];
  return <HomePage users={data} />;
}
