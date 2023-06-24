import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const AppLink: React.FC<Props> = ({ children, ...props }) => {
  const { push } = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    push(props.href);
  };

  return (
    <a
      {...props}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        ...(props.style ?? {}),
      }}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default AppLink;
