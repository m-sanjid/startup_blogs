import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <div className="p-0 m-0 bg-gradient-to-r from-black via-blue-800 to-black dark:bg-white">
      <section className="w-full p-0 m-0 bg-inherit min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">
        <h1 className="py-3 px-6 my-5 max-w-5xl font-extrabold text-center text-white uppercase font-work-sans text-[36px] leading-[46px] sm:text-[54px] sm:leading-[64px]">
          Tell us about your startup
          <br />
        </h1>

        <p className="font-medium text-[20px] text-sky-50 text-center break-words !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="py-10 px-6 mx-auto max-w-7xl bg-inherit">
        <p className="text-2xl font-semibold shadow-sky-50">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="grid gap-5 mt-7 bg-transparent sm:grid-cols-2 md:grid-cols-3">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </div>
  );
}
