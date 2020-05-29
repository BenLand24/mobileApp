import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import { BackHandler } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      sizelogout: { height: 0, width: 0 },
      stylelog: "",
      buttonleave: "",
      buttonColor: "red",
      title: "change status to Active",
      data: null,
      loaded: true,
      error: null
    };
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate("Elevator");

    return true;
  }
  PUTData = ev => {
    this.onButtonPress();
    var elevatorid = this.props.navigation.state.params.elevator.id;
    var status = this.props.navigation.state.params.elevator.status;

    fetch(
      "https://rocketele.herokuapp.com/api/elevators/" + elevatorid,

      {
        credentials: "include",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: elevatorid,
          status: "Active"
        })
      }
    );
  };

  onButtonPress = () => {
    this.setState({
      sizelogout: { height: 20, width: 275, marginTop: 20, marginBottom: 20 },
      buttonleave: "Elevator list",
      buttonColor: "#008000",
      title: "Status is now Active"
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/R2.png")}
          style={styles.rocketimages}
        />
        <Text style={{ fontSize: 24, fontWeight: "bold", top: 80 }}>
          Elevator id :{this.props.navigation.state.params.elevator.id}
        </Text>
        <View style={{ width: 275, marginTop: 90 }}>
          <Button
            style={styles.ElevatorButtton}
            title={this.state.title}
            onPress={() => this.PUTData()}
            color={this.state.buttonColor}
            onValueChange={value => this.setState({ isHidden: value })}
            value={this.state.isHidden}
          />
        </View>
        <View style={this.state.sizelogout}>
          <Button
            title={this.state.buttonleave}
            onPress={() => this.props.navigation.navigate("Elevator")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff"
    // justifyContent: "center"
  },

  ElevatorButtton: {
    marginTop: 150
  },
  rocketimages: {
    height: 90,
    width: 250,
    top: 50
  },

  err: {
    alignItems: "center",
    color: "red",
    fontSize: 30,
    fontWeight: "bold"
  }
});
