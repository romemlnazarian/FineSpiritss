import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StyleComponent } from '../../utiles/styles'
import { Color } from '../../utiles/color'
import Icon from 'react-native-vector-icons/AntDesign'
export default function ShowBySetting({onCallback, selectedIds}: {onCallback: (title:string,id:number)=>void, selectedIds?: number}) {

const data: {id: number, title: string}[] = [
    {id:1,title:'New'},
    {id:2,title:'Old'},
    {id:3,title:'Lower Price'},
    {id:4,title:'Higher Price'},
]
const onHandler = (id:number, title:string)=>{
    onCallback(title,id)
}

const {Styles} = StyleComponent();

   return (
    <View style={styles.container}>
      <Text style={[Styles.h5_Medium,Styles.textAlign,styles.marginVertical]}>Show by</Text>
      {data.map((item)=>(
        <TouchableOpacity activeOpacity={0.5} key={item.id} onPress={()=>onHandler(item.id, item.title)} style={styles.row}>
          <Text style={[Styles.body_Regular]}>{item.title}</Text>
          <View style={[styles.circleButton, selectedIds === item.id && styles.circleButtonActive]}>
            {selectedIds === item.id && (<Icon name="check" size={18} color={Color.white} />)}
          </View>
        </TouchableOpacity>
      ))}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '93%',
    alignSelf: 'center',
  },
  marginVertical: {
    marginTop: '5%',
  },
  row: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.lineGray,
  },
  circleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.lineGray,
  },
  circleButtonActive: {
    backgroundColor: Color.primary,
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});