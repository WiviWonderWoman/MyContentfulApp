import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph, Grid, GridItem  } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}
const CONTENT_FIELD_ID = {column: 'columns', row: 'rows'};

const Field = (props: FieldProps) => {
  const { sdk } = props;

  const columnField = sdk.entry.fields[CONTENT_FIELD_ID.column];
  const rowField = sdk.entry.fields[CONTENT_FIELD_ID.row];

  const [columnData, setColumnData] = useState(columnField.getValue());
  const [rowData, setRowData] = useState(rowField.getValue());
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  
  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = columnField.onValueChanged((value) => {
      const columnObj = { "columns": value};
      JSON.stringify(columnObj);
      console.log('BEFORE: ',columnObj);
      setColumnData(columnObj);
      console.log(columnData);
    });
    return () => detach();
  }, [columnField]);

  useEffect(() => {
    const detach = rowField.onValueChanged((value) => {
      const rowObj = { "rows": value};
      JSON.stringify(rowObj);
      console.log('BEFORE: ',rowObj);

      setRowData(rowObj);
      console.log(rowData);
    });
    return () => detach();
  }, [rowField]);

  return (
  <>
    <Paragraph>JSON object in console @ Field.tsx:31 + 42</Paragraph>
    <Grid columns={columnData} rows={rowData}>
      <GridItem columnStart={columnData} columnEnd={columnData} rowStart={rowData} rowEnd={rowData}  style={{color: "white", backgroundColor: "green"}}>
        X
      </GridItem>
    </Grid>
  </>
  );
};

export default Field;
