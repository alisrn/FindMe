import * as React from 'react';
import { Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import NumberList from '../components/NumList';
import Number from '../components/Number';

export default class FindMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formula: "",
      calculatedNum: "",
      numCountList: [],
      numCount: 6
    };
  }
  componentDidMount() {
    var numCountList = this.state.numCountList;
    for (let i = 0; i < this.state.numCount; i++) {
      numCountList.push({
        value: Math.round(Math.random() * 10),
        index: i,
        onList: false,
      });
    }
    this.setState({
      numCountList: numCountList
    });
  }
  handlePress(id) {
    let lastChar = this.state.formula.slice(-1);
    if (lastChar >= '0' && lastChar <= '9') {
      alert("You can't just write number. Write operands between numbers.");
      return;
    }
    var numCountList = this.state.numCountList;
    numCountList[id].onList = !numCountList[id].onList;
    let newFormula = this.state.formula + numCountList[id].value;
    console.log(newFormula);
    this.setState({
      numCountList: numCountList,
      formula: newFormula
    });
  }
  handlePressOperator(e) {
    let newFormula = this.state.formula + e;
    console.log(newFormula);
    this.setState({ formula: newFormula });
  }

  handleCalculate() {
    try {
      let a = /[^0-9()+-\\*\\/]/;
      if (a.test(this.state.formula)) {
        alert("You used a forbidden character. How did you do that?");
        this.resetFormula();
        return;
      }
      this.setState({ calculatedNum: eval(this.state.formula) });
    } catch (e) {
      if (e instanceof SyntaxError) {
        alert("I see what you did there!");
        //console.log(e);
        this.resetFormula();
      } else if (e instanceof TypeError) {
        alert("Wait and See!");
        //console.log(e);
        this.resetFormula();
      }
    }
  }

  resetFormula() {
    let numCountList = this.state.numCountList.map(x => {
      x.onList = false;
      return (x)
    });
    this.setState({
      numCountList: numCountList,
      formula: "",
      calculatedNum: ""
    });

  }
  render() {
    return (
      <View>
        <View>
          <NumberList onPress={this.handlePress.bind(this)}
            numCount={this.state.numCount}
            numCountList={this.state.numCountList} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
          <Operator onPress={this.handlePressOperator.bind(this)} text="(" />
          <Operator onPress={this.handlePressOperator.bind(this)} text=")" />
          <Operator onPress={this.handlePressOperator.bind(this)} text="+" />
          <Operator onPress={this.handlePressOperator.bind(this)} text="-" />
          <Operator onPress={this.handlePressOperator.bind(this)} text="*" />
          <Operator onPress={this.handlePressOperator.bind(this)} text="/" />
        </View>
        <View>
          <Number text="321" />
        </View>
        <View>
          <Text style={{
            alignSelf: 'center',
            fontSize: 40,
          }} >
            {this.state.formula}
          </Text>
        </View>
        <View style={{ alignSelf: "center" }} >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "lightblue",
              width: 200,
              height: 80,
              alignContent: 'center',
              justifyContent: 'center'
            }}
            onPress={this.handleCalculate.bind(this)} >
            <Text style={{ fontSize: 30, alignSelf: 'center' }} >Calculate Me!</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{
            alignSelf: 'center',
            fontSize: 40,
          }} >{this.state.calculatedNum}</Text>
        </View>
      </View >
    );
  }
}

FindMe.navigationOptions = {
  header: null,
};


function Operator(props) {
  function onPress() {
    props.onPress(props.text);
  }
  return (
    <TouchableOpacity>
      <Button title={props.text} onPress={onPress} />
    </TouchableOpacity>
  )
}