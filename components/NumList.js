import * as React from 'react';
import { View, TouchableOpacity, Button } from 'react-native';
import Number from './Number';

export default class NumberList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numCountList: props.numCountList,
      numCount: props.numCount
    }
  }

  render() {
    return (
      <View>
        {this.state.numCountList.map((item) => {
          return (<Number key={item.index}
            id={item.index}
            text={(item.value).toString()}
            onPress={this.props.onPress.bind(this)}
            disabled={item.onList}
          />)
        })
        }
      </View>
    )
  }
}

