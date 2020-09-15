import React, {useState, useEffect} from 'react';
import { Box, Heading, Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';
import AppHeader from '../../components/AppHeader/AppHeader.component';
import fire from '../../config/firebase';
import Moment from 'react-moment';
import Navbar from '../../components/Navbar/Navbar.component';
const Dashboard = () => {
  const [ allOrders, setAllOrders ] = useState([] as firebase.firestore.DocumentData)

  const getAllOrders = async () => {
    let mounted = true;
    fire.firestore().collection('orders-dashboard').onSnapshot((querySnapshop) => {
      const docs = [] as firebase.firestore.DocumentData;
      querySnapshop.forEach((doc) =>  docs.push({ ...doc.data(), id: doc.id }));
      mounted && setAllOrders(docs);
    });
    return () => mounted = false;
  }

  useEffect(() => {
    getAllOrders();
  }, [])


  return (
    <>
      <AppHeader/>
      <Box direction='row' flex > 
        <Box flex align='center' justify='center'>
          <Navbar/>
        </Box>
      </Box>
      <Box pad="small" basis="small">
        <Heading level={3}>
          <Box gap="small">
            <strong>Tablero de ordenes</strong>
          </Box>
        </Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Timestamp
              </TableCell>
              <TableCell scope="col" border="bottom">
                Mesa
              </TableCell>
              <TableCell scope="col" border="bottom">
                Menu Type
              </TableCell>
              <TableCell scope="col" border="bottom">
                Active
              </TableCell>
              <TableCell scope="col" border="bottom">
                Total
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* <InfiniteScroll
              renderMarker={marker => (
                <TableRow>
                  <TableCell>{marker}</TableCell>
                </TableRow>
              )}
              scrollableAncestor="window"
              // items={allOrders}
              step={step}
            > */}
              {
              // (allOrders: any) => {
                allOrders.length > 0 ? allOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Moment fromNow>
                        {order.created_at.toDate().getTime()}
                      </Moment>
                    </TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell>{order.menuType}</TableCell>
                    <TableCell>{
                    order.active ? <Box background="accent-1" pad="small">Activa</Box> : <Box background="status-critical" pad="small">Cerrada</Box>
                    }</TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                )) : null
                // }
              }
            {/* </InfiniteScroll> */}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default Dashboard;