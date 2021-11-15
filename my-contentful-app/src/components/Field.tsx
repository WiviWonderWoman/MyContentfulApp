import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Paragraph, Grid, GridItem  } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}
const CONTENT_FIELD_ID = {column: 'columns', row: 'rows', data: 'data'};

const Field = (props: FieldProps) => {
  const { sdk } = props;

  const columnField = sdk.entry.fields[CONTENT_FIELD_ID.column];
  const rowField = sdk.entry.fields[CONTENT_FIELD_ID.row];
  const dataField = sdk.entry.fields[CONTENT_FIELD_ID.data];

  const [gridData, setGridData] = useState(
    {
      columns: columnField.getValue(),
      rows: rowField.getValue()
    });

  // Listen for onChange events and update the value
  useEffect(() => {
    const detachCol = columnField.onValueChanged((value) => {
      setGridData({columns: value, rows: rowField.getValue()});
      console.log('column: ', gridData);
    });
    const detachRow = rowField.onValueChanged((value) => {
      setGridData({columns: columnField.getValue(), rows: value});
      console.log('row: ',gridData);
    });
    return () => {
      detachCol();
      detachRow();
    };
  }, []);

  const handleClick=(value: number) => {
    dataField.setValue({value: value});
  }
  const gridItems= [];
  let rowCount=0;
  let columnCount=0;
  const total= gridData.columns*gridData.rows;

  for (let index = 0; index < total; index++) {
    if (columnCount === gridData.columns) {
      columnCount = 0;
      rowCount++;
    }
    gridItems.push(<GridItem  key={index} columnStart={columnCount} columnEnd={columnCount+1} rowStart={rowCount} rowEnd={rowCount+1} style={{border: 'solid 1px black'}}><button onClick={() => handleClick(index)}>{index}</button></GridItem>);
    columnCount++;
  }

  return (
  <>
    <Grid columns={gridData.columns} rows={gridData.rows} >
      {gridItems}
    </Grid>
  </>
  );
};

export default Field;
