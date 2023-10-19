import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function CourseLise(){
    const dispatch = useDispatch();

    const {courseData} = useSelector((state) => state.course);
    
    async function loadCourses(){
        await
    }
    useEffect(() => {

    }, []);
}

export default CourseList;