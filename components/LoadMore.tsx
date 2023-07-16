"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
type Props = {
  pageInfo: PageInfo
}

const LoadMore = ({ pageInfo: { startCursor, endCursor, hasNextPage, hasPreviousPage} }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams()

  const handleStart = (cursor: string) => {
    router.push(`${pathName}?startcursor=${cursor}`);
  }
  const handleEnd = (cursor: string) => {
    router.push(`${pathName}?endcursor=${cursor}`);
  }
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      { hasPreviousPage ? (
        <button
          type="button"
          className="flexCenter gap-3 px-4 py-3 
          text-white 
          bg-primary-purple rounded-xl text-sm font-medium max-md:w-full"
          onClick={()=>handleStart(startCursor)}
        >
          First Page
        </button>
      ) : null }
      { hasNextPage ? (
        <button
          type="button"
          className="flexCenter gap-3 px-4 py-3 
          text-white 
          bg-primary-purple rounded-xl text-sm font-medium max-md:w-full"
          onClick={()=>handleEnd(endCursor)}
        >
          Next Shots
        </button>
      ) : null }
    </div>
  )
}

export default LoadMore