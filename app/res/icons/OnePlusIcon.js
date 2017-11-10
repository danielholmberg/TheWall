import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import config from '../fonts/oneplus/config.json';
let Icon = createIconSetFromFontello(config);

let OnePlusIcon = ({src, size, color, style}) => (
  <Icon name={src} size={size} color={color} style={style} />
)

OnePlusIcon.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string.isRequired,
  styles: PropTypes.object,
}

module.exports = OnePlusIcon;
