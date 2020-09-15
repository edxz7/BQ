import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Box, Grid, ResponsiveContext, Text } from 'grommet';
import { Clock } from 'grommet-icons';
import { MenuOrder } from '../../interfaces/Menu.interfcae';
import fire from '../../config/firebase';
import Modal from '../Modal/Modal.component';
import Moment from 'react-moment';

interface Params {
  table: number;
  oderList: MenuOrder[]
} 
const OrderCard = () => {
  const size = useContext(ResponsiveContext);
  const [ orders, setOrders ] = useState([] as firebase.firestore.DocumentData);
  const [currentId, setCurrentId] = useState("");
  const [open, setOpen] = useState(false);
  const [ date, setDate ] = useState(0);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const getOrders = async () => {
    let mounted = true;
    fire.firestore().collection('orders').onSnapshot((querySnapshop) => {
      const docs = [] as firebase.firestore.DocumentData;
      querySnapshop.forEach((doc) =>  docs.push({ ...doc.data(), id: doc.id }));
      mounted && setOrders(docs);
    });
    return () => mounted = false;
  }

  const endService = async (id: string) => {
    await fire.firestore().collection("orders").doc(id).delete();
  }

  const updateOrderStatus = (id: string) => {
    fire.firestore().collection("orders-dashboard").doc(id).update({ "active": false });
  }

  const colorTime = (dateParam: number) => {
    const transcurredTime = (Date.now() - dateParam) / 1000 / 60;
    let bg = transcurredTime < 10 ? 'accent-1' : transcurredTime < 20 ? 'status-warning' : 'status-error';
    console.log('Cual es el date', transcurredTime)
    return bg;
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
      <Modal 
        textContent={ {header: 'Orden Entregada', body: 'Confirma que esta orden ya fue entregada'} } 
        callback={() => {
            console.log("currentId: ", currentId);
            endService(currentId)
            updateOrderStatus(currentId)
          }
        } 
        open={open} onClose={onClose}/>
      <Box pad="large" fill>
        <Grid columns={size !== 'small' ? 'medium' : '100%'} gap="large">
          {
            orders.length > 0 ? orders.map((order: any) => (
              <Card key={order.id} background="light-1">
                <CardHeader pad="small">Mesa: {order.table}</CardHeader>
                <CardBody pad="small">
                 Orden: {
                  order.orders.map((item: MenuOrder) => (
                    <CardHeader key={item.itemName} pad="xsmall">
                      {
                        item.itemName.split('-').length === 1 
                        ? <strong>{item.itemName}</strong>
                        : <Box> 
                            <strong>{item.itemName.split('-')[0]}</strong>
                            <CardHeader>
                              extras:
                              {
                                item.extras && item.extras.length > 0
                                ? item.extras.map(extra => <span key={extra}>{extra} </span>) 
                                : 'Sin extras' 
                              }       
                            </CardHeader>
                          </Box>
                      }
                      <Text weight="bold"> x{item.itemQty} </Text>
                    </CardHeader>
                  ))
                }
                </CardBody>
                <CardFooter pad={{horizontal: "small", vertical: 'xsmall'}} background={ colorTime(order.created_at.toDate()) }>   
                  <Button onClick={() => {
                    let mounted = true;
                    mounted && setCurrentId(order.id);
                    onOpen();
                    console.log("currentId: ", currentId);
                    return () => mounted = false;
                    }} primary color="accent-5" label="Cerrar Orden" hoverIndicator/>
                    <CardHeader justify="center" >
                      <Button 
                        icon={<Clock color="plain" />} hoverIndicator
                        label={ <Moment
                          onChange={() =>{
                          setDate(order.created_at.toDate()) 
                          colorTime(date)
                          }} fromNow>{order.created_at.toDate()}</Moment> } plain>
                      </Button>
                    </CardHeader>
                </CardFooter>
              </Card>
            )) : (<Text size="xlarge">No hay pedidos pendientes, exelente trabajo  <span role="img" aria-label="queen">👸🏻</span></Text>)
          }
        </Grid>
      </Box>
    </>
  )
}

export default OrderCard;