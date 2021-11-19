import React, { useState, useEffect } from 'react';
import { PlainClientAPI } from 'contentful-management';
import { Grid, GridItem  } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}
// get the fields by id
const CONTENT_FIELD_ID = {column: 'columns', row: 'rows', data: 'data'};

const Field = (props: FieldProps) => {

  // The sdk allows interaction with the Contentful web app
  const { sdk } = props;

  // reference individual fields from an entry with the field ID 
  const columnField = sdk.entry.fields[CONTENT_FIELD_ID.column];
  const rowField = sdk.entry.fields[CONTENT_FIELD_ID.row];
  const dataField = sdk.entry.fields[CONTENT_FIELD_ID.data];

  // Get the current value from the fields and store it in React state
  const [gridData, setGridData] = useState(
    {
      columns: columnField.getValue(),
      rows: rowField.getValue()
    });

  // Listen for onChange events and update the value
  useEffect(() => {
    const detachCol = columnField.onValueChanged((value) => {
      setGridData({columns: value, rows: rowField.getValue()});
      // console.log('column: ', gridData);
    });
    const detachRow = rowField.onValueChanged((value) => {
      setGridData({columns: columnField.getValue(), rows: value});
      // console.log('row: ',gridData);
    });
    return () => {
      detachCol();
      detachRow();
    };
  }, []);

  // Listen for onClick event and update the JSON-object value
  const handleClick=(value: number) => {
    dataField.setValue({value: value});
  }

  // Array for GridItems
  const gridItems= [];
  // Variables for loop
  let rowCount=0;
  let columnCount=0;
  const total= gridData.columns*gridData.rows;

  // Loop through columns and rows
  for (let index = 0; index < total; index++) {
    if (columnCount === gridData.columns) {
      columnCount = 0;
      rowCount++;
    }// Add GridItem to array
    gridItems.push(<GridItem  key={index} columnStart={columnCount} columnEnd={columnCount+1} rowStart={rowCount} rowEnd={rowCount+1} style={{border: 'solid 1px black'}}><button onClick={() => handleClick(index)}>{index}</button></GridItem>);
    columnCount++;
  }

  return (
  <>
    <Grid columns={gridData.columns} rows={gridData.rows} >
      {/* render all GridItems in the array */}
      {gridItems}
    </Grid>
  </>
  );
};

export default Field;
