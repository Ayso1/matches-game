import React from 'react';
import { Layout, Space, Typography, Button } from 'antd';
import Link from 'next/link';
import styles from './index.module.css';
import AppLink from '../link';

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <AppLink href="/">
          <Button>MatcherGame</Button>
        </AppLink>
      </Space>
      <Space>
        <AppLink href="/firstmode">
          <Button>1 mode</Button>
        </AppLink>
        <AppLink href="/secondmode">
          <Button>2 mode</Button>
        </AppLink>
        <AppLink href="/thirdmode">
          <Button>3 mode</Button>
        </AppLink>
      </Space>
    </Layout.Header>
  );
};
