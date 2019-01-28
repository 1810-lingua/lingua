import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebase';

export default class Component1 extends Component {
  render() {
    return (
    <View>
      <Text>Hello World</Text>
      <Button
        onPress={() => firebase.auth().signOut()}
        title="Log Out"
      />
    </View>
    )
  }
}