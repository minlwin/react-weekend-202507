import "server-only"

import { addDays, formatDate } from "date-fns";
import { ClassSummary, CourseDetails, CourseSummary } from "./public.model";
import { title } from "process";

export async function getCoursSummary():Promise<CourseSummary[]> {
    return COURSES
}

export async function getCourseById(id:string):Promise<CourseDetails | undefined> {
    return COURSES.filter(a => a.id === id).map(a => ({...a, topics: [
        {title: "Language Foundation", description : "How to write a java program. Varaibles, Methods, Operators, Expression, Statements. etc."},
        {title: "OOP", description : "Object Oriented Programming Concepts in Java Language. Object, Classes, Encapsulation, Inheritance, Abstraction, Polymorphism."},
        {title: "Essential Java API", description : "Java API in Standard Java SE. Exceptions, IO, Generics and Collections, Lambda Expression and Streams API."},
        {title: "New Language Features", description : "New Features up to Java 25."},
    ]})).pop()
}

export async function getAvailableClasses():Promise<ClassSummary[]> {
    return COURSES.map((a, i) => ({
        id: String(i + 1),
        course: a,
        months: (i + 1) % 7,
        monthlyFees: 100000,
        type: i % 2 == 0 ? 'Campus' : 'Online',
        startAt: formatDate(addDays(new Date, i * 3), 'yyyy-MM-dd'),
        schedules: [
            {day : 'SAT', startTime: "9:00am", endTime: "12:00am"},
            {day : 'SUN', startTime: "9:00am", endTime: "12:00am"},
        ]
    }))
}

const COURSES:CourseSummary[] = [
    {
        id : "1",
        name: "Java Basic",
        description: "Start from the foundations — variables, data types, object-oriented programming, and problem-solving with clean code.",
        icon: "Coffee"
    },
    {
        id : "2",
        name: "Spring Framework",
        description: "Learn how to build powerful, scalable backend applications using Spring Boot, REST APIs, and modern microservice architecture.",
        icon: "Leaf"
    },
    {
        id : "3",
        name: "React",
        description: "Create dynamic, user-friendly web interfaces using the most popular front-end library in the world.",
        icon: "Laptop"
    },
    {
        id : "4",
        name: "One Stop",
        description: "Our One Stop Course is the ultimate learning path for anyone who wants to become a complete Java Full-Stack Developer — from beginner to job-ready level.",
        icon: "Flame"
    },
    {
        id: "5",
        name: "Python",
        description: "Python is a high-level, general-purpose programming language known for its emphasis on code readability, achieved through the use of significant indentation. Created by Guido van Rossum and first released in 1991, Python has evolved into a versatile and widely used language.",
        icon: "Snowflake"
    }
]