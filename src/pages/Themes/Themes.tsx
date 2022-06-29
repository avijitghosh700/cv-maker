import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPrintable } from '../../store/cv/ui/uiSlice';

import ThemeOne from './ThemeOne/ThemeOne';

import './Themes.scss';

const Themes = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const print = () => {
    navigate('/themes/one');
    dispatch(setPrintable());
  }

  return (
    <section className="Themes">
      <Button type={"primary"} onClick={print}>
        Print
      </Button>
    </section>
  );
}

export default Themes;