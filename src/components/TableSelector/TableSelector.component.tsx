import React from 'react';
import { Card, CardHeader, RangeInput, Text } from 'grommet';

interface Props {
  table: number;
  setTable: (table: number) => void;
}

const TableSelector = (props: Props) => {
  return (
    <Card margin="medium" style={{padding:'10px 0'}}>
      <CardHeader margin={{ horizontal:"large"}}>
        <Text>Mesa</Text>
          <RangeInput
              value={props.table}
              min={1}
              max={10}
              step={1}
              onChange={(event) => props.setTable(+event.target.value)}
            />
        <Text>{props.table}</Text>
      </CardHeader>
    </Card>
  )
}

export default TableSelector;