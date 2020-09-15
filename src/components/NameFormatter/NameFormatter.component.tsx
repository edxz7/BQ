import React from 'react';
import { Box, Paragraph } from 'grommet';
import { MenuOrder } from '../../interfaces/Menu.interfcae';

const NameFormatter = (item : MenuOrder) => {
  return (
    <>
      {
        item.itemName.split('-').length === 1 
        ? <strong>{item.itemName}</strong>
        : <Box> 
            <strong>{item.itemName.split('-')[0]} </strong>
            {
              item.extras && item.extras.length > 0
              ? <Paragraph>
                  extras: { }
                    {
                      item.extras && item.extras.length > 0
                    ? item.extras.map(extra => <span key={extra}>{extra} { } </span>) 
                      : 'Sin extras' 
                    } 
                </Paragraph>
              : null  
            }  
          </Box>
      }
    </>
  )
}

export default NameFormatter;