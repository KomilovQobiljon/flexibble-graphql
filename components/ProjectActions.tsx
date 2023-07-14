"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { deleteProject, fetchToken } from "@/lib/actions";

const ProjectActions = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try{
      const result = await deleteProject(id, token);
      console.log(result);
      router.push("/");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex justify-end items-center gap-2">
      <Link className="flexCenter edit-action_btn" href={`/edit-project/${id}`}>
        <Image 
          alt="edit"
          loading="lazy"
          width={15}
          height={15}
          decoding="async"
          src="/pencile.svg"
        />
      </Link>
      <button 
        type="button" 
        className="flexCenter delete-action_btn bg-primary-purple"
        onClick={handleDeleteProject}
        disabled={isDeleting}
      >
        <Image 
          src="/trash.svg"
          alt="delete"
          loading="lazy"
          width={15}
          height={15}
          decoding="async"
        />
      </button>
    </div>
  )
}

export default ProjectActions