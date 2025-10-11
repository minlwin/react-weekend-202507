import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { BookOpen, House } from "lucide-react";
import Link from "next/link";

import * as lucideIcons from 'lucide-react'
import { getCoursSummary } from "@/lib/client/home-data.client";
import { CourseSummary } from "@/lib/model/public.model";

export default async function Home() {

  const courses = await getCoursSummary()

  return (
    <div>
      <HeroSection />
      
      <Navigation />

      <AboutUs />
      
      <OurCourses data={courses} />

      {/* Opening Classes */}
      {/* Footer */}
    </div>
  )
}

function Navigation() {
    return (
        <nav className="sticky top-0 z-50 bg-white">
            <div className="px-16 py-4 flex justify-between items-end">
                <Link href={"/"} className="flex items-center gap-2"><House className="size-5"/> <span className="text-xl text-foreground/80">Java Developer Class</span></Link>
            
                <div className="space-x-6">
                    <Link className="hover:text-foreground/70" href="#">About Us</Link>
                    <Link className="hover:text-foreground/70" href="#ourCourse">Our Course</Link>
                    <Link className="hover:text-foreground/70" href="#">Available Classes</Link>
                    <Link className="hover:text-foreground/70" href="#">Sign In</Link>
                </div>
            </div>
        </nav>
    )
}

function HeroSection() {
  return (
    <section className="h-screen"></section>
  )
}

function AboutUs() {
  return (
    <section className="min-h-screen bg-teal-200"></section>
  )
}

function OurCourses({data} : {data : CourseSummary []}) {
  return (
    <section className="h-screen pt-20 px-16" id="ourCourse">

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
          <CardTitle>{data.name}</CardTitle>

          <IconComponent className="size-16" />

          <CardDescription >{data.description}</CardDescription>
        </div>
        
        <Button asChild>
          <Link href={""}>
            <BookOpen /> Read More
          </Link>
        </Button>

      </CardContent>
    </Card>
  )
}