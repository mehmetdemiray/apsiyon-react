/**
 * INDEX
 * Layout'ların birleşimi. Ana Komponent.
 * Diğer componentler / sayfalar children olarak içerisine girer. 
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import { DEVICE_TYPE } from './../redux/actions/types';

// LAYOUT COMPONENTS
import { Header } from './header';
import { Content } from './content';
import { Settings } from './settingsPanel';

export const Layout = (props) => {
  const dispatch = useDispatch();
  const onlyWidth = useWindowWidth(); // Ekran genişliğini alacak. Kabataslak responsivite için.

  // USESELECTOR
  const themeColor = useSelector(state => state.SETTINGS.themeColor);

  /**
   * açılış dispatch ve ekran genişliklerinde tetiklenecek.
   * kaba hesapla device type belirler store'u günceller.
   */
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
      <Settings />
      <Header />
      <Content>
        {props.children}
      </Content>
    </div>
  );
}