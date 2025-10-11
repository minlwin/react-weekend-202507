import * as lucideIcons from 'lucide-react'

export type CourseSummary = {
    id: string
    name: string
    description: string
    icon: keyof typeof lucideIcons
}