import React, { useCallback, useEffect, useState } from 'react'
import PrivateLayout from '../../layouts/PrivateLayout'
import { useCourses } from '../../hooks/courses/useCourses'
import CourseCard from '../../components/pages/CourseCard'
import { isMobile } from '../../utils/device'

const HomePage = () => {
  const [courses, setCourses] = useState([])
  const { getCourses, error, loading } = useCourses()

  const fetchCourses = useCallback(async () => {
    const data = await getCourses()

    if (!data?.error) {
      setCourses(data)
    }
  }, [getCourses])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  return (<PrivateLayout>
    <div className="flex flex-col items-center gap-8 w-full">
      <h3 className="w-full text-center text-marine">List of available Courses</h3>

      {error && <p className="error-message">{error}</p>}

      <div className="flex flex-col items-center gap-4 w-full">
        {!loading ? (<div style={{ display: 'grid', gridTemplateColumns: `${isMobile ? '1fr' : 'repeat(auto-fill, 20rem)'}`, gap: '1.5rem', width: '100%', justifyContent: 'center' }}>
            {courses?.map(({ id, title, description, lessons_count }) => (
              <CourseCard
                key={id}
                id={id}
                title={title}
                description={description}
                lessons_count={lessons_count}
              />
            ))}
          </div>)

          : <p>Loading...</p>}
      </div>
    </div>
  </PrivateLayout>)
}

export default HomePage
