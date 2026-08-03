import React, {useRef, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import {Color} from '../utiles/color';
import {StyleComponent} from '../utiles/styles';

interface CodeInputProps {
  onCodePress: (code: string) => void;
  isCodeValid?: boolean;
  length?: number;
}

const CodeInput: React.FC<CodeInputProps> = ({
  onCodePress,
  isCodeValid,
  length = 5,
}) => {
  const {Styles} = StyleComponent();
  const [code, setCode] = useState<string[]>(() => Array(length).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const hiddenInputRef = useRef<TextInput>(null);
  const lastEmittedRef = useRef('');

  const codeValue = code.join('');

  const applyCode = (raw: string) => {
    const cleaned = raw.replace(/\D/g, '').slice(0, length);
    const next = Array.from({length}, (_, i) => cleaned[i] ?? '');
    setCode(next);

    if (cleaned.length === length && cleaned !== lastEmittedRef.current) {
      lastEmittedRef.current = cleaned;
      onCodePress(cleaned);
    }

    if (cleaned.length < length) {
      lastEmittedRef.current = '';
    }
  };

  const focusHiddenInput = () => {
    hiddenInputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.boxesRow} onPress={focusHiddenInput}>
        {code.map((digit, index) => {
          const active = isFocused && index === Math.min(codeValue.length, length - 1);
          return (
            <View
              key={index}
              style={[
                styles.box,
                {
                  borderColor:
                    isCodeValid === false
                      ? Color.red
                      : active
                        ? Color.primary
                        : Color.lightGray,
                  borderWidth:
                    active || isCodeValid === false ? 2 : 1,
                },
              ]}>
              <Text style={[Styles.title_Medium, styles.digit]}>{digit}</Text>
            </View>
          );
        })}
      </Pressable>

      {/* Single hidden input — receives paste/autofill for the full code */}
      <TextInput
        ref={hiddenInputRef}
        value={codeValue}
        onChangeText={applyCode}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        importantForAutofill="yes"
        autoFocus
        caretHidden
        maxLength={length}
        contextMenuHidden={false}
        selectTextOnFocus={false}
        {...(Platform.OS === 'ios'
          ? {clearButtonMode: 'never' as const}
          : {})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 24,
    marginTop: '10%',
    position: 'relative',
  },
  boxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  box: {
    width: 64,
    height: 72,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  digit: {
    fontSize: 20,
    color: Color.primary,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.02,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
});

export default CodeInput;
