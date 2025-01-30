interface LandingVideoProps {
  vidSrc: string;
  title?: string;
}

const LandingVideo = ({ vidSrc, title }: LandingVideoProps) => {
  return (
    <div className="relative w-full h-[624px] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={vidSrc} type="video/mp4" />
        مروگر شما از ویدیو پشتیبانی نمی کند
      </video>

      {title && (
        <>
          {/* Overlay for Dark Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

          {/* Content (Optional) */}
          <div className="relative z-10 flex justify-center items-center h-full text-white">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingVideo;
