import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AuthContext, IAuthContextProps } from '../../contexts/AuthContext';

const DropdownComponent = ({
  data,
  label,
  callback,
}: {
  data: any;
  label: string;
  callback: Function;
}) => {
  const { getProjectId, setGetProjectId } = useContext(
    AuthContext
  ) as IAuthContextProps;
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (getProjectId || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {'Select ' + label.toString()}
        </Text>
      );
    }
    return null;
  };
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="title"
        valueField="id"
        placeholder={!isFocus ? 'Select ' + label : '...'}
        searchPlaceholder="Search..."
        value={data}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        onChange={(item: { id: any }) => {
          setGetProjectId(item.id);
          console.log('item.id', item.id);
          setIsFocus(false);
          callback(item);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
