import styled from 'styled-components';

export const LogHeaderStyles = styled.div`
  text-align: center;
  padding:100px 0 0 0;
  color:#a1aec1;
  a{
    text-decoration:none;
  }
`;

export const LoginStyles = styled.form`
    text-align: center;
    max-width: 220px;
    margin: 40px auto;
    padding:40px;
    box-shadow: 0 10px 15px 10px rgba(0,0,0,0.25);
    background: #ffffff;
    border-radius:20px;
    h1 {
      font-weight: 100;
      color: #0e101c;
      text-align: center;
      padding-bottom: 10px;   
    }
    hr {
      margin: 40px;
    }
    h2 {
      color: #0e101c;
      font-weight: 200;
    }
    span {
        margin:10px 0;
    }
    p {
      color: #bf1650;
    }

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #0e101c;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 13px;
      margin-top: 20px;
      color: #4a5568;
      font-size: 14px;
      font-weight: 200;
    }
    button[type="submit"], 
    input[type="submit"] {
      background: #f92b82;
      color: #ffffff;
      text-transform: uppercase;
      border-radius:10px;
      margin-top: 10px;
      padding: 15px;
      font-size: 14px;
      font-weight: 100;
      /* letter-spacing: 10px; */
    }
    button[type="submit"]:hover,
    input[type="submit"]:hover {
      background: #bf1650;
    }
    button[type="submit"]:active, 
    input[type="button"]:active,
    input[type="submit"]:active {
      transition: 0.3s all;
      transform: translateY(3px);
      border: 1px solid transparent;
      opacity: 0.8;
    }
    input:disabled {
      opacity: 0.4;
    }
    button[type="submit"],
    input[type="button"],
    input[type="submit"] {
      -webkit-appearance: none;
    }
    .errorMsg {
      color: red;
      font-size: 16px;
    }
`