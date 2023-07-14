import Modal from "@/components/Modal";
import Link from "next/link";
import Image from "next/image";

import { ProjectInterface } from '@/common.types';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import RelatedProjects from "@/components/RelatedProjects";
import ProjectActions from "@/components/ProjectActions";

const Project = async ({ params: { id }}: { params: { id: string }}) => {
  const session = await getCurrentUser();
  const data = await getProjectDetails(id) as { project?: ProjectInterface };
  if(!data?.project){
    return <p>Failed to fetch project information</p>
  }

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={`/profile/${data?.project?.createdBy?.id}`}>
            <Image 
              loading="lazy"
              alt="profile"
              decoding="async"
              height={50}
              width={50}
              src={data?.project?.createdBy?.avatarUrl || ''}
              className="rounded-full"
            />
          </Link>
          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {data?.project?.title}
            </p>
            <div className="user-info">
              <Link href={`/profile/${data?.project?.createdBy?.id}`}>{data?.project?.createdBy?.name}</Link>
              <Image src="/dot.svg" alt="dot" loading="lazy" decoding="async" width={4} height={4} />
              <Link className="text-primary-purple font-semibold" href={`/?category=${data?.project?.category}`}>{data?.project?.category}</Link>
            </div>
          </div>
        </div>
        {session?.user?.id === data?.project?.createdBy?.id ? 
          <ProjectActions id={id} /> : ''
        }
      </section>
      <section className="mt-14">
        <Image 
          alt="poster"
          loading="lazy"
          decoding="async"
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          src={data?.project?.image || ""}
        />
      </section>
      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">{data?.project?.description}</p>
        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
            target="_blank"
            rel="noreferrer"
            href={data?.project?.githubUrl || ""}
          >
            🖥 
            <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" alt="dot" loading="lazy" decoding="async" width={4} height={4} />
          <Link
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
            target="_blank"
            rel="noreferrer"
            href={data?.project?.liveSiteUrl || ""}
          >
            🚀 
            <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>
      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200"></span>
        <Link
          className="min-w-[82px] h-[82px]"
          href={`/profile/${data?.project?.createdBy?.id}`}
        >
          <Image 
            loading="lazy"
            alt="profile"
            decoding="async"
            height={82}
            width={82}
            src={data?.project?.createdBy?.avatarUrl || ''}
            className="rounded-full"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200"></span>
      </section>
      <section className="flex flex-col mt-32 w-full">
        <div className="flexBetween">
          <p className="text-base font-bold">
            More by {data?.project?.createdBy?.name}
          </p>
          <Link href={data?.project?.createdBy?.id || ''} className="text-primary-purple text-base">
            View All
          </Link>
        </div>
        <RelatedProjects userId={data?.project?.createdBy?.id} projectId={id} />
      </section>
    </Modal>
  )
}

export default Project