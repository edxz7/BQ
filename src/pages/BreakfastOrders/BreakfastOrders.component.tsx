import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, CardFooter, DropButton, FormField, RangeInput, TextInput, Avatar, Text } from 'grommet';
import { Add } from 'grommet-icons';
import { breakfastMenu } from '../../helpers/BreakfastMenuOptions';
import { MenuOrder, MenuItem} from '../../interfaces/Menu.interfcae';
interface Params {
  addOrder: (order: MenuOrder) => void;
}
const BreakfastOrders = ({ addOrder }: Params ) => {
  const [ qty, setQty ] = useState(0);
  const [ touched, setTouched ] = useState(false);
  const total = (item: MenuItem) : number => {
    let price = 0;
    price = item.sizes!.find((obj : any) => obj.size === 'estandard')!.price;
    return qty*(price);
  }
  return (
    <>
      {
        breakfastMenu.map((item, index) =>(
          <DropButton
            key={index}
            label={`${item.itemName}`}
            size="large"
            fill={true}
            margin={{vertical:"medium"}}
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Box
                background="accent-2">
                <Card background="light-1">
                  <CardHeader pad="small" flex={true} justify="evenly">
                    <Box>
                      <Avatar size="xlarge" src={item.imgUrl} round="xsmall"/>
                      <Text alignSelf="center">${(item.sizes![0]).price}</Text>
                    </Box>
                    <FormField label="Cantidad" error={ qty <= 0 && touched ? 'Debes especificar una cantidad' : null }>
                      <TextInput value={qty} onChange={(event) => setQty(+event.target.value)}/>
                    </FormField>
                  </CardHeader>
                  <CardFooter pad={{horizontal: "small"}} background="light-2">
                    <RangeInput
                        value={qty}
                        min={0}
                        max={10}
                        step={1}
                        onChange={(event) => setQty(+event.target.value)}
                      />
                    <Button
                      color="brand"
                      icon={<Add size='large' color="brand" />}
                      hoverIndicator
                      onClick={() => {
                        setTouched(true);
                        qty > 0 && addOrder({ itemName: item.itemName, itemQty:qty, total: total(item)});
                      }}
                    />
                  </CardFooter>
                </Card>
              </Box>
            }
          />
        ))
      }
    </>
  )
}

export default BreakfastOrders;