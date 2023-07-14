import Link from "next/link";
import Image from "next/image";

import { getProjectsOfUser } from "@/lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";

type Props = { 
  userId: string, 
  projectId: string 
}

const RelatedProjects = async ({ userId, projectId }: Props ) => {
  const result = await getProjectsOfUser(userId as string) as { user?: UserProfile};
  const filteredProjects = result?.user?.projects?.edges
        ?.filter(({ node }: { node: ProjectInterface }) => node?.id !== projectId);

  if (filteredProjects?.length === 0) return null;

  return (
    <div className="related_projects-grid">
          {filteredProjects?.map((project: any)=>{
            return (
              <div 
                key={project?.node?.id} 
                className="flexCenter related_project-card drop-shadow-card"
              >
                <Link
                  className="flexCenter group relative w-full h-full"
                  href={`/project/${project?.node?.id}`}
                >
                  <Image 
                    loading="lazy"
                    alt="profile"
                    decoding="async"
                    height={50}
                    width={50}
                    src={project?.node?.image || ''}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="hidden group-hover:flex related_project-card_title">
                    <p className="w-full">{project?.node?.title}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
  )
}

export default RelatedProjects