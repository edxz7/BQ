import React from 'react';
import { CardHeader } from 'grommet';
import OrderCard from '../../components/OrderCard/OrderCard.component';
import Navbar from '../../components/Navbar/Navbar.component';
import AppHeader from '../../components/AppHeader/AppHeader.component';
const OrdersKitchen = () => {
  return (
    <>
      <AppHeader/>
      <OrderCard />
      <CardHeader justify="center">
        <Navbar/>
      </CardHeader>
    </>
  )
}

export default OrdersKitchen;