import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity, AsyncStorage, LayoutAnimation } from 'react-native';
import { Card } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import OnePlusIcon from '../res/icons/OnePlusIcon';

import Swipeable from 'react-native-swipeable';
import Orientation from 'react-native-orientation';

import { colors } from '../config/styles';
import ActionButton from 'react-native-action-button';

export default class Main extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      leftActionActivated: false,
      isActionButtonVisible: true,
      fabActive: true,
    };
    const listViewOffset = 0;
  }

  componentWillMount() {
    Orientation.lockToPortrait();
  }

  componentDidMount() {
    this.getListData();
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log('Current Device Orientation: '+ {orientation} );
    });

    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  /* Get list data from AsyncStorage (Localstorage) */
  getListData() {
    AsyncStorage.getItem("data")
      .then(req => JSON.parse(req))
      .then(json => {
        console.log('Successfully loaded from AsyncStorage!');
        console.log('Loaded Data: ' + JSON.stringify(json));
        this.setState({
          data: json,
          isLoading: false
        });
      }).catch(error => {
        console.log('Error getting Data from AsyncStorage: ' + error);
        this.setState({ isLoading: false });
      });
  }

  /* Render-function for creating each card in the List */
  renderItem({item}) {
    var card = null;
    if(item.type == 'event'){
      card =
      <TouchableOpacity onPress={() => this.showDetails({item})} activeOpacity={1}>
        <Card style={styles.eventCard}
          title={item.title}
          titleStyle={styles.eventTitle}
          dividerStyle={{backgroundColor: colors.cardDivider, height: 2}}>
          <Text
            numberOfLines={3}
            ellipsizeMode={'tail'}
            style={styles.eventInfo}>
              {item.info}
          </Text>
          <Text style={{color: colors.timestampEvent}}>
            {item.id}
          </Text>
        </Card>
      </TouchableOpacity>
    } else if(item.type == 'notification'){
      card =
      <TouchableOpacity onPress={() => this.showDetails({item})} activeOpacity={1}>
        <Card style={styles.notificationCard}
          title={item.title}
          titleStyle={styles.notificationTitle}
          dividerStyle={{backgroundColor: colors.cardDivider, height: 2}}>
          <Text
            numberOfLines={3}
            ellipsizeMode={'tail'}
            style={styles.notificationInfo}>
              {item.info}
          </Text>
          <Text style={{color: colors.timestampNotification}}>
            {item.id}
          </Text>
        </Card>
      </TouchableOpacity>
    } else if (item.type == 'task'){
      card =
      <TouchableOpacity onPress={() => this.showDetails({item})} activeOpacity={1}>
        <Card style={styles.taskCard}
          title={item.title}
          titleStyle={styles.taskTitle}
          dividerStyle={{backgroundColor: colors.cardDivider, height: 2}}>
          <Text
            numberOfLines={3}
            ellipsizeMode={'tail'}
            style={styles.taskInfo}>
              {item.info}
          </Text>
          <Text style={{color: colors.timestampTask}}>
            {item.id}
          </Text>
        </Card>
      </TouchableOpacity>
    };

 	  return (
      <Swipeable
        leftButtons={[
          <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: (this.state.leftActionActivated) ? colors.checkmarkGreenBg : colors.trashRedBg}]}
            onPress={() => (this.state.leftActionActivated) ? this.completedRowItem():this.deleteRowItem(item)}>
              {(this.state.leftActionActivated) ? <Icon name="check" style={styles.leftSwipeIcon}/>:
              <Icon name="trash" style={styles.leftSwipeIcon}/>}
          </TouchableOpacity>]
        }
        rightButtons={[
          <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: colors.firstRightSwipeButton}]}>
            <Icon name="bell" style={styles.rightSwipeIcon} />
          </TouchableOpacity>,
          <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: colors.secondRightSwipeButton}]}>
            <Icon name="tasks" style={styles.rightSwipeIcon} />
          </TouchableOpacity>]
        }
        leftButtonWidth={60}
        rightButtonWidth={60}
        onLeftActionActivate={() => this.setState({leftActionActivated: !this.state.leftActionActivated})}>
        {card}
      </Swipeable>
    );
  }

  /* Main render function */
  render() {
    var flatListView = (this.state.isLoading)?<View/>:
    <FlatList
      data={this.state.data}
      renderItem={({item}) => this.renderItem({item})}
      keyExtractor={(item, index) => index}
      onScroll={(event) => this.onScroll(event)}
      />

    var actionButtonView = (this.state.isActionButtonVisible)?
    <ActionButton buttonColor={colors.mainScreenFAB} icon={<Icon name="plus" style={styles.mainScreenFABIcon} />} bgColor="rgba(0, 0, 0, 0.6)" fixNativeFeedbackRadius={true}>
      // TODO - Temporary delete all button
      <ActionButton.Item buttonColor={colors.trashRedBg} useNativeFeedback={false} title="Delete all rows" onPress={() => {AsyncStorage.clear();}}>
        <Icon name="trash" size={26} style={styles.actionButtonIcon} />
      </ActionButton.Item>

      <ActionButton.Item buttonColor={colors.newTaskFAB} useNativeFeedback={false} title="New Task" onPress={() => this.createNewTask()}>
        <Icon name="tasks" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={colors.newNotificationFAB} useNativeFeedback={false} title="New Notification" onPress={() => this.createNewNotification()}>
        <Icon name="bell" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={colors.newEventFAB} useNativeFeedback={false} title="New Event" onPress={() => this.createNewEvent()}>
        <OnePlusIcon src="oneplus-logo" size={24} color='white' style={{bottom: 1}} />
      </ActionButton.Item>
    </ActionButton>:null

    return(
      <View style={styles.container}>
        <View style={{flex:1, alignSelf: 'stretch'}} >
          {flatListView}
        </View>
          {actionButtonView}
      </View>
    );
  }

  /* Fade out Floating Action Button when scrolling down */
  onScroll(event) {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
    }
    // Check if the user is scrolling up or down by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = (currentOffset > 0 && currentOffset > this.listViewOffset) ? 'down' : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === 'up'
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear)
      this.setState({ isActionButtonVisible })
    }
    // Update your scroll position
    this.listViewOffset = currentOffset;
  }

  deleteRowItem({item}) {
    console.log("Delete row item pressed!");
    AsyncStorage.removeItem(item.id)
      .then((data) => console.log('Item deleted!'))
      .catch(error => console.log('Error removing item! ' + error));
  }

  completedRowItem() {
    console.log("Completed row item pressed!");
  }

  createNewTask() {
    this.props.navigation.navigate('NewTask', { data: this.state.data });
  }

  createNewNotification() {
    this.props.navigation.navigate('NewNotification', { data: this.state.data });
  }

  createNewEvent() {
    this.props.navigation.navigate('NewEvent', { data: this.state.data });
  }

  showDetails({item}) {
    this.props.navigation.navigate('Details', { data: item });
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // 1:1 ratio
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainWallBg
  },
  eventCard: {
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    elevation: 4,
    backgroundColor: colors.eventCardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationCard: {
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    elevation: 4,
    backgroundColor: colors.notificationCardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCard: {
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    elevation: 4,
    backgroundColor: colors.taskCardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  leftSwipeIcon: {
    fontSize: 24,
    color: colors.swipeIcon,
  },
  rightSwipeIcon: {
    fontSize: 24,
    color: colors.swipeIcon,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.eventTitle,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.notificationTitle,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.taskTitle,
  },
  eventInfo: {
    paddingBottom: 10,
    fontSize: 14,
    color: colors.eventInfo,
  },
  notificationInfo: {
    paddingBottom: 10,
    fontSize: 14,
    color: colors.notificationInfo,
  },
  taskInfo: {
    paddingBottom: 10,
    fontSize: 14,
    color: colors.taskInfo,
  },
  actionButtonIcon: {
    fontSize: 22,
    color: colors.FABIcon,
  },
  mainScreenFABIcon: {
    color: colors.FABIcon,
    fontSize: 20,
  }
});
