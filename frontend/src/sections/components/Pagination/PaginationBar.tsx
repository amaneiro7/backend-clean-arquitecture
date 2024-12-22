import { lazy } from "react";

const PaginationList = lazy(async () => import( "./PaginationList").then(m => ({ default: m.PaginationList })))
const RecordPerPage = lazy(async () => import("./RecordPerPage").then(m => ({ default: m.RecordPerPage })))

export function PaginationBar() {
    return (
      <nav 
        aria-label='pagination-bar' 
        className='flex justify-between items-center'
      >
        <RecordPerPage />        
        <PaginationList />
      </nav>
    )
}
