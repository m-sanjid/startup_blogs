import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="flex flex-col gap-10 px-6 pt-20 pb-10 mx-auto w-full max-w-7xl lg:flex-row">
        <div className="flex flex-col justify-between items-center pt-20">
          <div>
            <h3 className="p-9 text-5xl font-extrabold text-center uppercase rounded-lg border border-r-0 border-b-0 opacity-80 border-neutral-400/50 bg-white/15 backdrop-blur-lg text-neutral-200 px-[100px] md:px-[150px] lg:px-[250px]">
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="flex object-cover justify-center items-center mt-20 rounded-lg border border-white hover:border-2 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500"
          />
          <p className="mt-7 font-extrabold text-center text-[30px]">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
        </div>

        <div className="flex flex-col flex-1 gap-5 mt-5 lg:">
          <p className="mb-3 font-bold text-center text-white text-[30px]">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>{" "}
        </div>
      </section>
    </>
  );
};

export default Page;
