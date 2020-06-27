import React from 'react';
import {useSelector} from 'react-redux';

import Container from '@material-ui/core/Container';

export const Content = (props) => {
  const device = useSelector(state => state.SETTINGS.deviceType);

  return (
    <Container className={device === "mobile" ? "content mobile" : "content"} maxWidth="md">
        {props.children}
    </Container>
  );
}