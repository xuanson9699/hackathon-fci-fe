import { styled } from 'styled-components';

import { getPublicImageUrl } from '@/components/utils';

const UserLoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Styled className="w-full h-full flex justify-center items-center min-h-screen">
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="flex flex-col items-center">
        {/* <img
          className="h-16 w-32 object-contain select-none"
          // src={getPublicImageUrl('adjust_logo.png')}
          src={getPublicImageUrl('camera-ai-logo.png')}
          alt=""
        /> */}
        {children}
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .bubble {
    position: absolute;
    bottom: -100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    opacity: 0.6;
    animation: bubble-rise 15s infinite linear;
  }

  .bubble:nth-child(1) {
    width: 40px;
    height: 40px;
    left: 10%;
    animation-duration: 12s;
  }
  .bubble:nth-child(2) {
    width: 20px;
    height: 20px;
    left: 20%;
    animation-duration: 18s;
    animation-delay: 2s;
  }
  .bubble:nth-child(3) {
    width: 60px;
    height: 60px;
    left: 35%;
    animation-duration: 15s;
    animation-delay: 4s;
  }
  .bubble:nth-child(4) {
    width: 30px;
    height: 30px;
    left: 50%;
    animation-duration: 20s;
    animation-delay: 1s;
  }
  .bubble:nth-child(5) {
    width: 50px;
    height: 50px;
    left: 65%;
    animation-duration: 14s;
    animation-delay: 3s;
  }
  .bubble:nth-child(6) {
    width: 25px;
    height: 25px;
    left: 80%;
    animation-duration: 16s;
    animation-delay: 5s;
  }

  @keyframes bubble-rise {
    0% {
      bottom: -100px;
      transform: translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      bottom: 100vh;
      transform: translateX(100px);
      opacity: 0;
    }
  }
`;

export default UserLoginLayout;
