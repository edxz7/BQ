import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Image, Header, Button, Box } from 'grommet';
import { MyContext } from '../../contexts/context';
import logo from '../../assets/LOGO.png';
const AppHeader = () => {
  const context = useContext(MyContext);
  const { push } = useHistory();
  return (
    <Header background="dark-1" margin={{bottom:'30px'}}>
      <Button> 
      <Box height="50px" width="100px"> 
        <Image
          fit="cover"
          src={logo}
        />
      </Box>
      </Button>
      <Menu 
        label="Sesion" 
        items={[
          { 
            label: 'logout', onClick: () => { 
            let mounted = true;  
            context.logout();
            mounted && context.setUser(false);
            push("/")
            return () => { mounted = false; }
            } 
          },{
            label: 'dashboard', onClick: () => { 
              push("/dashboard")
            }
          }]} 
          />
      
    </Header>
  );
}

export default AppHeader;