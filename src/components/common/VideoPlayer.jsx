import React, { useEffect, useRef, useState } from 'react'

import PlayIcon from '../../assets/vectors/player-play.svg'
import PauseIcon from '../../assets/vectors/player-pause.svg'
import FullScreenIcon from '../../assets/vectors/player-fullscreen.svg'
import { formatDuration } from '../../utils/formatters'

const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null)
  const progressBarRef = useRef(null)
  const elapsedRef = useRef(null)
  const durationRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play()
      setPlaying(true)
      elapsedRef.current.innerHTML = formatDuration(video.currentTime)
      durationRef.current.innerHTML = formatDuration(video.duration || 0)
    }
  }, [videoRef])

  const handlePlayPause = () => {
    const video = videoRef.current

    if (playing) {
      setPlaying(false)
      video.pause()
    } else {
      setPlaying(true)
      video.play()
    }
  }

  const handleFullscreen = () => {
    const video = videoRef.current

    if (video.requestFullscreen) video.requestFullscreen()
  }

  const handleVideoSkip = (e) => {
    const video = videoRef.current

    video.currentTime = ((e.target.value / 100) * video.duration)
  }

  const handleProgressBar = () => {
    const video = videoRef.current
    const progressBar = progressBarRef.current

    elapsedRef.current.innerHTML = formatDuration(video.currentTime)
    durationRef.current.innerHTML = formatDuration(video.duration)
    progressBar.value = ((video.currentTime / video.duration) * 100)
  }

  return (
    <div className="player">
      <video className="source" ref={videoRef} data-playing={playing} onTimeUpdate={handleProgressBar} controls={false}>
        <source src={videoSource} type="video/mp4" />
        This player is currently playing this video
      </video>

      <div className="flex flex-col gap-1 mb-2">
        <input
          className="player-progressbar w-full"
          type="range"
          ref={progressBarRef}
          value={0}
          onChange={handleVideoSkip}
        />
        <div className="player-controls flex self-end gap-2"><small><span ref={elapsedRef}></span>/<span ref={durationRef}></span></small></div>
      </div>

      <div className="player-controls flex justify-between gap-2">
        <div className="flex gap-2">
          <div className="player-btn-play cursor-pointer" onClick={handlePlayPause}><img className="h-[2rem] w-auto" src={(playing ? PauseIcon : PlayIcon)} alt="play icon" /></div>
        </div>

        <div className="flex gap-2">
          <div className="player-btn-max cursor-pointer" onClick={handleFullscreen}><img className="h-[2rem] w-auto" src={FullScreenIcon} alt="fullscree icon" /></div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
