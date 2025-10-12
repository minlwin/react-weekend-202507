import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { BookOpen, House } from "lucide-react";
import Link from "next/link";

import * as lucideIcons from 'lucide-react'
import * as homeClient from '@/lib/client/home-data.client'
import { ClassSummary, CourseSummary } from "@/lib/model/public.model";

export default async function Home() {

  const courses = await homeClient.getCoursSummary()
  const classes = await homeClient.getAvailableClasses()

  return (
    <div>
      <HeroSection />
      
      <Navigation />

      <AboutUs />
      
      <OurCourses data={courses} />

      <AvailableClasses data={classes} />
      
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
                    <Link className="hover:text-foreground/70" href="#aboutUs">About Us</Link>
                    <Link className="hover:text-foreground/70" href="#ourCourse">Our Course</Link>
                    <Link className="hover:text-foreground/70" href="#classes">Available Classes</Link>
                    <Link className="hover:text-foreground/70" href="/signin">Sign In</Link>
                </div>
            </div>
        </nav>
    )
}

function HeroSection() {
  return (
    <section></section>
  )
}

function AvailableClasses({data} : {data: ClassSummary []}) {
  
  function icon(key:keyof typeof lucideIcons):lucideIcons.LucideIcon {
    return lucideIcons[key] as lucideIcons.LucideIcon
  }

  return (
    <section id="classes" className="min-h-screen">
      <div className="px-16 py-24 text-center">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Available Classes</h1>
        </div>

        <div className="px-32 text-foreground/70">{"Choose a schedule that fits your lifestyle. We offer flexible timing options for working professionals and students."}</div>

        <div className="mt-6 px-24 gap-8 grid grid-cols-2">
          {data.map(item => {
            const Icon = icon(item.course.icon)
            return (
              <Card key={item.id}>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-1/5">
                      <Icon className="size-12"></Icon>  
                    </div>
                    <section className="flex flex-col gap-4 items-start">
                      <CardTitle>{item.course.name} {item.type} Class</CardTitle>

                      <CardDescription className="text-start line-clamp-2">{item.course.description}</CardDescription>

                      <div className="w-full">
                        <ClassInfo icon={lucideIcons.CreditCard} label="Monthly Fees" info={[item.monthlyFees + " MMK"]} /> 
                        <ClassInfo icon={lucideIcons.Calendar} label="Start Date" info={[item.startAt]} /> 
                        <ClassInfo icon={lucideIcons.Clock} label="Schedules" info={item.schedules.map(sche => `${sche.day} ${sche.startTime} to ${sche.endTime}`)} /> 
                      </div>

                    </section>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ClassInfo({icon, label, info} : {icon: lucideIcons.LucideIcon, label : string, info: string []}) {
  
  const Icon = icon

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-2 items-center">
        <Icon className="size-4"></Icon> {label}
      </div>

      <div className="text-end">
        {info.map((item, index) => 
          <div key={index}>{item}</div>
        )}
      </div>
    </div>
  )
}

type About = {
  title: string, 
  icon : lucideIcons.LucideIcon, 
  description: string
} 

function AboutUs() {

  const about:About[] = [
    {
      title: "Expert Curriculum",
      icon: BookOpen,
      description: "Industry-designed courses that cover everything from basics to advanced enterprise development."
    },
    {
      title: "Experienced Instructors",
      icon: lucideIcons.Users,
      description: "Learn from developers with 10+ years of experience working at top tech companies."
    },
    {
      title: "Hands-On Projects",
      icon: lucideIcons.Laptop,
      description: "Build real-world applications and create a portfolio that stands out to employers."
    },

  ]

  return (
    <section id="aboutUs" className="min-h-screen">
      <div className="px-16 py-24 text-center">

        <div className="mb-4">
          <h1 className="text-xl font-semibold">About Java Developer Class</h1>
        </div>

        <div className="px-32 text-foreground/70">
        <p>{"Java Developer Class is a premier online and in-person training institute dedicated to transforming aspiring developers into skilled Java professionals. Founded in 2020, we've helped thousands of students launch successful careers in software development."}</p>
        </div>

        <div className="px-32 py-12">
          <div className="grid grid-cols-3 gap-8">
            {about.map((item, index) => 
              <Card key={index}>
                <CardContent className="flex flex-col gap-3 items-center">
                  <item.icon className="size-12"></item.icon>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function OurCourses({data} : {data : CourseSummary []}) {
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
          <Link href={""}>
            <BookOpen /> Read More
          </Link>
        </Button>

      </CardContent>
    </Card>
  )
}