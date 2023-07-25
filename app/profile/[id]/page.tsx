import { UserProfile } from '@/common.types';
import { getProjectsOfUser } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { 
    id: string 
  }
}

const User = async ({ params: { id } }: Props) => {
  const data = await getProjectsOfUser(id) as { user: UserProfile };
  const imageSrc = data?.user?.projects?.edges.length === 0 ? '/profile-post.png' :
    data?.user?.projects?.edges[0]?.node?.image;
  console.log(data?.user, 'hey')

  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className='flexBetween max-lg:flex-col gap-10 w-full'>
        <div className='flex items-start flex-col w-full'>
          <Image 
            className='rounded-full'
            alt="user image"
            loading='lazy'
            decoding='async'
            width={100}
            height={100}
            src={data?.user?.avatarUrl}
          />
          <p className='text-4xl font-bold mt-10'>
            {data?.user?.name}
          </p>
          <p className='md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg'>
            {data?.user?.description}
          </p>
          <div className='flex mt-8 gap-5 w-full flex-wrap'>
            <button 
              className='flexCenter gap-3 px-4 py-3 
            text-black-100 
            bg-light-white-400 !w-max rounded-xl text-sm font-medium max-md:w-full'
              type='button'
            >
              <Image 
                src={'/plus-round.svg'} 
                alt={'plus icon'}
                loading='lazy'
                decoding='async'
                width={14}
                height={14}
              />
              Follow
            </button>
            <a href={data?.user?.email}>
              <button
                type='button'
                className='flexCenter gap-3 px-4 py-3 
                text-white 
                bg-primary-purple rounded-xl text-sm font-medium max-md:w-full'
              >
                <Image 
                  src={'/email.svg'}
                  alt={'email icon'}
                  loading='lazy'
                  decoding='async'
                  width={14}
                  height={14}
                />
                Hire Me
              </button>
            </a>
          </div>
        </div>
        <Image 
          src={imageSrc}
          alt={'project image'}
          className='rounded-xl object-contain'
          loading='lazy'
          decoding='async'
          width={739}
          height={554}
        />
      </section>
      <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
        <p className='w-full text-left text-lg font-semibold'>Recent Work</p>
        <div className='profile_projects'>
          {data?.user?.projects?.edges.map((project)=>(
            <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
              <Link 
                className='flexCenter group relative w-full h-full'
                href={`/project/${project?.node?.id}`}
              >
                <Image 
                  src={project?.node?.image}
                  alt={'project image'} 
                  loading='lazy'
                  decoding='async'
                  className='w-full h-full object-cover rounded-2xl'
                  width={414}
                  height={314}           
                />
                <div className='hidden group-hover:flex profile_card-title'>
                  <p className='w-full'>{project?.node?.title}</p>
                </div>
              </Link>
              <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
                <Link href={`/profile/${data?.user?.id}`}>
                  <div className="flexCenter gap-2">
                    <Image 
                      src={data?.user?.avatarUrl}
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
          ))}
        </div>
      </section>
    </section>
  )
}

export default User