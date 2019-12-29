import React, { Component } from "react";
import { View, FlatList, AsyncStorage, Text, TouchableOpacity, Image, ImageBackground, Alert } from "react-native";
import { NavigationScreenProp, NavigationState, SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../components";
import styles from "./styles";
import { logoutUserService } from "../redux/services/user";
import { fetchPackageData } from "../redux/actions/fetch";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/colors";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchPackageData: () => void;
  data: any;
  loading: boolean;
}

interface itemProp {
  item: any;
}

interface State {
  count: number,
  price: number,
}

class Home extends Component<Props, State> {
  static navigationOptions = ({ navigation }: Props) => ({
    headerTitle: 'Quick Cook',
    headerRight: <TouchableOpacity style={{ marginRight: 20 }} onPress={navigation.getParam('handleLogout')}>
      <Icon name="ios-power" size={40} style={{ color: colors.headTextColor }} />
    </TouchableOpacity>,
    headerStyle: {
      backgroundColor: colors.containerBg,
    },
    headerTintColor: colors.headTextColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });


  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      price: 0,
    };
  }

  componentDidMount() {
    const { fetchPackageData } = this.props;
    fetchPackageData();
    console.log("dataaaaaa")
    console.log(this.props.data);
    this.props.navigation.setParams({ handleLogout: this.handleLogout });
    this.getStorage();
  }

  handleLogout = () => {
    const { navigation } = this.props;
    Alert.alert(
      //title
      'Sign Out',
      //body
      'Do you want to sign out?',
      [
        { text: 'Cancel' },
        {
          text: 'Confirm', onPress: () => logoutUserService().then(() => {
            navigation.navigate("AuthStack");
          })
        },
      ],
      { cancelable: true }
    );
  };

  getStorage = async () => {
    try {
      var count: number = Number(await AsyncStorage.getItem('count'))
      var price: number = Number(await AsyncStorage.getItem('price'))
      this.setState({
        count: count,
        price: price,
      })
    } catch (error) {
    }
  };

  render() {

    const { navigation, data } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <FlatList

            data={data.packages}
            keyExtractor={item => item.packageId}
            renderItem={({ item }: itemProp) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Menus", { packageName: item.packageName, Foods: item.Foods })}>
                <ImageBackground source={{ uri: `${item.image}` }} style={styles.homeButtonContainer}>
                  <View style={{ backgroundColor: "#9E9D9DA6" }}><Text style={styles.homeButtonText}>{item.packageName}</Text></View>
                </ImageBackground >
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.cartButton1}
            onPress={() => this.props.navigation.navigate("Cart")}>
            <Icon name="md-cart" size={60} style={{ color: colors.headTextColor }} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  data: state.data,
  loading: state.loading
});

function bindToAction(dispatch: any) {
  return {
    fetchPackageData: () =>
      dispatch(fetchPackageData()),
  };
}

export default connect(
  mapStateToProps,
  bindToAction
)(Home);
