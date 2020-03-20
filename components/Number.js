import * as React from 'react';
import { View, TouchableOpacity, Button } from 'react-native';

export default function Number(props) {
  function onPress() {
    if (props.onPress)
      props.onPress(props.id);
  }
  return (
    <TouchableOpacity>
      <Button title={props.text} disabled={props.disabled ? props.disabled : false} onPress={onPress} />
    </TouchableOpacity>
  )
}