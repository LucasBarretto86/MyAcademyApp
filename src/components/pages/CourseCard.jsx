import React from 'react'
import Video from '../../assets/images/video.svg'

const CourseCard = ({ id, title, description, lessons_count, cover }) => {
  return (
    <div onClick={(e) => (console.log(e.target))} className="flex flex-col cursor-pointer border border-gray-300 rounded-lg shadow-xl hover:opacity-75 z-10 h-full">
      <div className="course-card flex flex-col p-4 z-20 bg-white overflow-hidden rounded-lg h-full">
        <div className="flex justify-center items-center p-4"><img src={cover || Video} className="flex self-auto h-[10rem]" alt="thumbnail" /></div>
        <div className="flex flex-col h-full w-full gap-2">
          <h6 className="mb-1 text-marine">{title}</h6>
          <p>{description}</p>
          <p className="text-right mt-auto text-marine">Lessons: {lessons_count}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
