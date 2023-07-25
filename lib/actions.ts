import { ProjectForm, UpdateDetails } from '@/common.types';
import { 
  getUserQuery, 
  createUserMutation, 
  createProjectMutation, 
  projectsQuery, 
  getProjectByIdQuery, 
  getProjectsOfUserQuery, 
  updateProjectMutation, 
  deleteProjectMutation, 
  projectsWithoutCategoryQuery
} from '@/graphql';
import { GraphQLClient } from 'graphql-request';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try{
    return await client.request(query, variables)
  }catch (error) {
    throw error;
  }
} 

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey)
  return makeGraphQLRequest(getUserQuery, { email })
}

export const createUser = (name: string,email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey)
  const variables = {
    input: {
      name, email, avatarUrl 
    }
  }
  return makeGraphQLRequest(createUserMutation, variables)
};

export const fetchToken = async () => {
  try{
    const response = await fetch(`${serverUrl}/api/auth/token`);

    return response.json();
  }catch(error){
    throw(error)
  }
}
export const uploadImage = async (imagePath: string) => {
  try{
    const response = await fetch(`${serverUrl}/api/upload`,{
      method: "POST",
      body: JSON.stringify({ path: imagePath })
    })

    return response.json();
  }catch(error){
    throw error;
  }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("x-api-key", apiKey)
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async (category: string, endcursor: string)=> {
  client.setHeader('x-api-key', apiKey)
  const variables = { 
    category,
    endcursor 
  }
  
  if(!category){
    return makeGraphQLRequest(projectsWithoutCategoryQuery, variables)
  }
  return makeGraphQLRequest(projectsQuery, variables)
}

export const postViewLike = async ({ 
  session, id, title, description, image, githubUrl, 
  liveSiteUrl, category, likedBy, likes, views 
}: UpdateDetails) => {
  client.setHeader('x-api-key', apiKey);
  let newLikedBy;
  let newLikes;

  if(likedBy.includes(session?.user?.id)){
    newLikedBy = likedBy.filter((id)=>id !== session?.user?.id);
    newLikes = `${newLikedBy.length}`;
  }else{
    newLikedBy = [...likedBy, session?.user?.id];
    newLikes = `${newLikedBy.length}`;
  }

  const variables = {
    id: id,
    input: {
      title,
      description,
      image,
      githubUrl,
      liveSiteUrl,
      category,
      likedBy: newLikedBy,
      likes: newLikes,
      views
    }
  }

  return makeGraphQLRequest(updateProjectMutation, variables)
}

export const postView = async ({ 
  id, title, description, image, githubUrl, 
  liveSiteUrl, category, likedBy, likes, views 
}: UpdateDetails) => {
  client.setHeader('x-api-key', apiKey);

  const variables = {
    id: id,
    input: {
      title,
      description,
      image,
      githubUrl,
      liveSiteUrl,
      category,
      likedBy,
      likes,
      views
    }
  }

  return makeGraphQLRequest(updateProjectMutation, variables)
}

export const getProjectDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
}

export const getProjectsOfUser = (id: string, last?: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
}

export const updateProject = async (form: ProjectForm, creatorId: string, projectId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);
  if(imageUrl.url) {
    client.setHeader("x-api-key", apiKey);
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      id: projectId,
      input: {
        ...form,
        image: imageUrl.url,
      }
    }
    return makeGraphQLRequest(updateProjectMutation, variables);
  }
}

export const deleteProject = (id: string, token: string) => {
  client.setHeader('x-api-key', apiKey);
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: id
  }
  return makeGraphQLRequest(deleteProjectMutation, variables);
}