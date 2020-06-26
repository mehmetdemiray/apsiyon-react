import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { DEVICE_TYPE } from './../redux/actions/types';

import { Header } from './header';
import { Content } from './content';

export const Layout = (props) => {
  const onlyWidth = useWindowWidth();
  const dispatch = useDispatch();
  const themeColor = useSelector(state => state.SETTINGS.themeColor);

  useEffect(() => {
    changeDevice()
    function changeDevice() {
      if (onlyWidth < 720) {
        dispatch({type: DEVICE_TYPE, payload: 'mobile'})
      } else {
        dispatch({type: DEVICE_TYPE, payload: 'desktop'})
      }
    }
  }, [onlyWidth, dispatch])

  return (
    <div className={'layout ' + themeColor}>
        <Header />
        <Content>
          {props.children}
        </Content>
    </div>
  );
}