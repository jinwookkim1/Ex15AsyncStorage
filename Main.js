import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

// ### AsyncStorage : Android의 SharedPreferences와 비슷한 역할 ###
// react native version >= 0.59 ###################################### 이전버전에서는 React Native에 포함되어 있었음.
// # Install
// $ npm install --save @react-native-community/async-storage

// # Link [ 0.6 버전부터는 자동 link라서 필요없음 ]
// $ react-native link @react-native-community/async-storage
// ####################################################################

import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component{

    //TextInput에 작성된 데이터를 저장하는 state 멤버변수
    constructor(){
        super();

        this.state={
            inputText:"",

            //load한 데이터를 보여줄 Text컴포넌트의 글씨변수
            text:"",
        }
    }

    render(){
        return (
            <View style={ styles.root }>
                {/* 저장할 데이터를 입력할 컴포넌트 */}
                <TextInput 
                    style={ styles.textInput } 
                    onChangeText={ this.changeText } 
                    placeholder="Enter Some Text here"
                    // 글씨 입력 후 다음 데이터 작성을 편하게 하기 위한 value값을 state.inputText변수로 설정..[savaData()메소드 마지막코드 참고]
                    value={this.state.inputText}>
                </TextInput>
                {/* AsyncStorage 저장버튼 */}
                <Button title="save data" onPress={ this.saveData }></Button>

                {/* 중간 간격 벌리는 목적의 컴포넌트 */}
                <View style={ {marginTop:16,} }></View>

                {/* AsyncStorage 로딩버튼 */}
                <Button title="load data" color="orange" onPress= { this.loadData }></Button>
                <Text style={ {marginTop:16, padding:8, fontWeight:'bold'} }> { this.state.text } </Text>


                {/* 별외 : async / await 문법 사용한 버튼 [ES7 의 새로운 문법]*/}
                <Button title="store data" color="indigo" onPress={ this.storeData }></Button>
                <Button title="read data" color="green" onPress={ this.getData }></Button>

            </View>
        );
    }

    //TextInput에 작성할 때 마다 글씨를 변수에 저장하는 메소드
    changeText=( value )=>{
        this.setState({ inputText:value});
    }

    //save data to local storage method.
    saveData= ()=>{
        
        //state.inputText변수에 저장되어 있던 글씨를 AsyncStorage에 저장 [ 'Data'라는 식별자 키 사용 ]
        AsyncStorage.setItem('Data', this.state.inputText);
        alert('saved data');

        //다음 데이터를 작성하기 편하게 TextInput의 글씨를 ""로 변경하기!
        // TextInput을 제어하는 것이 아니라. TextInput의 property인 [value]를 변경
        this.setState({inputText:""});
    }

    //load data from local storage method
    loadData= ()=>{
        //AsyncStorage에 저장된 데이터를 읽어오기 [ 식별자 'Data'키 ]
        // getItem()메소드는 비동기식 방식이어서 promiss문법 .then()사용
        AsyncStorage.getItem('Data').then( ( value )=>{ this.setState( {text: value} ); } );
    }

    // ##### ES7 의 새로운 문법 : async / await [ 비동기식 처리를 동기식으로 기다리도록 ] ######################
    // 메소드 앞에 async 키워드를 작성하여.. 이 메소드를 비동기 방식으로 처리하도록 명시...
    storeData = async () => {
        
        await AsyncStorage.setItem('msg', 'Hello React Nativve');
        // await이 명시된 메소드의 호출 작업을 끝났을 때 다음 줄의 코드가 실행되도록....마치 동기식처럼...
        
        alert('saved data');// 이 alert()메소드는 위 await 키워드가 명시된 setItem()의 작업이 끝났을 때 실행됨.
        this.setState({inputText:""});
    }

    getData = async () => {
        
        const value = await AsyncStorage.getItem('msg');// 이 리턴값 value는 await 키워드가 명시된 getItem()의 작업이 끝났을 때 리턴됨.
        if(value !== null) this.setState({text:value});
        
    }
    // ############################################################################################

}

//스타일객체
const styles= StyleSheet.create({
    root:{
        flex:1,
        padding:16,
    },
    textInput:{
        paddingLeft:16,
        paddingRight:16,
        borderWidth:1,
        borderRadius:8,
        borderColor:'black',
        marginBottom:16,
    },

});