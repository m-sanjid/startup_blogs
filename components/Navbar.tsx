import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ToggleTheme from "./ToggleTheme";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed z-10 py-2 px-5 w-screen max-h-14 shadow-md hover:shadow-lg bg-white/10 backdrop-blur-lg shadow-blue-500/50 font-work-sans hover:border-b-1 hover:border-blue-500/50 hover:shadow-blue-500/50">
      <nav className="flex justify-between items-center">
        <div className="flex gap-2 justify-between items-center p-0 m-0 felx-row">
          <Link href="/">
            <Image
              className="p-0 pt-1 m-0 rounded-lg border-b-0 border-blue-500 shadow-md outline-none bg-neutral-300 shadow-blue-500"
              src="/logo.png"
              alt="logo"
              width={100}
              height={20}
            />
          </Link>
          <ToggleTheme />
        </div>

        <div className="flex gap-5 items-center text-blue-600">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="sm:hidden size-6" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="text-blue-600 sm:hidden size-6" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
