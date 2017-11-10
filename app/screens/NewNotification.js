import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import ActionButton from 'react-native-action-button';

import { colors } from '../config/styles';

const type_key = 'notification';

export default class NewNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: '',
      info: '',
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params.data });
  }

  render() {
    var titleTextField =
    <TextField
      ref='TitleInput'
      label='Title'
      labelTextStyle={{fontWeight: 'bold'}}
      baseColor={colors.newNotificationTitleInputBase}
      tintColor={colors.newNotificationTitleInputTint}
      textColor={colors.newNotificationTitleInputText}
      autoCapitalize='words'
      autoFocus={true}
      returnKeyType='next'
      maxLength={30}
      value={this.state.title}
      onChangeText={(title) => this.setState({ title: title })}
      onSubmitEditing={ () => this.refs.InfoInput.focus()}
    />
    var infoTextField =
    <TextField
      ref='InfoInput'
      label='Information'
      multiline={true}
      autoCapitalize='sentences'
      baseColor={colors.newNotificationInfoInputBase}
      tintColor={colors.newNotificationInfoInputTint}
      textColor={colors.newNotificationInfoInputText}
      value={this.state.info}
      onChangeText={ (info) => this.setState({ info: info }) }
    />
    var actionButtonView =
    <ActionButton
      buttonColor="rgba(231,76,60,1)"
      active={false}
      icon={<Icon name="md-send" style={styles.submitButton} />}
      fixNativeFeedbackRadius={true}
      onPress={() => this.submitEvent()}
    />
    return (
      <View style={styles.container}>
        {titleTextField}
        {infoTextField}
        {actionButtonView}
      </View>
    );
  }

  submitEvent() {
    console.log('New Notification submited!')

    if(this.state.title != '' || this.state.info != ''){
      const date = new Date();
      const timestamp = date.getFullYear().toString() + '-' + date.getMonth().toString() + '-' + date.getDate().toString() + ' | '
      + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();

      const newEvent = {'id': timestamp, 'type': type_key,'title': (this.state.title), 'info': (this.state.info)};
      var newData = [];
      if(this.state.data != null){
        newData = this.state.data;
        newData.push(newEvent);
        console.log('Data Extended to: ' + JSON.stringify(newData));
      } else {
        newData.push(newEvent);
        console.log('Data: ' + JSON.stringify(newData));
      }

      this.setState({ data: newData}, () => {
        console.log('this.state.data: ' + JSON.stringify(this.state.data));
        AsyncStorage.setItem("data", JSON.stringify(this.state.data))
          .then((data) => {
            console.log('Successfully stored a new Notification to AsyncStorage!');
            this.props.navigation.goBack();
          })
          .catch(error => console.log('Error saving new Notification Data to AsyncStorage: ' + error));
      });
    } else {
      if(this.state.title == ''){
        this.refs.TitleInput.focus();
      } else {
        this.refs.InfoInput.focus();
      }
    }
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.newNotificationBackground,
  },
  submitButton: {
    fontSize: 20,
    color: colors.FABIcon
  },
});
