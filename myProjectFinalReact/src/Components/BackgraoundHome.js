import React, { useRef, useEffect } from 'react';
import video from '../Assets/video/video1.mp4'

const BackgroundHome = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.play();

    videoRef.current.addEventListener('ended', () => {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    });

    document.addEventListener('touchstart', () => {
      videoRef.current.play();
    });
  }, []);

  return (
    <>
      <video ref={videoRef} width="100%" height="auto" loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
}

export default BackgroundHome;
