import React, { useState } from 'react';
import { Card, Table, TableHeader, TableRow, TableCell, TableBody, CardHeader, Text, Button } from 'grommet';
import { MenuOrder } from '../../interfaces/Menu.interfcae';
import Modal from '../../components/Modal/Modal.component';
import NameFormatter from '../../components/NameFormatter/NameFormatter.component';

interface Params {
  table: number;
  orderList: MenuOrder[];
  removeFromOrder: (name: string) => void;
  calculateTotal: (orderList: MenuOrder[]) => number;
  takeOrder: () => void;
}



const Total = ({ orderList, removeFromOrder, calculateTotal, table, takeOrder }: Params) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  
  return (
    <>
      <Modal 
        textContent={ { header: 'Confirma el envio de la orden', body: 'Confirma la orden antes de enviarla' } }
        data={orderList}
        callback={() => takeOrder()} open={open} onClose={onClose}/>
      <Text margin={{bottom:"10px"}}> <strong>Mesa: {table}</strong></Text>
      {
        orderList.length > 0 
        ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col" border="bottom">
                  Menu
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Cantidad
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Costo
                </TableCell>
              </TableRow>
            </TableHeader>
            {
              orderList.map((item, index) => (
                <TableBody key={index}>
                  <TableRow>
                    <TableCell scope="row">
                      <NameFormatter {...item}/>
                    </TableCell>
                    <TableCell>{item.itemQty}</TableCell>
                    <TableCell>{item.total}</TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => removeFromOrder(item.itemName)}
                        color="status-critical" label="Borrar"/>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))
            }
          </Table>
        ) 
        : null
      }
      <Card>
        <CardHeader pad="medium">
          <Text>Costo Total:</Text>
          <Text>${calculateTotal(orderList)}</Text>
        </CardHeader>
      </Card>
      {
        orderList.length > 0 ? (
          <Button primary label="Enviar Orden" onClick={onOpen}/>
        ) : null
      }
    </>
  )
}

export default Total;