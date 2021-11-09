import React, {useState} from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}
// The field ID from my Hello World field
const CONTENT_FIELD_ID = 'helloWorld';

const Field = (props: FieldProps) => {
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/

  // The sdk allows us to interact with the Contentful web app
  const { sdk } = props;

  // With the field ID we can reference individual fields from an entry
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  console.log(contentField);

  return <Paragraph>Hello Wivis Entry Field Component</Paragraph>;
};

export default Field;
