"use client";

export default function Loader({ text = "Loading...", size = 32, full = false }) {
  return (
    <div className={`${full ? "min-h-screen bg-black flex justify-center items-center" : ""} w-full text-center px-4`}>
      <div className="flex flex-col items-center gap-4">
        {/* Liquid blob that splits and merges */}
        <div className="relative" style={{ width: size * 2, height: size }}>
          {/* Main blob */}
          <div 
            className="absolute bg-gradient-to-r from-[#5063C6] via-[#B71CD2] to-[#5063C6] rounded-full shadow-lg"
            style={{
              width: size * 0.8,
              height: size * 0.8,
              left: '10%',
              top: '10%',
              animation: 'blob1 3s ease-in-out infinite'
            }}
          />
          
          {/* Split blob */}
          <div 
            className="absolute bg-gradient-to-l from-[#B71CD2] via-[#5063C6] to-[#B71CD2] rounded-full shadow-lg"
            style={{
              width: size * 0.6,
              height: size * 0.6,
              right: '5%',
              top: '20%',
              animation: 'blob2 3s ease-in-out infinite'
            }}
          />
          
          {/* Connecting trail */}
          <div
            className="absolute bg-gradient-to-r from-transparent via-[#5063C6]/50 to-transparent h-4 rounded-full"
            style={{
              width: size * 1.2,
              top: '40%',
              left: '20%',
              animation: 'trail 3s ease-in-out infinite'
            }}
          />
        </div>
        
        <p className="text-sm font-medium text-white">{text}</p>
      </div>
      
      <style jsx>{`
        @keyframes blob1 {
          0%, 100% { 
            transform: scale(1) translateX(0);
            border-radius: 50%;
          }
          33% { 
            transform: scale(1.3) translateX(${size * 0.3}px);
            border-radius: 40% 60% 30% 70% / 60% 30% 70% 40%;
          }
          66% { 
            transform: scale(0.8) translateX(${size * 0.6}px);
            border-radius: 30% 70% 60% 40% / 40% 60% 30% 70%;
          }
        }
        
        @keyframes blob2 {
          0%, 100% { 
            transform: scale(0.5) translateX(0);
            opacity: 0.7;
            border-radius: 50%;
          }
          33% { 
            transform: scale(1.1) translateX(-${size * 0.4}px);
            opacity: 1;
            border-radius: 60% 40% 70% 30% / 30% 70% 40% 60%;
          }
          66% { 
            transform: scale(1.5) translateX(-${size * 0.8}px);
            opacity: 0.8;
            border-radius: 70% 30% 40% 60% / 60% 40% 70% 30%;
          }
        }
        
        @keyframes trail {
          0%, 100% { 
            opacity: 0;
            transform: scaleX(0.2);
          }
          50% { 
            opacity: 0.6;
            transform: scaleX(1.5);
          }
        }
      `}</style>
    </div>
  );
}