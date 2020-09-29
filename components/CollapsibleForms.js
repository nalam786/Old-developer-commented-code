//File not in use
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';

const CollapsibleForm = ({children}) => {
  return (
    <View style={styles.container}>
      <CollapsibleList
        numberOfVisibleItems={1}
        wrapperStyle={styles.wrapperCollapsibleList}
        buttonContent={
          <View style={styles.button}>
            <Text style={styles.buttonText}>{'Hide'}</Text>
          </View>
        }>
        {children}
      </CollapsibleList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
});

export default CollapsibleForm;
