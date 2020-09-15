import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginStyles, LogHeaderStyles } from './LoginStyles';
import { MyContext } from "../../contexts/context";
import { Box, Button, Image } from "grommet";
import logo from '../../assets/LOGO.png';

const Login = () => {
  const context = useContext(MyContext);
  const { push } = useHistory();
  const [ errorsMessages, setErrorsMessages ] = useState('')
  const [formData, updateFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  };

  const clearErrors = () => {
    setErrorsMessages('')
  }
  
  const handleLogin = () => {
    clearErrors();
    console.log('the form ', formData)
    context.handleLogin(formData.email, formData.password).then(()=>{
      push("/orders");
    }).catch((err: any) => {
    switch(err.code) {
      case 'auth/invalid-email':
        setErrorsMessages('El email posee un formato incorrecto');
        break;
      case 'auth/user-disabled':
        setErrorsMessages('Esta cuenta ha sido deshabilitada');
        break;
      case 'auth/user-not-found':
        setErrorsMessages('Correo o password incorrectos');
        break;
      case 'auth/wrong-password':
        setErrorsMessages('Correo o password incorrectos');
        break;
      }
      (formData.email.length === 0 || formData.password.length === 0)
      && setErrorsMessages('Ambos campos son obligatorios');
    })
  }

  return (
    <div style={{background:'#e2e8f0', height:'100vh'}}>
      <LogHeaderStyles>
        <Box direction='row' flex > 
          <Box flex align='center' justify='center'>
            <Box height="50px" width="100px">
              <Image
                fit="cover"
                src={logo}
              />
            </Box>
          </Box>
        </Box>  
        <h4>Iniciar sesión</h4>
        <span>
            Si no tienes cuenta solicita una a la administradora de tu sucursal
        </span>
      </LogHeaderStyles>
      
      <LoginStyles onSubmit={(e) => {
          e.preventDefault();
          clearErrors();
          handleLogin();
        }
        }>
        <p className="errorMsg">{errorsMessages}</p>
        <label>
          <strong>Correo:</strong>
          <input
            name="email"
            type="text"
            placeholder='correo'
            onChange={handleChange}
            autoFocus
          />
        </label>
        <label>
          <strong>password:</strong>
          <input
            name="password"
            type="password"
            placeholder='*********'
            onChange={handleChange}
            autoFocus
          />
        </label>
        <Button type="submit" primary label="Iniciar Sesión" />
      </LoginStyles>
    </div>
  );
};

export default Login;