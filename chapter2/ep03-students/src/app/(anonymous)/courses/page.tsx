import PublicCourses from '@/components/app/public-courses'
import * as homeClient from '@/lib/model/public.client'

export default async function PublicCoursesPage() {

    const data = await homeClient.getCoursSummary()

    return (
        <div className='mt-[-60]'>
            <PublicCourses data={data} />
        </div>
    )
}