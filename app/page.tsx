import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className=" grid grid-cols-3 gap-4">
          <div className=" border border-black rounded p-2">
            <Link href='/grandraid'>
            App Grand Raid
            </Link>
          </div>
          <div className=" border border-black rounded p-2">
            <Link href='/lesbases'>
              Les Bases
            </Link>
          </div>
          <div className=" border border-black rounded p-2">
            App XXX
          </div>
          <div className=" border border-black rounded p-2">
            App XXX
          </div>
          <div className=" border border-black rounded p-2">
            App XXX
          </div>
          <div className=" border border-black rounded p-2">
            App XXX
          </div>


        </div>
      </main>
    </div>
  );
}
