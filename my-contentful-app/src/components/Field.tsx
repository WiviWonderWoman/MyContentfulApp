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

  const [gridData, setGridData] = useState(
    {
      columns: columnField.getValue(),
      rows: rowField.getValue()
    });

  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = columnField.onValueChanged((value) => {
      setGridData({columns: value, rows: rowField.getValue()});
      console.log('column: ', gridData);
    });
    return () => detach();
  }, [columnField]);

  useEffect(() => {
    const detach = rowField.onValueChanged((value) => {
      setGridData({columns: columnField.getValue(), rows: value});
      console.log('row: ',gridData);
    });
    return () => detach();
  }, [rowField]);
  return (
  <>
    <Paragraph>JSON object in console @ Field.tsx:31 + 42</Paragraph>
    <Grid columns={gridData.columns} rows={gridData.rows}>
      <GridItem columnStart={gridData.columns} columnEnd={gridData.columns} rowStart={gridData.rows} rowEnd={gridData.rows}  style={{color: "white", backgroundColor: "green"}}>
        <p>X </p>
      </GridItem>
    </Grid>
  </>
  );
};

export default Field;
