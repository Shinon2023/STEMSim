import { useEffect, useRef } from 'react';

export default function useFormToggle() {
  const wrapperRef = useRef(null);
  const loginLinkRef = useRef(null);
  const registerLinkRef = useRef(null);
  const btnPopupRef = useRef(null);
  const iconCloseRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const loginLink = loginLinkRef.current;
    const registerLink = registerLinkRef.current;
    const btnPopup = btnPopupRef.current;
    const iconClose = iconCloseRef.current;

    const handleRegisterClick = () => {
      wrapper.classList.add('active');
    };

    const handleLoginClick = () => {
      wrapper.classList.remove('active');
    };

    const handlePopupClick = () => {
      wrapper.classList.add('active-popup');
    };

    const handleCloseClick = () => {
      wrapper.classList.remove('active-popup');
    };

    registerLink?.addEventListener('click', handleRegisterClick);
    loginLink?.addEventListener('click', handleLoginClick);
    btnPopup?.addEventListener('click', handlePopupClick);
    iconClose?.addEventListener('click', handleCloseClick);

    return () => {
      registerLink?.removeEventListener('click', handleRegisterClick);
      loginLink?.removeEventListener('click', handleLoginClick);
      btnPopup?.removeEventListener('click', handlePopupClick);
      iconClose?.removeEventListener('click', handleCloseClick);
    };
  }, []);

  return {
    wrapperRef,
    loginLinkRef,
    registerLinkRef,
    btnPopupRef,
    iconCloseRef,
  };
}
