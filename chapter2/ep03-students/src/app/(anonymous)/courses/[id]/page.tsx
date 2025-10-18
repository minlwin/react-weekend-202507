import NoData from "@/components/app/app-nodata"
import PageTitle from "@/components/app/page-title"
import * as homeClient from "@/lib/model/public.client"
import { CourseDetails } from "@/lib/model/public.model"

export default async function CourseDetailsPage(props : PageProps<'/courses/[id]'>) {
    const { id } = await props.params

    const details = await homeClient.getCourseById(id)
    
    return (
        <div>
            <PageTitle icon={details?.icon || 'BookOpen'} title={details?.name || 'Course Details'} />

            {details ? 
                <CourseDetailsView data={details} /> :
                <NoData message={`There is no course with id ${id}.`} />
            }
        </div>
    )
}

function CourseDetailsView({data} : {data: CourseDetails}) {
    return (
        <section>
            <p className="mb-4 text-foreground/80">{data.description}</p>

            <h3 className="text-lg font-semibold mb-4">Course Contents</h3>

            {data.topics.map((item, index) => 
                <div key={index} className="flex gap-3 mb-3">
                    <span>{index + 1}</span>

                    <div>
                        <h4>{item.title}</h4>
                        <p className="text-foreground/80">{item.description}</p>
                    </div>
                </div>
            )}
        </section>
    )
}