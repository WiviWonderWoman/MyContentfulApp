import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
  cma: PlainClientAPI;
}

const CONTENT_FIELD_ID = 'helloWorld';

const Sidebar = (props: SidebarProps) => {
  const { sdk } = props;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const [bodyText, setBodyText] = useState(contentField.getValue());

  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBodyText(value);
    });
    return () => detach();
  }, [contentField]);
  console.log("TEXT: ",bodyText);
  
  return <Paragraph>{bodyText}</Paragraph>;
};

export default Sidebar;
