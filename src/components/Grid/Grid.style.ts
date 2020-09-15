import styled from 'styled-components';

export const GridMain = styled.main`
  display: grid;
  @media only screen and (min-width: 256px) {
      margin-left: 35px;
      margin-right: 35px;
      grid-template-columns: 100%;
    }
  @media only screen and (min-width: 760px) {
      grid-template-columns: 40% 60%;
    }
  @media only screen and (min-width: 960px) {
      grid-template-columns: 50% 50%;
    }
`;