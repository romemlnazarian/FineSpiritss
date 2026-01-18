import React, { useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Color } from '../utiles/color';
import { StyleComponent } from '../utiles/styles';
interface CodeInputProps {
  onCodePress: (code: string) => void;
  isCodeValid?: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ onCodePress, isCodeValid }) => {
  const {Styles} = StyleComponent()
  const [code, setCode] = useState(['', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);
    if (text && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
    if (newCode.every((digit) => digit !== '')) {
      onCodePress(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code];
      if (!code[index] && index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      } else {
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    const input = inputsRef.current[index];
    setTimeout(() => {
      input?.setNativeProps({ selection: { start: 1, end: 1 } });
    }, 0);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  return (
    <View style={styles.container}>
       {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(input) => {
            inputsRef.current[index] = input;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          style={[
            Styles.title_Medium,
            styles.input,
            {
              borderColor: isCodeValid === false ? Color.red : (focusedIndex === index ? Color.primary : Color.lightGray),
              borderWidth: focusedIndex === index ? 2 : isCodeValid === false ? 2: 1,
            }
          ]}
          selectionColor={Color.lightGray}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="next"
          autoFocus={index === 0}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf:'center',
    marginBottom: 24,
    width:'90%',
  },
  input: {
    width: 64,
    height: 72,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 16,
    color:Color.primary,
    marginTop:'10%'
  },
  inputFocused: {
    borderWidth: 2,
  },
});

export default CodeInput;
