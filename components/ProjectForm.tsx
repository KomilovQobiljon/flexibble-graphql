"use client"
import { ProjectInterface, SessionInterface } from "@/common.types"
import { ChangeEvent, useState } from "react"
import Image  from "next/image"
import FormField from "./FormField"
import { categoryFilters } from "@/constant"
import CustomMenu from "./CustomMenu"
import Button from "./Button"
import { createNewProject, fetchToken, updateProject } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
}

const ProjectForm = ({ type, session, project } : Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let initialState = {
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
    likes: '0',
    likedBy: [],
    views: '0',
  }
  const [form, setForm] = useState(initialState);

  const handleFormSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();
    try{
      if(type === "create"){
        // create project
        console.log(form);
        await createNewProject(form, session?.user?.id, token);

        router.push("/");
      }else if(type === "edit"){
        // update project
        await updateProject(form, session?.user?.id, project?.id as string, token);

        router.push("/");
      }
    }catch(error){
      console.log(error);
    }finally{
      setIsSubmitting(false);
    }
  }
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if(!file) return;
    const fileMb = file.size / 1024 ** 2;
    console.log(fileMb)

    if (fileMb >= 10) {
      return alert("Files more than 10MB are not allowed")
    } else {
      if(!file.type.includes("image")){
        return alert('Please upload an image file');
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const result = reader.result as string;
  
        handleStateChange('image', result);
      }
    }    
  }
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev)=>({
        ...prev,
        [fieldName]: value
      }))
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form"
    >
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
          <input
            id="image"
            type="file"
            accept='image/*'
            required={type === 'create'}
            className="form_image-input"
            onChange={handleChangeImage}
          />
          {form.image && (
            <Image 
              src={form?.image}
              className="sm:p-10 object-contain z-20"
              alt="Project poster"
              fill
            />
          )}
        </label>
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title',value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange('description',value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://kobi-portfolio-frontend.netlify.com"
        setState={(value) => handleStateChange('liveSiteUrl',value)}
      />
      <FormField
      type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/KomilovQobiljon"
        setState={(value) => handleStateChange('githubUrl',value)}
      />

      <CustomMenu 
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting ? `${type === 'create' ? 'Creating': 'Editing'}`:
            `${type === 'create' ? 'Creat' : 'Edit'} `
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm