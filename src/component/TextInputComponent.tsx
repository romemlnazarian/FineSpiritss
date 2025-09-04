import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Eye from '../assets/svg/Eye.svg';
import EyeClose from '../assets/svg/EyeClose.svg';
import {Color} from '../utiles/color';

export interface Props {
  defaultval?: string;
  keyboard?: any;
  line?: number;
  maxlength?: number;
  submitText?: any;
  edit?: boolean;
  value?: string;
  showPass?: any;
  rightIcon?: any;
  leftIcon?: any;
  containerStyle?: object;
  placeholder?: string;
  placeholderColor?: string;
  multiline?: boolean;
  isPassword?: boolean;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
  onClick?: () => void | undefined;
  handlePasswordIconClick?: () => void;
  onFocus?: () => void;
  onBlur?: (e: any) => void | undefined;
  SubmitEditing?: (val: any) => void | undefined;
  EndEditing?: (val: any) => void;
  KeyPress?: (val: any) => void;
}

const TextInputComponent = (props: Props) => {
  const {black} = Color;
  const [activeBorder, setActiveBorder] = useState<boolean | undefined>(false);
  const textInputRef = useRef<TextInput>(null);
  const [text] = useState('');

  const floatingLabelAnimation = useRef(
    new Animated.Value(text ? 1 : 0),
  ).current;

  useEffect(() => {
    if (props.defaultval) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [props.defaultval, floatingLabelAnimation]);

  const handleBlur = (e: any) => {
    props.onBlur?.(e);
    if (!props.value) {
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
    setActiveBorder(false);
  };

  const handleFocus = () => {
    Animated.timing(floatingLabelAnimation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
    setActiveBorder(true);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => textInputRef.current?.focus()}>
        <View
          style={[
            styles.container,
            props.containerStyle,
            {
              borderColor: props.errorMessage
                ? 'red'
                : activeBorder
                ? Color.primary
                : Color.gray,
              borderWidth: props.errorMessage ? 1.5 : activeBorder ? 1.5 : 1,
            },
          ]}>
          {props.leftIcon && <>{props.leftIcon}</>}
          <TextInput
            style={[styles.inputContainer]}
            ref={textInputRef}
            placeholderTextColor={props.placeholderColor || 'gray'}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            defaultValue={props.defaultval}
            multiline={props.multiline}
            maxLength={props.maxlength}
            numberOfLines={props.line}
            textAlignVertical="auto"
            autoCorrect={false}
            keyboardType={props.keyboard}
            textBreakStrategy="highQuality"
            returnKeyType="done"
            editable={props.edit}
            selectTextOnFocus={false}
            value={props.value}
            underlineColorAndroid="transparent"
            selectionColor={black}
            onSubmitEditing={val => props.SubmitEditing?.(val)}
            onEndEditing={val => props.EndEditing?.(val)}
            onKeyPress={e => props.KeyPress?.(e.nativeEvent)}
            secureTextEntry={!props.showPass}
          />
          {props.rightIcon && (
            <TouchableOpacity onPress={props.handlePasswordIconClick}>
              {props.showPass?
                 <Eye/>:
                  <EyeClose/>
            }
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      {props.errorMessage && (
        <Text style={[styles.textError]}>{props.errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Color.white,
    height: 64,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '85%',
    height: 56,
    marginLeft: '2%',
    color: Color.black,
  },
  label: {
    position: 'absolute',
    fontFamily: 'DMSans-Medium',
  },
  textError: {
    color: 'red',
    marginTop: 10,
    marginLeft: '8%',
  },
});

export default React.memo(TextInputComponent);
