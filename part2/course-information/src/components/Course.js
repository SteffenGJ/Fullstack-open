import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({course}) => {
    return (
        <div>
            {course.map(course => (
            <div key={course.id}>
                <Header name={course.name}/>
                <Content parts={course.parts}/>
                <Total parts={course.parts}/>
            </div>
            ))}
        </div>
    )
}

export default Course;