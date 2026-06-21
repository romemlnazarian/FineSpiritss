import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogCategoryLogic from '../../logic/Catalog/CatalogCategoryLogic';
import {Color} from '../../utiles/color';
import ArrowRight from 'react-native-vector-icons/MaterialIcons';
import { resolveMediaUrl } from '../../utiles/mediaUrl';
export default function CatalogCategory(route: any) {
  const {Styles} = StyleComponent();
  const {isLoading, catalogDetail, name, onSubmitBack, onSubmit} = CatalogCategoryLogic(route);
  return (
    <View style={[Styles.container]}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Color.primary}
          style={{marginTop: '50%'}}
        />
      ) : (
        <>
        <CustomHeader showBack={true} title={name} onSubmitBack={onSubmitBack}/>
        <ScrollView>
          <TouchableOpacity
            onPress={() => onSubmit(catalogDetail?.parent)}
            style={[
              Styles.justifyBetween,
              {padding: 10, alignItems: 'center', gap: 10,width:'95%',alignSelf:'center'},
            ]}>
            <View style={[Styles.displayRow, {gap: 20}]}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: Color.Gray_100,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                {catalogDetail?.parent?.cat_image && (
                  <Image
                    source={{uri: resolveMediaUrl(catalogDetail.parent.cat_image)}}
                    style={{width: 60, height: 60,borderRadius:10}}
                    resizeMethod='resize'
                  />
                )}
              </View>
              <Text style={[Styles.title_Regular, {color: Color.black}]}>
                {catalogDetail?.parent?.cat_name}
              </Text>
            </View>
            <ArrowRight
              name="arrow-forward-ios"
              size={20}
              color={Color.black}
            />
          </TouchableOpacity>
          {catalogDetail?.children?.map((item: any,index:number) => (
            <TouchableOpacity
              onPress={() => onSubmit(item)}
              key={index}
              style={[
                Styles.justifyBetween,
                {padding: 10, alignItems: 'center', gap: 10,width:'95%',alignSelf:'center'},
              ]}>
              <View style={[Styles.displayRow, {gap: 20}]}>
                <View
                  style={{
                    width: 70,
                    height: 70,
                    backgroundColor: Color.Gray_100,
                    borderRadius: 10,
                  }}>
                  {item?.cat_image && (
                    <Image
                      source={{uri: resolveMediaUrl(item.cat_image)}}
                        style={{width: 70, height: 70}}
                    />
                  )}
                </View>
                <Text style={[Styles.title_Regular, {width: '60%', color: Color.black}]}>
                  {item?.cat_name}
                </Text>
              </View>
              <ArrowRight
                name="arrow-forward-ios"
                size={20}
                color={Color.black}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        </>
      )}
    </View>
  );
}
