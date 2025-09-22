type AuthFormTemplateProps = {
    title : string
    icon : React.ReactNode
    children: React.ReactNode
}

export default function AuthFormTemplate({title, icon, children} : AuthFormTemplateProps) {
    return (
        <section>
            <h1 className="mb-4 flex items-center gap-2 text-2xl">{icon} {title}</h1>
            {children}
        </section>
    )
}