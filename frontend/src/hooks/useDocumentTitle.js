import { useEffect } from 'react';

const APP_NAME = 'BookStore';

/**
 * useDocumentTitle('Title') -> sets "Title | BookStore"
 * useDocumentTitle('Title', { appendAppName: false }) -> sets "Title"
 */
export default function useDocumentTitle(title, { appendAppName = true } = {}) {
  useEffect(() => {
    const previous = document.title;
    document.title = appendAppName ? `${title} | ${APP_NAME}` : title;
    return () => {
      document.title = previous; // restore previous title on unmount (optional)
    };
  }, [title, appendAppName]);
}
