
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error=useRouteError()
    
    
  return (
    <div className='text-center font-bold'>
        <p className='text-red-500'>
          There was an error loading this page
        </p>
    </div>
  )
}

export default Error
