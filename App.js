import { StatusBar } from 'expo-status-bar';

import React, { Component } from 'react';

import { StyleSheet,Image, Text, View,FlatList,Modal,Button,TouchableWithoutFeedback } from 'react-native';

import { useState, useEffect } from 'react';

import CurrencyFlag from "react-country-flag";
const App = () => {

  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]); // for country descriptions
  const [data1, setData1] = useState([]); // for Rates collection
  const [details,setDetails] = useState([]);
  const [shouldShow, setShouldShow] = useState(false); 
  const [flag,setFlag] = useState([]);// show hide Model
  const [i, setI] = useState(0); // to take index of flatList

  const REST_COUNTRIES_URI = './flags/';

  const Euro = details.base;
  const date = details.date;

  const x = data; // for currency code description
  const y = data1; 
  const z = flag;// for latest currency rates
  const EurFlag = flag.EUR;
  let baseEuro = '';

  const result = Object.keys(x).map(key => (key)); // for currency code
  const result1 = Object.keys(x).map(key => (x[key])); //for country name(full name)
  const result2 = Object.keys(y).map(key => (y[key])); // for rates
  const MyFlags = Object.keys(z).map(key => (z[key]));

  console.log(MyFlags)
  for (let i = 0;i<result.length;i++)
  {
    if (result[i] == "EUR")
    {
        baseEuro = result2[i];
    }
  }
  useEffect(() => {

    fetch('http://data.fixer.io/api/symbols?access_key=a8384217b73caedf1ccdb3a01aff7fe3')
      .then((response) => response.json())
      .then((json) =>  setData(json.symbols))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

      fetch('http://data.fixer.io/api/latest?access_key=a8384217b73caedf1ccdb3a01aff7fe3')
      .then((response) => response.json())
      .then((json) => setData1(json.rates))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

      fetch('http://data.fixer.io/api/latest?access_key=a8384217b73caedf1ccdb3a01aff7fe3')
      .then((response) => response.json())
      .then((json) => setDetails(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));

      fetch('http://bdo.pqv.mybluehost.me/CurF6.json?nocache=1')
      .then((response) => response.json())
      .then((json) => setFlag(json.flags))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  , []);
  _OnPressItem = num =>
  {
  setShouldShow(!shouldShow)
  console.log(num)
  console.log(i)
  setI(num);
  }
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.CurrencyView}>
        <Text style={styles.CurrencyText}>Currency</Text>
      </View>
 
        <FlatList
        horizontal={false}
        style={{backgroundColor:'gray'}}
            data={result1}
            renderItem={
              ({item,index}) =>
              <TouchableWithoutFeedback >
              <View style={styles.item} >
              <Image style={{width:"10%",height:"100%",backgroundColor:'back'}} source={{uri:MyFlags[index]}}/>
              <Text onPress={() => _OnPressItem(index)} style={{color:'black',fontSize:17,fontWeight: 'bold'}}>  {item}</Text>
              </View>
              </TouchableWithoutFeedback>
          }
        />
        { shouldShow ? (
          shouldShow &&
          <Modal
            visible={shouldShow}
            transparent={true}
            animationType='fade'
            onRequestClose={!shouldShow}
          >
            <View style={styles.backGroundModel}>
              <View style={styles.Model}>
 
              <View style={styles.ModelItems}>
              <Image style={{width:"10%",height:"100%"}} source = {{uri:MyFlags[i]}}/>
              <Text style={{width:"15%",height:"100%",fontWeight:'bold',fontSize:18}}> {result[i]}:</Text>
              <Text style={{width:"75%",height:"100%",fontWeight:'200',fontSize:18}}>{result1[i]}</Text>
              </View>

              <View style={styles.ModelItems}>
              <Image style={{width:"10%",height:"100%"}} source = {{uri:MyFlags[i]}}/>
              <Text style={{width:"15%",height:"100%",fontWeight:'bold',fontSize:18}}> {result[i]}:</Text>
              <Text style={{width:"75%",height:"100%",fontSize:18}}>{result2[i]}</Text>
              </View>

              <View style={styles.ModelItems}>
              <Image style={{width:"10%",height:"100%"}} source = {{uri:EurFlag}}/>
              <Text style={{width:"15%",height:"100%",fontWeight:'bold',fontSize:18}}> {Euro}:</Text>
              <Text style={{width:"75%",height:"100%",fontSize:18}}>{baseEuro}</Text>
              </View>

              <View style={styles.ModelItems}>
              <Text style={{width:"15%",height:"100%",fontWeight:'bold',fontSize:18}}>Date:</Text>
              <Text style={{width:"85%",height:"100%",fontSize:18}}>{date}</Text>
              </View>

              <View>
              <Button title="Cancel" onPress={() => setShouldShow(!shouldShow)} />
              </View>

              </View>
            </View>
          </Modal>
        ): null}

    </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection:'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 1,
  },
  CurrencyView: {
    width:"100%",
    height:"11%",
    backgroundColor:'green',
    alignItems:'center',
    justifyContent:'center',
  },
  CurrencyText: {
    color:'black',
    fontSize:30,
    fontWeight:'bold',
    paddingTop:30,
  }, backGroundModel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  ModelItems: {
    margin:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
    backgroundColor:'white'
  },
  Model:{
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'lightgray',
  borderColor:'black',
  borderWidth:1,
  borderRadius:10,
  }
});
export default App;

