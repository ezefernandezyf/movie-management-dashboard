import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: Props): React.JSX.Element => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0f1724',
            color: '#e6eef8',
            border: '1px solid rgba(148,163,184,0.06)',
            padding: '12px 14px',
            borderRadius: '8px',
            boxShadow: '0 6px 18px rgba(2,6,23,0.6)',
          },
        }}
      />
      {children}
    </>
  );
};
