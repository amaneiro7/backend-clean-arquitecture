import { Link } from 'react-router-dom'
import Paragraph from '../Paragraph'

export default function FeaturesCard ({ icon, title, desc, path }: { icon: string, title: string, desc: string, path: string }) {
  return (
        <li className='flex gap-x-4 py-2'>
            <div className='flex-none w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center'>{icon}</div>
            <div className='space-y-3'>
                <h4 className='text-lg text-secondary font-semibold'>{title}</h4>
                <Paragraph text={desc}/>
                <Link
                    className='text-sm text-indigo-600 duration-150 hover:text-indigo-400 font-medium inline-flex items-center gap-x-1'
                    to={path}
                >
                    Learn more
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>
        </li>
  )
}
