import { lazy } from "react"
import ReactPaginate from 'react-paginate'
import { useDeviceContext } from "@/sections/Context/DeviceProvider"
import './PaginationList.css'

const ArrowRightBadgeIcon = lazy(async () => import("../icon/ArrowRightBadge").then(m => ({ default: m.ArrowRightBadgeIcon })))

export function PaginationList() {
   const { managePage: { handlePageClick, totalPages, currentPage}} = useDeviceContext()
   
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1}
      previousLabel={<ArrowRightBadgeIcon className='h-5 rotate-180' />}
      nextLabel={<ArrowRightBadgeIcon className='h-5' />}      
      breakClassName='page-break'
      renderOnZeroPageCount={null}
      onPageChange={handlePageClick}
      containerClassName='pageList-container'
      pageClassName='page'
      pageLinkClassName='page-link'
      activeClassName='active'
      previousClassName='page'
      nextClassName='page'
    />
  )

}
