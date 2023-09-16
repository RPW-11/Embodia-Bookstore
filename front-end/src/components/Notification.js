import { useState, useEffect } from 'react';

function Notification({ message, handler}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      handler();
    }, 2000); // Set the duration for the notification to remain visible

    return () => clearTimeout(timer);
  }, [handler]);

  return (
    <div
      className={`fixed top-0 right-0 m-4 p-4 bg-stone-500 text-white rounded-md transition-opacity ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
}

export default Notification;
