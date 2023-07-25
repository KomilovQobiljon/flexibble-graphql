"use client"

import Image from "next/image";
import React, { useState } from "react";

import { postViewLike } from "@/lib/actions";
import { ProjectInterface, SessionInterface } from "@/common.types";

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

const LikeAndSeen = ({ 
  id,
  title,
  image,
  likes,
  views,
  likedBy,
  name,
  avatarUrl,
  userId,
  session,
  githubUrl,
  description,
  liveSiteUrl,
  category
  } : Props) => {
    const [data, setData] = useState({
      id,
      title,
      image,
      likes,
      views,
      likedBy,
      name,
      avatarUrl,
      userId,
      session,
      githubUrl,
      description,
      liveSiteUrl,
      category
    });

    const handleLike = async (e: React.MouseEvent<HTMLImageElement>) => {
      e.preventDefault();
      if(!session){
        return alert("You have to be logged in to like a project.");
      }
      
      const likeAnswer = await postViewLike({
        session: data.session,
        id: data.id,
        title: data.title,
        image: data.image,
        githubUrl: data.githubUrl,
        liveSiteUrl: data.liveSiteUrl,
        description: data.description,
        category: data.category,
        likes: data.likes,
        views: data.views,
        likedBy: data.likedBy,
        name: data.name,
      }) as { projectUpdate: { project: ProjectInterface } };

      setData(prev => ({
        id: likeAnswer.projectUpdate.project.id,
        image: likeAnswer.projectUpdate.project.image,
        title: likeAnswer.projectUpdate.project.title,
        githubUrl: likeAnswer.projectUpdate.project.githubUrl,
        liveSiteUrl: likeAnswer.projectUpdate.project.liveSiteUrl,
        description: likeAnswer.projectUpdate.project.description,
        category: likeAnswer.projectUpdate.project.category,
        likes: likeAnswer.projectUpdate.project.likes,
        views: likeAnswer.projectUpdate.project.views,
        likedBy: likeAnswer.projectUpdate.project.likedBy,
        name: prev.name,
        session: prev.session,
        avatarUrl: prev.avatarUrl,
        userId: prev.userId,
      }))
    }
    const heartSVG = data.likedBy.includes(session?.user?.id) ? '/hearth-purple.svg' : '/hearth.svg'
  
    return (
      <div className="flexCenter gap-3">
        <div className="flexCenter gap-2">
          <Image 
            src={heartSVG} width={13} 
            height={12} alt="heart"
            onClick={handleLike}
            className="cursor-pointer"
          />
          <p className="text-sm">{data.likes}</p>
        </div>
        <div className="flexCenter gap-2" >
          <Image src="/eye.svg" width={13} height={12} alt="heart" />
          <p className="text-sm">{data.views}</p>
        </div>
      </div>
    )
}

export default LikeAndSeen