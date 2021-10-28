import React, { useState, useMemo } from 'react';
import { StyledToastWrapper } from './style';

import ToastContext from './context';
import Toast from './Toast';

// Create a random ID
function generateUEID() {
  const first = Math.random() * 46656 || 0;
  const second = Math.random() * 46656 || 0;

  const firstS = `000${first.toString(36)}`.slice(-3);
  const secondS = `000${second.toString(36)}`.slice(-3);

  return firstS + secondS;
}

function withToastProvider(Component) {
  function WithToastProvider(props) {
    const [toasts, setToasts] = useState([]);
    const add = (content, type) => {
      const id = generateUEID();
      setToasts([...toasts, { id, content, type }]);
    };
    const remove = id => setToasts(toasts.filter(t => t.id !== id));
    const providerValue = useMemo(() => {
      return { add, remove };
    }, [toasts]);

    return (
      <ToastContext.Provider value={providerValue}>
        <Component {...props} />
        <StyledToastWrapper>
          {toasts.map(t => (
            <Toast key={t.id} remove={() => remove(t.id)} type={t.type}>
              {t.content}
            </Toast>
          ))}
        </StyledToastWrapper>
      </ToastContext.Provider>
    );
  }

  return WithToastProvider;
}

export default withToastProvider;
