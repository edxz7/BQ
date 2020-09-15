import React from 'react';
import { Button, Box, Text, Layer, Heading } from 'grommet';
import { MenuOrder } from '../../interfaces/Menu.interfcae';
import NameFormatter from '../../components/NameFormatter/NameFormatter.component';
interface Params {
  open: boolean;
  callback: any;
  data?: any;
  onClose: () => void;
  textContent: { header: string, body: string}
}

const Modal = ({ open, data, callback, onClose, textContent }: Params) => {
  return (
    <>
      {open && (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              {textContent.header}
            </Heading>
            <Text>{textContent.body}</Text>
            {
              data && data.map((el: MenuOrder, i: number) => (
                <Box key={i} direction="row" justify="between" >
                  <NameFormatter  {...el}/>      
                  <span>x{el.itemQty} </span>          
                </Box>
              ))
            }
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="center"
              pad={{ top: 'medium', bottom: 'small' }}
            >
              <Button label="Cancelar" onClick={onClose} color="dark-3" />
              <Button
                label={
                  <Text color="white">
                    <strong>Confirmar</strong>
                  </Text>
                }
                onClick={() => { 
                  onClose();
                  callback();
                }}
                primary
                color="neutral-2"
              />
            </Box>
          </Box>
        </Layer>)
      }
    </>
  )
}


export default Modal;