const palette = {
  // ------ Colors Declaration ------ //
  // Default colors
  white: '#FFFFFF',
  black: '#000000',
  blueGrey: '#343D46',
  redGrey: '#444444',
  pinkRed: '#FA3256',
  transperentBlack: '#000000AA',
  transperentWhite: '#FFFFFFCC',

  // Post-It colors
  postItPink: '#FFC5FE',
  postItDarkPink: '#D79DD6',
  postItYellow: '#FFFFA5',
  postItRed: '#FF7678',
  postItDarkRed: '#D74E50',
  postItBeige: '#FFA476',
  postItDarkBeige: '#D77C44',
  postItDarkYellow: '#FFC037',
  postItBlue: '#65DBE5',
  postItGreen: '#ADDC7B',
  postItTurquoise: '#2BEFB7',

  // One Plus colors
  onePlusRed: '#E52E24',
};

export const colors = {
  // ------ Screens/Components colors ------ //
  // Main screen
  mainWallBg: palette.white,
  headerBg: palette.blueGrey,
  headerTitleColor: palette.white,
  headerText: palette.redGrey,
  errorText: palette.pinkRed,
  mainScreenFAB: palette.onePlusRed,
  newEventFAB: palette.postItDarkRed,
  newNotificationFAB: palette.postItDarkPink,
  newTaskFAB: palette.postItDarkBeige,
    // Cards
    cardDivider: palette.onePlusRed,
    cardBackground: palette.white,
    eventCardBg: palette.postItRed,
    notificationCardBg: palette.postItPink,
    taskCardBg: palette.postItBeige,
    eventTitle: palette.white,
    notificationTitle: palette.white,
    taskTitle: palette.white,
    eventInfo: palette.transperentBlack,
    notificationInfo: palette.transperentBlack,
    taskInfo: palette.transperentBlack,
    timestampEvent: palette.postItDarkRed,
    timestampNotification: palette.postItDarkPink,
    timestampTask: palette.postItDarkBeige,

  // Details screen
  detailsScreenFAB: palette.onePlusRed,
  editTitleFAB: palette.postItGreen,
  editInfoFAB: palette.postItBlue,
  addPictureFAB: palette.postItDarkYellow,
  detailedEventTitle: palette.white,
  detailedEventInfo: palette.white,
  detailedNotificationTitle: palette.black,
  detailedNotificationInfo: palette.black,
  detailedTaskTitle: palette.white,
  detailedTaskInfo: palette.white,

  // New Event screen
  newEventBackground: palette.postItRed,
  newEventTitleInputTint: palette.white,
  newEventTitleInputBase: palette.transperentWhite,
  newEventTitleInputText: palette.white,
  newEventInfoInputTint: palette.white,
  newEventInfoInputBase: palette.transperentWhite,
  newEventInfoInputText: palette.white,

  // New Notification screen
  newNotificationBackground: palette.postItPink,
  newNotificationTitleInputTint: palette.black,
  newNotificationTitleInputBase: palette.transperentBlack,
  newNotificationTitleInputText: palette.black,
  newNotificationInfoInputTint: palette.black,
  newNotificationInfoInputBase: palette.transperentBlack,
  newNotificationInfoInputText: palette.black,

  // New Task screen
  newTaskBackground: palette.postItBeige,
  newTaskTitleInputTint: palette.white,
  newTaskTitleInputBase: palette.transperentWhite,
  newTaskTitleInputText: palette.white,
  newTaskInfoInputTint: palette.white,
  newTaskInfoInputBase: palette.transperentWhite,
  newTaskInfoInputText: palette.white,

  // Buttons
  FABIcon: palette.white,
  buttonText: palette.white,
  swipeIcon: palette.white,
  addOnePlusEventButton: palette.white,
  checkmarkGreenBg: '#66BB6A',
  trashRedBg: '#F44336',
  firstRightSwipeButton: palette.postItTurquoise,
  secondRightSwipeButton: palette.postItYellow,

  // Inputfields
  inputBackground: palette.white,
  inputDivider: '#E4E2E5',
};
