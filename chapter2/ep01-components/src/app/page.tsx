import { Fragment } from "react"

export default function Home() {

  const subjects = ["Javascript", "TypeScript", "React", "Java", "Spring"]

  return (
    <>
      <h1>Hello React</h1>
      <p>This is my first react component</p>

      <ul>
        {subjects.map((item, index) => 
          <Fragment key={index}>
            <li>{item}</li>
          </Fragment>
        )}
      </ul>
    </>    
  )
}
