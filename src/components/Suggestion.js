import React from 'react';
import styled from 'styled-components';

const Suggestion = ({ id, bg }) => {
  return (
    // <Container>
    <Poster bg={bg} />
    // </Container>
  );
};

export default Suggestion;

// const Container = styled.div`
//   height: 380px;
//   width: 100%;
//   box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//   overflow: hidden;
//   border-radius: 7px;
// `;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 25%;
  width: 25%;
  background-size: cover;
  background-position: center center;
`;
