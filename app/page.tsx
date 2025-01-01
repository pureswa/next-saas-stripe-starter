import HeroLanding from "@/components/sections/hero-landing"
import { env } from "@/env.mjs";

async function getGitHubStars() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/mickasmt/next-saas-stripe-starter",
      {
        ...(env.GITHUB_OAUTH_TOKEN && {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }),
        next: { revalidate: 3600 },
      }
    );
    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return 0;
  }
}

export default async function Home() {
  const stars = await getGitHubStars();

  return (
    <main>
      <HeroLanding stars={stars} />
    </main>
  )
}