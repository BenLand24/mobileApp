import React, { Component } from "react";
import {
  Image,
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet
} from "react-native";

export default class App extends Component {
  state = {
    email: ""
  };

  onLogin = async () => {
    // const { navigate } = this.props.navigation;
    const email = this.state.email;
    const { navigation } = this.props;

    const response = await fetch(
      "https://warm-earth-83579.herokuapp.com/api/employees",
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      }
    );
    if (response.status === 200) {
      navigation.navigate("Elevator");
    }
    // return response.json();
    else {
      return Alert.alert("the email you entered is not a valid employee email");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 80, top: -110 }}
          source={require("../assets/images/R2.png")}
        />

        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={"email"}
          style={styles.input}
        />
        <View style={styles.logincolor}>
          <Button title={"Login"} onPress={this.onLogin.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  logincolor: {
    color: "red"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    color: "#0B64A0",
    marginBottom: 10
  }
});
