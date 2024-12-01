import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pt-14 min-h-[230px]">
        <p className="relative py-3 px-6 pt-5 font-bold text-center uppercase bg-transparent rounded-lg font-work-sans">
          {formatDate(post?._createdAt)}
        </p>

        <h1 className="py-3 px-6 my-5 mx-5 max-w-5xl font-extrabold text-center text-white uppercase rounded-lg bg-white/20 border-white/30 backdrop-blur-md font-work-sans text-[36px] leading-[46px] sm:text-[54px] sm:leading-[64px]">
          {post.title}
        </h1>
        <p className="max-w-2xl font-medium text-center text-white break-words text-[20px]">
          {post.description}
        </p>
      </section>

      <section className="py-10 px-6 mx-auto max-w-7xl">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl border-white border-[3px]"
        />
        <div className="mx-auto mt-10 space-y-5 max-w-4xl">
          <div className="gap-5 flex-between">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="roundel-full drop-shadow-lg"
              />

              <div>
                <p className="font-medium text-[20]">{post.author.name}</p>
                <p className="font-medium text-white text-[16]">
                  {" "}
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="py-2 px-4 font-medium text-center rounded-lg bg-white/20 backdrop-blur-md text-[16px]">
              {post.category}
            </p>
          </div>

          <h3 className="font-bold text-white text-[30]">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="max-w-4xl text-white break-all prose font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-sm font-normal text-white">
              No details provided
            </p>
          )}

          <hr />

          <Suspense
            fallback={
              <Skeleton className="fixed right-3 bottom-3 w-24 h-10 rounded-lg bg-zinc-400" />
            }
          >
            <View id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Page;
