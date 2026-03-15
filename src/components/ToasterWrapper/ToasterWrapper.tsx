import { Toaster } from 'react-hot-toast';

export const ToasterWrapper = (): React.JSX.Element => (
  <Toaster
    position="top-right"
    containerStyle={{ zIndex: 99999 }}
    toastOptions={{
      duration: 4000,
      style: {
        background: '#0f172a',
        color: '#f8fafc',
      },
    }}
  />
);
