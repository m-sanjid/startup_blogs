import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { athor?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="py-6 px-5 border transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/[0.5] rounded-[22px] shadow-200 hover:border-sky-300 hover:shadow-300 hover:bg-white/20 hover:backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <p className="py-2 px-4 font-medium bg-black rounded-full hover:bg-transparent text-[16px] text-slate-300">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="text-white size-6 hover:border-sky-300" />
          <span className="font-medium text-white">{views}</span>
        </div>
      </div>

      <div className="flex gap-5 justify-between items-center mt-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="font-medium text-white text-m line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-white text-[26px] 1font-semibold line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="my-3 font-normal text-white break-all text-[16px] line-clamp-2">
          {description}
        </p>

        <img
          src={image}
          alt="placeholder"
          className="object-cover w-full h-[164px] rounded-[10px]"
        />
      </Link>

      <div className="flex gap-3 justify-between items-center mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="font-medium text-white text-[16]">{category}</p>
        </Link>
        <Button
          className="py-3 px-5 font-medium text-white rounded-full border border-white/[0.5] bg-black-200 text-[16px] hover:border-sky-400"
          asChild
        >
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
        <span className="absolute inset-x-0 -bottom-px mx-auto w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400" />
      </li>
    ))}
  </>
);

export default StartupCard;
