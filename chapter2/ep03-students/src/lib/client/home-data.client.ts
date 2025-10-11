"use server-only"

import { CourseSummary } from "../model/public.model";

export async function getCoursSummary():Promise<CourseSummary[]> {
    return [
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
}