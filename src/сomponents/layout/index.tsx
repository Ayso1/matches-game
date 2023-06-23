import React from 'react';
import styles from './index.module.css';
import { Layout as AntLayout } from 'antd';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
