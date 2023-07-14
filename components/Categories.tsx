import { categoryFilters } from '../constant';

const Categories = () => {
  return (
    <ul className="flex gap-2 overflow-auto">
      {categoryFilters.map(category=>(
        <button
          id={category}
          type='button'
          className='font-normal px-4 py-3 rounded-lg capitalize whitespace-nowrap'
        >
          {category}
        </button>
      ))}
    </ul>
  )
}

export default Categories