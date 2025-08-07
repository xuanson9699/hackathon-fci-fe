import { memo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useOutlet } from 'react-router-dom';

import useCenterService from '@/services/center.service';

import {
  ACCESS_TOKEN_KEY,
  GET_REFERENCE_BY_PROJECT_QUERY_KEY,
  GET_USER_INFO_QUERY_KEY,
} from '../constants';
import VerticalNavigation from './VerticalNavigation';
import ButtonBase from '../ui/button-base';

const MainLayout = (): JSX.Element => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);

  const [userName, setUserName] = useState<string | null>(null);

  const { getUserInfo } = useCenterService();

  const { data, isFetching } = useQuery({
    queryKey: [GET_USER_INFO_QUERY_KEY, userName],
    queryFn: () => getUserInfo({ name: userName }),
    keepPreviousData: true,
    enabled: !!userName,
  });

  // useEffect(() => {
  //   if (!access_token) {
  //     navigate('/login');
  //   }
  // }, [navigate, access_token]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const allButtons = Array.from(document.querySelectorAll('button'));
  //     const startChatBtn = allButtons.find(
  //       (btn) =>
  //         btn.textContent?.trim().toLowerCase() === 'start chat' &&
  //         btn.classList.contains('btn-primary'),
  //     );

  //     console.log('Target button:', startChatBtn, allButtons);

  //     if (startChatBtn && !startChatBtn.dataset.listenerAttached) {
  //       startChatBtn.addEventListener('click', () => {
  //         console.log('Dify Start Chat button clicked!');
  //         // Gọi API, dispatch Redux, gửi event,... tùy ý
  //       });
  //       startChatBtn.dataset.listenerAttached = 'true'; // Để tránh gắn nhiều lần
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const observer = new MutationObserver((mutations) => {
    const btns = [...document.querySelectorAll('button')];
    const target = btns.find((btn) => btn.textContent?.trim().toLowerCase() === 'start chat');

    if (target) {
      console.log('🎯 Đã tìm thấy nút Start Chat:', target);

      // Gắn sự kiện click
      target.addEventListener('click', () => {
        console.log('✅ Nút Start Chat được click!');
        // Gửi API tại đây nếu cần
      });

      observer.disconnect(); // Dừng theo dõi sau khi đã tìm thấy
    }
  });

  // Bắt đầu theo dõi toàn bộ body để phát hiện thêm element
  observer.observe(document.body, {
    childList: true, // theo dõi element con được thêm vào hoặc xóa đi
    subtree: true, // theo dõi cả cây con của body
  });

  const updateChatbotVariables = ({
    center_name,
    project_name,
    reference_ids,
  }: {
    center_name: string;
    project_name: string;
    reference_ids: string[];
  }) => {
    // Gỡ bỏ iframe chatbot nếu đã tồn tại
    const iframe = document.getElementById('dify-chatbot-bubble-frame');
    if (iframe) iframe.remove();

    // Gỡ bỏ script cũ
    const oldScript = document.getElementById('dify-embed-script');
    if (oldScript) oldScript.remove();

    // Gán lại config mới
    window.difyChatbotConfig = {
      token: 'wq5o8waXpwoG0twJ',
      baseUrl: 'https://udify.app',
      systemVariables: {
        center_name,
        project_name,
        reference_ids,
      },
      userVariables: {},
    };

    // Nhúng lại script mới
    const script = document.createElement('script');
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.id = 'dify-embed-script';
    document.body.appendChild(script);
  };

  console.log('Removing old iframe...');
  console.log('Setting new config:', window.difyChatbotConfig);
  console.log('Appending new script...');

  return (
    <div className="z-10 fixed inset-0 h-full w-full flex">
      <ButtonBase
        onClick={() => {
          setUserName('sonpx88');
          updateChatbotVariables({
            center_name: 'Center A',
            project_name: 'Project A',
            reference_ids: ['ref1', 'ref2'],
          });
        }}
      >
        Click
      </ButtonBase>
      <VerticalNavigation />
      <main className="h-screen flex flex-col flex-auto min-h-full w-2 min-w-0 relative z-30 shrink-0 overflow-y-auto overflow-x-hidden bg-gray-100 main-container">
        {outlet}
      </main>
    </div>
  );
};

export default memo(MainLayout);
