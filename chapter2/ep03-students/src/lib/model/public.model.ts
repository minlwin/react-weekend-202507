import * as lucideIcons from 'lucide-react'

export type CourseSummary = {
    id: string
    name: string
    description: string
    icon: keyof typeof lucideIcons
}

export type CourseTopics = {
    title: string
    description: string
}

export type CourseDetails = CourseSummary & {
    topics: CourseTopics[]
}

export type Schedule = {
    day: string
    startTime: string
    endTime: string
}

export type ClassSummary = {
    id: string
    course : CourseSummary
    type: 'Campus' | 'Online'
    startAt: string
    months: number
    monthlyFees: number
    schedules: Schedule[]
}