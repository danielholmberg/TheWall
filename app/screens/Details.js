import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import { TextField } from 'react-native-material-textfield';
import ActionButton from 'react-native-action-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../config/styles';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      id: '',
      title: '',
      info: '',
      toggleEditMode: false,
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.navigation.state.params.data,
      id: this.props.navigation.state.params.data.id,
      title: this.props.navigation.state.params.data.title,
      info: this.props.navigation.state.params.data.info}, () => {
      console.log("Detailed Data: " + JSON.stringify(this.state.data));
    });
  }

  render() {
    var actionButton = (this.state.toggleEditMode)?
    <ActionButton
      buttonColor={colors.detailsScreenFAB}
      active={false}
      icon={<Ionicons name="md-send" style={styles.submitButton} />}
      fixNativeFeedbackRadius={true}
      onPress={() => this.submitChanges()}
    />:
    <ActionButton
      buttonColor={colors.detailsScreenFAB}
      icon={<FontAwesome name="pencil" style={styles.actionButtonIcon}/>}
      fixNativeFeedbackRadius={true}
      onPress={() => this.edit()}
    />
    var backgroundColor = 'white';
    var title = null;
    var info = null;
    if((this.state.data.type) == 'event'){
      backgroundColor = colors.eventCardBg
      title = (this.state.toggleEditMode) ?
      <TextField
        ref='TitleInput'
        label='Title'
        labelTextStyle={{fontWeight: 'bold'}}
        baseColor={colors.newEventTitleInputBase}
        tintColor={colors.newEventTitleInputTint}
        textColor={colors.newEventTitleInputText}
        autoCapitalize='words'
        autoFocus={true}
        returnKeyType='next'
        maxLength={30}
        value={this.state.title}
        onChangeText={(title) => this.setState({ title: title })}
        onSubmitEditing={() => this.refs.InfoInput.focus()}
      />:
      <Text
      selectable={true}
      style={styles.eventTitleText}>
        {this.state.title}
      </Text>
      info =
      <TextField
        ref='InfoInput'
        label='Information'
        editable={this.state.toggleEditMode}
        baseColor={(this.state.toggleEditMode)?colors.newEventInfoInputBase:'#FFFFFF00'}
        tintColor={colors.newEventInfoInputTint}
        textColor={colors.newEventInfoInputText}
        multiline={true}
        autoCapitalize='sentences'
        value={this.state.info}
        onChangeText={(info) => this.setState({ info: info })}
      />
    } else if((this.state.data.type) == 'notification'){
      backgroundColor = colors.notificationCardBg
      title = (this.state.toggleEditMode) ?
      <TextField
        ref='TitleInput'
        label='Title'
        labelTextStyle={{fontWeight: 'bold'}}
        editable={this.state.toggleEditMode}
        baseColor={(this.state.toggleEditMode)?colors.newNotificationTitleInputBase:'#FFFFFF00'}
        tintColor={colors.newNotificationTitleInputTint}
        textColor={colors.newNotificationTitleInputText}
        autoCapitalize='words'
        autoFocus={true}
        returnKeyType='next'
        maxLength={30}
        value={this.state.title}
        onChangeText={(title) => this.setState({ title: title })}
        onSubmitEditing={ () => this.refs.InfoInput.focus()}
      />:
      <Text
      selectable={true}
      style={styles.notificationTitleText}>
        {this.state.title}
      </Text>
      info =
      <TextField
        ref='InfoInput'
        label='Information'
        editable={this.state.toggleEditMode}
        baseColor={(this.state.toggleEditMode)?colors.newNotificationInfoInputBase:'#FFFFFF00'}
        tintColor={colors.newNotificationInfoInputTint}
        textColor={colors.newNotificationInfoInputText}
        multiline={true}
        autoCapitalize='sentences'
        value={this.state.info}
        onChangeText={(info) => this.setState({ info: info })}
      />
    } else if((this.state.data.type) == 'task'){
      backgroundColor = colors.taskCardBg
      title =
      <TextField
        ref='TitleInput'
        label='Title'
        labelTextStyle={{fontWeight: 'bold'}}
        editable={this.state.toggleEditMode}
        baseColor={(this.state.toggleEditMode)?colors.newTaskTitleInputBase:'#FFFFFF00'}
        tintColor={colors.newTaskTitleInputTint}
        textColor={colors.newTaskTitleInputText}
        autoCapitalize='words'
        autoFocus={true}
        returnKeyType='next'
        maxLength={30}
        value={this.state.title}
        onChangeText={(title) => this.setState({ title: title })}
        onSubmitEditing={ () => this.refs.InfoInput.focus()}
      />
      info =
      <TextField
        ref='InfoInput'
        label='Information'
        editable={this.state.toggleEditMode}
        baseColor={(this.state.toggleEditMode)?colors.newTaskInfoInputBase:'#FFFFFF00'}
        tintColor={colors.newTaskInfoInputTint}
        textColor={colors.newTaskInfoInputText}
        multiline={true}
        autoCapitalize='sentences'
        value={this.state.info}
        onChangeText={(info) => this.setState({ info: info })}
      />
    };

    return (
      <View style={{
        flex: 1,
        padding: 10,
        backgroundColor: backgroundColor}}>
        <View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
          {title}
          {info}
        </View>
        {actionButton}
      </View>
    );
  }

  // Changes the FAB between Edit-mode and Submit-mode
  edit(){
    this.setState({toggleEditMode: !this.state.toggleEditMode}, () => {
      this.refs.TitleInput.focus();
    });
  }

  submitChanges(){
    console.log('Changes submited: ' + '\n' + 'Title: ' + this.state.title + '\n' + 'Info: ' + this.state.info);

    if(this.state.title != '' || this.state.info != ''){
      const date = new Date();
      const timestamp = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString() + ' | '
      + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();

      const updatedEvent = {'id': timestamp, 'type': (this.state.data.type),'title': (this.state.title), 'info': (this.state.info)};
      this.setState({ data: updatedEvent }, () => {
        AsyncStorage.getItem("data")
        .then( req => JSON.parse(req))
        .then( json => {
          for(var item of json){
            if(item.id == this.state.id){
              console.log('Data with matching ID found: ' + data[i]);
              AsyncStorage.setItem(data[i], JSON.stringify(this.state.data))
                .then((data) => {
                  console.log('Successfully stored updated Data to AsyncStorage!');
                  this.props.navigation.goBack();
                })
                .catch(error => console.log('Error saving updated Data to AsyncStorage: ' + error));
            }
          }
        })
      });
    } else {
      /*if(this.state.title == ''){
        this.refs.TitleInput.focus();
      } else {
        this.refs.InfoInput.focus();
      }*/
      this.refs.InfoInput.focus();
    }
  }

  addPicture(){

  }

};

const styles = StyleSheet.create({
  eventTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.detailedEventTitle,
  },
  eventInfoText: {
    fontSize: 18,
    color: colors.detailedEventInfo,
  },
  notificationTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.detailedNotificationTitle,
  },
  notificationInfoText: {
    fontSize: 18,
    color: colors.detailedNotificationInfo,
  },
  taskTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.detailedTaskTitle,
  },
  taskInfoText: {
    fontSize: 18,
    color: colors.detailedTaskInfo,
  },
  actionButtonIcon: {
    fontSize: 22,
    color: colors.FABIcon,
  },
  submitButton: {
    fontSize: 20,
    color: colors.FABIcon
  },
});
