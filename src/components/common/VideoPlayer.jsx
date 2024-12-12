import React, { useEffect, useRef, useState } from 'react'

import PlayIcon from '../../assets/vectors/player-play.svg'
import PauseIcon from '../../assets/vectors/player-pause.svg'
import FullScreenIcon from '../../assets/vectors/player-fullscreen.svg'
import { formatDuration } from '../../utils/formatters'

const VideoPlayer = ({ videoSource }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const currentTimeRef = useRef(null)
  const durationRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
      setPlaying(true)
      setVideo(videoRef.current)
    }
  }, [video, videoRef])

  const handlePlayPause = () => {
    if (playing) {
      setPlaying(false)
      video.pause()
    } else {
      setPlaying(true)
      video.play()
    }
  }

  const handleFullscreen = () => {
    if (video.requestFullscreen) video.requestFullscreen()
  }

  const handlerProgress = () => {
    video.currentTime = ((progressRef.current.value / 100) * video.duration)
  }

  const handleTrackers = () => {
    currentTimeRef.current.innerHTML = formatDuration(video.currentTime)
    durationRef.current.innerHTML = formatDuration(video.duration)
    progressRef.current.value = ((video.currentTime / video.duration) * 100)
  }

  return (
    <div className="player" data-playing={playing}>
      <video className="player-video" ref={videoRef} onTimeUpdate={handleTrackers} controls={false}>
        <source className="player-video-source" src={videoSource} type="video/mp4" />
        This player is currently playing this video
      </video>

      <div className="player-tracker">
        <input
          className="player-tracker-progress"
          type="range"
          ref={progressRef}
          onChange={handlerProgress}
        />
        <div className="player-tracker-duration"><span ref={currentTimeRef}></span>/<span ref={durationRef}></span></div>
      </div>

      <div className="player-controls">
        <div className="player-controls-block player-controls-left">
          <div className="player-controls-control" onClick={handlePlayPause}>
            <img className="player-controls-icon player-control-play" src={(playing ? PauseIcon : PlayIcon)} alt="play or pause icon" />
          </div>
        </div>

        <div className="player-controls-block player-controls-right">
          <div className="player-control-control" onClick={handleFullscreen}>
            <img className="player-controls-icon player-control-fullscreen" src={FullScreenIcon} alt="fullscreen icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
