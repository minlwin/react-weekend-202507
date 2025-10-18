import { CourseSummary } from "@/lib/model/public.model"
import * as lucideIcons from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"

export default function PublicCourses({data} : {data : CourseSummary []}) {
  return (
    <section className="min-h-screen pt-20 px-16" id="ourCourse">

      <h1 className="text-center text-3xl">Our Courses</h1>

      <div className="grid grid-cols-3 gap-8 mt-6">
        {data.map(item => 
          <CourseInfo key={item.id} data={item} />
        )}
      </div>
    </section>
  )
}

function CourseInfo({data} : {data : CourseSummary}) {
  
  const IconComponent = lucideIcons[data.icon] as lucideIcons.LucideIcon
  
  return (
    <Card>
      <CardContent className="flex flex-col justify-between h-full gap-4">
        <div className="space-y-4">
          <IconComponent className="size-16" />
          <CardTitle>{data.name}</CardTitle>
          <CardDescription className="line-clamp-3">{data.description}</CardDescription>
        </div>
        
        <Button asChild>
          <Link href={`/courses/${data.id}`}>
            <lucideIcons.BookOpen /> Read More
          </Link>
        </Button>

      </CardContent>
    </Card>
  )
}