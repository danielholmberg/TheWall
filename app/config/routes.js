/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import NewEvent from '../screens/NewEvent';
import NewNotification from '../screens/NewNotification';
import NewTask from '../screens/NewTask';
import Details from '../screens/Details';

import { colors } from '../config/styles';

export const MainStack = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'The Wall',
      headerStyle: { backgroundColor: colors.headerBg },
      headerTitleStyle: { color: colors.headerTitleColor },
    },
  },
  NewEvent: {
    screen: NewEvent,
    navigationOptions: {
      title: 'New Event',
    },
  },
  NewNotification: {
    screen: NewNotification,
    navigationOptions: {
      title: 'New Notification',
    },
  },
  NewTask: {
    screen: NewTask,
    navigationOptions: {
      title: 'New Task',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
});

const styles = {

};
