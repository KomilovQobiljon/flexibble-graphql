import Image from "next/image";
import Link from "next/link";
import LikeAndSeen from './LikeAndSeen';
import { SessionInterface } from "@/common.types";

type Props = {
  id: string;
  title: string;
  image: string;
  likedBy: string[];
  likes: string;
  views: string;
  name: string;
  avatarUrl: string;
  userId: string;
  session: SessionInterface;
  githubUrl: string;
  description: string;
  liveSiteUrl: string;
  category: string;
}

const ProjectCard = async ({ id, title, image, githubUrl, description, liveSiteUrl, category, name, likedBy, likes, views, avatarUrl, userId, session }: Props) => {
 
  return (
    <div 
      className="flexCenter flex-col rounded-2xl drop-shadow-card"
    >
      <Link 
        className="flexCenter group relative w-full h-full" 
        href={`/project/${id}`}
      >
        <Image 
          alt="project image"
          loading="lazy"
          decoding="async"
          width={414} height={314}
          className="w-full h-full object-cover rounded-2xl"
          src={image}
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image 
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
          </div>
        </Link>

        <LikeAndSeen 
          likedBy={likedBy} likes={likes} views={views} 
          session={session} id={id} title={title} avatarUrl={avatarUrl}
          userId={userId} image={image} name={name}
          githubUrl={githubUrl} description={description}
          liveSiteUrl={liveSiteUrl} category={category}
        />
      </div>
    </div>
  )
}

export default ProjectCard;