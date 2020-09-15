import React, { useState } from 'react';
import { Box, Button, Card, CardHeader, CardFooter, DropButton, FormField, RangeInput, TextInput, Text, RadioButtonGroup, CheckBoxGroup, Avatar } from 'grommet';
import { Add } from 'grommet-icons';
import { MainMenu } from '../../helpers/MainMenuOptions';
import { MenuOrder, MenuItem } from '../../interfaces/Menu.interfcae';

interface Params {
  addOrder: (order: MenuOrder) => void;
}

const MainMenuOrders = ({ addOrder }: Params ) => {
const [ qty, setQty ] = useState(0);
const [ touched, setTouched ] = useState(false);
const [type, setType] = React.useState('res');
const [hSize, hSetSize] = React.useState('Sencilla');
const [dSize, dSetSize] = React.useState('500ml');
const [extra, setExtra] = React.useState([]);

const total = (item: MenuItem) : number => {
  let price = 0;
  let accPrice = 0
  if(item.sizes && item.category === 1) {
    price = item.sizes.find((obj : any) => obj.size === hSize)!.price;
  }
  if(item.sizes && item.category === 2) {
    price = item.sizes.find((obj : any) => obj.size === dSize)!.price;
  }
  if(item.category === 3) {
    accPrice = item.sizes!.find((obj : any) => obj.size === 'estandard')!.price;
  } 
  return qty*(price + extra.length + accPrice);
}
 return (
  <>
  {
    MainMenu.map((item, index) =>(
      <DropButton
        key={index}
        label={`${item.itemName}`}
        size="large"
        fill={true}
        margin={{vertical:"medium"}}
        dropAlign={{ top: 'bottom', right: 'right' }}
        dropContent={
          <Box>
            <Card >
              <CardHeader pad={{vertical: "small"}} flex justify="center">
              </CardHeader>
              {
                item.type && (
                  <CardHeader pad="small" background="light-2">
                    <Text>Hamburguesa</Text>
                    <CardHeader flex justify="center">
                          <RadioButtonGroup
                            direction="row"
                            align="stretch"
                            name="type"
                            options={['res', 'pollo', 'veggie']}
                            value={type}
                            onChange={(event: any) => {
                              setType(event.target.value)
                            }}
                          />

                    </CardHeader>
                  </CardHeader>
                )
              }

              {
                item.sizes && (
                  <CardHeader pad="small" flex>
                    <Text> Tamaño: </Text>
                    <RadioButtonGroup
                            direction="row"
                            align="stretch"
                            name="sizes"
                            options={item.sizes.map(({size}) => size)}
                            value={item.category === 1 ? hSize : item.category === 2 ? dSize : 'estandard'}
                            onChange={(event: any) => {
                              item.category === 1 ? hSetSize(event.target.value) : dSetSize(event.target.value)
                            }}
                          />
                  </CardHeader>
                )
              }

              {
                item.extras && item.extras.options && (
                  <CardHeader pad="small" flex background="light-2">
                    <Text> Extras: </Text>
                    <CheckBoxGroup 
                      direction="row"
                      align="stretch"
                      options={item.extras.options as any} 
                      value={extra}
                      onChange={(nextValue: any ) => setExtra(nextValue.value)}
                      />
                  </CardHeader>
                )
              }
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
                    onChange={(event) => {setQty(+event.target.value)}}
                  />
                <Button
                  color="brand"
                  icon={<Add size='large' color="brand" />}
                  hoverIndicator
                  onClick={() => {
                    setTouched(true);
                    if( item.category === 1) {
                      qty > 0 && addOrder({ itemName: `${item.itemName} ${hSize}: ${type}-${extra}`, itemQty:qty, extras: extra, type, total: total(item), size: hSize });
                    } else if(item.category === 2) {
                      qty > 0 && addOrder({ itemName: `${item.itemName} ${dSize}`, itemQty:qty, total: total(item), size: dSize });
                    } else {
                      qty > 0 && addOrder({ itemName: item.itemName, itemQty:qty, total: total(item) });
                    }
                    setExtra([]);
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

export default MainMenuOrders;