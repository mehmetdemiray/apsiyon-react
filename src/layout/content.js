import React from 'react';
import Container from '@material-ui/core/Container';

export const Content = (props) => {
  return (
    <Container className="content" maxWidth="lg">
        {props.children}
    </Container>
  );
}