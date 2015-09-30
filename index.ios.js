/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var SearchPage = require('./SearchPage');
var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Dimensions = require('Dimensions');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   NavigatorIOS,
// } = React;

// var styles = StyleSheet.create({
//   text: {
//     color: 'black',
//     backgroundColor: 'lightblue',
//     fontSize: 30,
//     margin: 80
//   },
//   container: {
//     flex: 1
//   }
// });

// class HelloWorld extends React.Component {
//   render() {
//     return <Text style={styles.text}>Hello there 123</Text>;
//   }
// }

// class PropertyFinderApp extends React.Component {
//   render() {
//     return (
//     <NavigatorIOS 
//       style={styles.container} 
//       initialRoute = {{
//         title: 'Property Finder',
//         component: SearchPage,
//       }} />
//     );
//   }
// }


var Menu = require('./Menu');
var window = Dimensions.get('window');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Component
} = React;

var styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  button2: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class Button extends Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}>
        <Text style={this.props.style}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

Button.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

class Basic extends Component {
  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      touchToClose: false,
    };
  }

  handleOpenWithTouchToClose() {
    this.setState({
      touchToClose: true,
    });
  }

  handleChange(isOpen) {
    if (!isOpen) {
      this.setState({
        touchToClose: false,
      });
    }
  }

  render() {
    return (
      <SideMenu
        menu={<Menu />} openMenuOffset={window.width-50}
        touchToClose={this.state.touchToClose}
        onChange={this.handleChange.bind(this)}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
        </View>
        <Button style={styles.button}>
          Toggle menu
        </Button>
        <Button style={styles.button2}
          onPress={this.handleOpenWithTouchToClose.bind(this)}>
          Open menu (Overlay Closes)
        </Button>
      </SideMenu>
    );
  }
}
AppRegistry.registerComponent('PropertyFinder', () => Basic);
