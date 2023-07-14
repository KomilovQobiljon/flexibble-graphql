"use client"
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  image: string;
  name: string;
  avatarUrl: string;
  userId: string;
}

const ProjectCard = ({ id, title, image, name, avatarUrl, userId }: Props) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [radomViews, setRandomViews] = useState('');

  useEffect(()=>{
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(String((Math.floor(Math.random()*10000)/1000).toFixed(1)+'k'))
  },[]);
  
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

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">525</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">5.2k</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;