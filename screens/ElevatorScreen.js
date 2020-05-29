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
      data: null,
      loaded: true,
      error: null
    };
  }
  baseURL = "https://rocketele.herokuapp.com";

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
    this.props.navigation.navigate("home");
    return true;
  }

  getData = ev => {
    this.setState({ loaded: false, error: null });
    let url = this.baseURL + "/api/elevators";
    let h = new Headers();

    let req = new Request(url, {
      headers: h,
      method: "GET"
    });

    fetch(req)
      .then(response => response.json())
      .then(this.showData)
      .catch(this.badStuff);
  };
  showData = data => {
    this.setState({ loaded: true, data });
  };
  badStuff = err => {
    this.setState({ loaded: true, error: err.message });
  };
  componentDidMount() {
    this.getData();
    //geolocation -> fetch
  }
  render() {
    return (
      <View>
        <View style={{ alignSelf: "center", width: 275, marginTop: 40 }}>
          <Button
            title="Log Out
            "
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
        <ScrollView>
          <View style={{ alignItems: "center", paddingBottom: 50 }}>
            <Image
              source={require("../assets/images/R2.png")}
              style={styles.rocketimages}
            />
          </View>

          {!this.state.loaded && <Text />}
          <Text style={styles.txt}>Elevator Not Active!</Text>
          {this.state.error && (
            <Text style={styles.err}>{this.state.error}</Text>
          )}
          {this.state.data &&
            this.state.data.length > 0 &&
            this.state.data.map((elevator, key) => (
              <TouchableOpacity
                style={styles.elevatorbuttton}
                key={key}
                onPress={() =>
                  this.props.navigation.navigate("ElevatorEdit", { elevator })
                }
              >
                <Text value={this.state.id}>
                  elevator id :{elevator.id} Status : {elevator.status}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  elevatorbuttton: {
    flex: 1,
    margin: 20,
    backgroundColor: "#ecf0f1",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    paddingTop: 20,
    paddingBottom: 20
  },
  rocketimages: {
    height: 90,
    width: 250,
    top: 50,
    alignItems: "center"
  },
  txt: {
    textAlign: "center",
    fontSize: 24,
    color: "#333"
  },
  err: {
    alignItems: "center",

    color: "red",
    fontSize: 30,
    fontWeight: "bold"
  }
});
