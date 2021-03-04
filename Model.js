import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text,SafeAreaView,TouchableOpacity, View,SplashScreen,FlatList,FlatGrid } from 'react-native';
export default class MyModal extends Component {    

    render() {
      return (
          <View>
              <Modal
              animationType="slide"
             transparent={false}
              visible={this.props.modalVisible}
              onRequestClose={() => { this.props.onDismiss() }}
              >
                  <View style={styles.container}>
                      <View style={styles.innerContainer}>
                          <Text>Item Detail</Text>
                          <TouchableHighlight
                              style={styles.buttonContainer}
                              onPress={() => { this.props.onDismiss() }}>
                              <Text style={styles.buttonText}>Close</Text> 
                          </TouchableHighlight>
                      </View>
                  </View>
              </Modal>
          </View>
      );
    }
  }