import styled from 'styled-components';

export const GridMain = styled.main`
  display: grid;
  grid-template-columns: 50% 50%;
  @media only screen and (max-width: 524px) {
      margin-left: 35px;
      margin-right: 35px;
      grid-template-columns: 100%;
    }
`;