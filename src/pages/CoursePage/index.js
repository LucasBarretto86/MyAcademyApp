import React, { useCallback, useEffect, useState } from 'react'
import PrivateLayout from '../../layouts/PrivateLayout'
import Accordion from '../../components/common/Accordion'
import { useParams } from 'react-router-dom'
import { useCourse } from '../../hooks/courses/useCourse'
import Lesson from './Lesson'

const CoursePage = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const { getCourse, loading, error } = useCourse()

  const fetchCourse = useCallback(async () => {
    const data = await getCourse(id)

    if (!data?.error) {
      setCourse(data)
    }

  }, [id, getCourse])

  useEffect(() => {
    fetchCourse()
  }, [id, fetchCourse])

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-4 w-full">
        {error && <p className="error-message">{error}</p>}
        {loading ? (<p>Loading...</p>) : (course && <>
          <h4 className="text-marine p-[1rem] text-center lg:text-left">{course.title}</h4>
          <div className=" lg:mx-0 mx-[-1rem]">
            {course.lessons.length > 0 && course.lessons.map((lesson) => (
              <Accordion
                key={lesson.id}
                isOpen={lesson.number === 1}
                heading={`#${lesson.number} - ${lesson.title}`}
                iconColor={'black'}
                content={<Lesson {...lesson} />}
              />
            ))}
          </div>
        </>)}
      </div>
    </PrivateLayout>
  )
}

export default CoursePage
