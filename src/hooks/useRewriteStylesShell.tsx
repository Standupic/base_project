import { useLayoutEffect } from 'react';

const useRewriteStylesShell = () => {
  useLayoutEffect(() => {
    const styles = document.createElement('style');

    styles.innerHTML = `
      html, body, #root, .root-app, .root-app__home, .app-container {
        background-color: var(--neutral-00) !important;
      }
    
      .feedback-form, .root-app__nav {
        display: none !important;
      }

      .root-app__content {
        padding: 10px !important;
      }
    
      .rf-datepicker__input-wrapper, .rf-input--filled { 
         background-color: var(--neutral-05) !important;
         border-radius: 8px;  
      }
      .rf-input {
         box-shadow: none !important;
      }
    `;

    document.head.appendChild(styles);

    return () => {
      document.head.removeChild(styles);
    };
  }, []);
};

export default useRewriteStylesShell;
