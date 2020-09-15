import React from 'react';
import { GridMain } from './Grid.style';
const Grid = (props: any) => {
  return (
    <GridMain>
      {props.children}
    </GridMain>
  );
}

export default Grid;