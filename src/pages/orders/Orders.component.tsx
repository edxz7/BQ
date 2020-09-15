import React, { useState, useContext } from 'react';
import { Box, Heading, Main, Paragraph, Tabs, Tab, Text, Card } from 'grommet';
import Grid from '../../components/Grid/Grid.component';
import BreakfastOrders from '../BreakfastOrders/BreakfastOrders.component';
import { RightStyle } from './Orders.style';
import Total from '../total/Total.component';
import Navbar from '../../components/Navbar/Navbar.component';
import AppHeader from '../../components/AppHeader/AppHeader.component';
import MainMenuOrders from '../MainMenuOrders/MainMenuOrders.component';
import TableSelector from '../../components/TableSelector/TableSelector.component';
import { MenuOrder } from '../../interfaces/Menu.interfcae';
import { MyContext } from '../../contexts/context';

const Orders = () => {
  const context = useContext(MyContext);
  const [ orderList, setOrderList ] = useState<MenuOrder[]>([]);
  const [ table, setTable ] = useState(1);
  const [ menuType, setMenuType ] = useState('Desayuno')
  const addOrder = (order: MenuOrder) => {
    let repeated = orderList.findIndex(o => {
      return o.itemName === order.itemName
    });
    if(repeated === -1) {
      setOrderList([...orderList, order])      
    } else {
      const newOrderList = orderList.map((o, i) => i === repeated ? { itemName: order.itemName, itemQty: o.itemQty+order.itemQty, extras: order.extras ? order.extras : [], total: o.total + order.total } : o);
      setOrderList(newOrderList);
    } 
  }

  const removeFromOrder = (name: string) => {
    setOrderList(orderList.filter((order) => order.itemName !== name));
  }

  const calculateTotal = (orderList: MenuOrder[]): number => {
    return orderList.reduce((acc, el) => acc + el.total, 0);
  }

  const takeOrder = () => {
    let mounted = true;
    const total = calculateTotal(orderList);
    context.submitOrder(table, orderList, total, menuType);
    mounted && setOrderList([]);
    return () => mounted = false;
  }

  // const addOrEditOrder = async () => {
  //   try {
  //     if (currentId === "") {
  //       context.submitOrder(table, orderList);
  //       // toast("Nueva Orden Creada", { type: "success" });
  //     } else {
  //       context.appendToOrder(currentId, orderList);
  //       // toast("Link Updated Successfully", { type: "info" });
  //       setCurrentId("");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <AppHeader/>
      <Grid>
        <Box
          direction="row"
          responsive={true}
          fill={true}
          flex
        >
          <Tabs flex='grow' justify="start" onActive={
            (i) => {
              i === 0 ? setMenuType('Desayuno') : setMenuType('Main')
              setOrderList([])
            }} >
            <Tab title="Desayuno">
              <Main margin={{horizontal:"20px"}} pad={{right:"40px"}} fill="horizontal">
                <Heading>Desayuno</Heading>
                <TableSelector table={table} setTable={setTable}/>
                <Text>Selecciona el producto para tomar la orden:</Text>
                <Box flex align='center' justify='center'>
                  <Paragraph >
                    <BreakfastOrders
                      addOrder={addOrder}
                    />
                  </Paragraph>
                </Box>
              </Main>
            </Tab>
            <Tab title="Resto del Dia">
              <Main margin={{horizontal:"20px"}} pad={{right:"40px"}} fill="horizontal">
                <Heading>Resto del Dia</Heading>
                <TableSelector table={table} setTable={setTable}/>
                <Text>Selecciona el producto para tomar la orden:</Text>
                <Box flex align='center' justify='center'>
                  <Paragraph >
                    <MainMenuOrders
                      addOrder={addOrder}
                    />
                  </Paragraph>
                </Box>
              </Main>
            </Tab>
          </Tabs>
        </Box>
        <RightStyle>
          <Box 
            direction="row-responsive"
            responsive={true}
            wrap={true}
            fill={true}
          >
            <Main>
              <Heading className="heading" margin={{bottom:"33.500px"}}>Total</Heading>
              <Text margin={{bottom:"30px"}}>Verifica la orden antes de enviarla:</Text>
              <Card margin={{right:"20px"}}>
                <Total
                  table={table}
                  orderList={orderList}
                  calculateTotal={calculateTotal}
                  removeFromOrder={removeFromOrder}
                  takeOrder={takeOrder} 
                />
              </Card>
            </Main>   
          </Box>
        </RightStyle>
      </Grid>
      <Box direction='row' flex > 
        <Box flex align='center' justify='center'>
          <Navbar/>
        </Box>
      </Box>
    </>
  )
}

export default Orders;