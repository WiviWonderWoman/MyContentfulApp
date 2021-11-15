import React from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  cma: PlainClientAPI;
}

const Sidebar = (props: SidebarProps) => {
  return <Paragraph>Wivis sidebar component</Paragraph>;
};

export default Sidebar;
