import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}
const CONTENT_FIELD_ID = 'helloWorld';

const Field = (props: FieldProps) => {
  const { sdk } = props;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const [inputData, setInputData] = useState(contentField.getValue());
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  
  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      const obj = { "name": value};
      JSON.stringify(obj);
      console.log(obj);
      setInputData(obj);
    });
    return () => detach();
  }, [contentField]);

  return (
  <>
    <Paragraph>JSON object in console @ Field.tsx:27 </Paragraph>
  </>
  );
};

export default Field;
