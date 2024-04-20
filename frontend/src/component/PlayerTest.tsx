import React, { useState, useRef, useEffect } from 'react';
import { FaBackward, FaForward, FaPlay, FaPause } from 'react-icons/fa';

const Player = () => {
  const [trackUrl, setTrackUrl] = useState<string[]>([
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/1.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/3.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/4.mp3',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/5.mp3',
  ]);

  const [trackImages, setTrackImages] = useState<string[]>([
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_1.jpg',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_2.jpg',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_3.jpg',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_4.jpg',
    'https://raw.githubusercontent.com/himalayasingh/music-player-1/master/img/_5.jpg',
  ]);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = trackUrl[currentTrackIndex];
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  const playNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === trackUrl.length - 1 ? 0 : prevIndex + 1));
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? trackUrl.length - 1 : prevIndex - 1));
    setIsPlaying(true);
  };

  const playPauseTrack = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const trackEnded = () => {
    playNextTrack();
  };

  return (
    <div>
      <div id="app-cover">
        <div id="player">
          <audio ref={audioRef} src={trackUrl[currentTrackIndex]} onEnded={trackEnded} />
          <div id="player-track">
            <div id="album-name"></div>
            <div id="track-name"></div>
            <div id="track-time">
              <div id="current-time"></div>
              <div id="track-length"></div>
            </div>
            <div id="s-area">
              <div id="ins-time"></div>
              <div id="s-hover"></div>
              <div id="seek-bar"></div>
            </div>
          </div>
          <div id="player-content">
            <div id="album-art">
              <img src={trackImages[currentTrackIndex]} 
                className={`active ${isPlaying ? 'spin' : ''}`} 
               id={`_${currentTrackIndex + 1}`} />
              <div id="buffer-box">Buffering ...</div>
            </div>
            <div id="player-controls">
              <div className="control">
                <div className="button" id="play-previous" onClick={playPreviousTrack}>
                  <FaBackward />
                </div>
              </div>
              <div className="control">
                <div className="button" id="play-pause-button" onClick={playPauseTrack}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </div>
              </div>
              <div className="control">
                <div className="button" id="play-next" onClick={playNextTrack}>
                  <FaForward />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;