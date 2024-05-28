import { lazy, Suspense } from "react";
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
export default function DeviceList ()  {
    return (
        <Suspense>
            <Main>
                <Suspense>
                    <PageTitle title="Lista de equipos de computación" />
                </Suspense>
            </Main>
        </Suspense>
    )
}