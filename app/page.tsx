import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    }
  }
}

type SearchParams = { 
  category?: string;
  endcursor?: string;
}

type Props = {
  searchParams: SearchParams
}

const Home = async ({ searchParams: { category, endcursor } }: Props ) => {
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
  console.log(data)
  
  const projectsToDisplay = data?.projectSearch?.edges || [];

  if(projectsToDisplay.length === 0){
    return  (
      <section className="flex-start flex-col paddings mb-16">
        <div className="flexBetween w-full gap-5 flex-wrap">
          <Categories />
        </div>
        <p className="no-result-text text-center">
          No projects to display go create some first.
        </p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <div className="flexBetween w-full gap-5 flex-wrap">
        <Categories />
      </div>
      <section className="projects-grid">
        {projectsToDisplay.map(({ node }:{node: ProjectInterface}) => {
          return (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy?.name}
              avatarUrl={node?.createdBy?.avatarUrl}
              userId={node?.createdBy?.id}
            />
          )
        })}
      </section>
      <LoadMore 
        pageInfo={data?.projectSearch?.pageInfo}
      />
    </section>
  )
}

export default Home;