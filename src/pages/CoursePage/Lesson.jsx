import React, { useState } from 'react'
import Modal from '../../components/common/Modal'
import VideoSample from '../../assets/video/sample.mp4'
import PlayIcon from '../../assets/vectors/player-play-alt.svg'
import VideoPlayer from '../../components/common/VideoPlayer'

const Lesson = ({ number, title, description }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row justify-start lg:justify-between gap-2 lg:p-8 p-5">
        <div className="flex flex-col gap-1">
          <h6 className="text-marine mb-2">Lesson:</h6>
          <p className="text-gray-400">{description}</p>
          <p className="text-gray-400 text-right lg:text-left"><strong>Duration: </strong>99:99.999</p>
        </div>

        <div className="flex flex-col gap-1 min-w-[8ch] cursor-pointer" onClick={() => setOpen(true)}>
          <img src={PlayIcon} className="h-[3rem]" alt="play-icon" />
          <p className="text-teal text-center">Play Now</p>
        </div>
      </div>

      {open && (
        <Modal
          isOpen={open}
          heading={`#${number} - ${title}`}
          onClose={() => setOpen(false)}
          content={<VideoPlayer videoSource={VideoSample} />}
        />)}
    </>
  )
}

export default Lesson
