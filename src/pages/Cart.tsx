import React, { Component } from "react";
import { View, FlatList, AsyncStorage, Text, TouchableOpacity, Image, Alert } from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import { Header } from "../components";
import styles from "./styles";
import { logoutUserService } from "../redux/services/user";
import {
    fetchPackageData,
} from "../redux/actions/fetch";
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
    arr: string[],
    data: any,
    cartData: any[],
}

class Cart extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => ({
        headerTitle: "Cart",
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
            arr: [],
            data: [],
            cartData: [],
        };
    }

    componentDidMount() {
        const { fetchPackageData } = this.props;
        fetchPackageData();
        console.log("dataaaaaa")
        console.log(this.props.navigation.getParam("Foods"));
        this.getStorage();

    }

    storeData = async (item: any) => {
        try {
            var count: number = Number(await AsyncStorage.getItem('count')) + 1
            var price: number = Number(await AsyncStorage.getItem('price')) + item.price
            await AsyncStorage.setItem(`${count}`, JSON.stringify(item));
            await AsyncStorage.setItem("count", String(count));
            await AsyncStorage.setItem("price", String(price));
            this.setState({
                count: count
            })
        } catch (error) {
            // Error saving data
        }
    };

    getStorage = async () => {
        try {
            var count: number = Number(await AsyncStorage.getItem('count'))
            var price: number = Number(await AsyncStorage.getItem('price'))
            var arr: string[] = this.renderCartData(count);
            var data = await AsyncStorage.multiGet(arr);
            var cartData: any[] = []
            console.log(data.length + " fsffafsaasfafsafafasf")
            for (var i = 0; i < data.length; i++) {
                cartData.push(JSON.parse(data[i][1]));
            }
            this.setState({
                count: count,
                price: price,
                data: data,
                cartData: cartData,
                arr: arr,
            })
            console.log(data);
            console.log("data üstte")
            console.log(cartData);

        } catch (error) {
        }
    };

    addCart(item: any) {
        this.storeData(item)
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getAllKeys();
            const price = await AsyncStorage.getItem("price");
            if (value !== null) {
                console.log(value);
                console.log("price" + price);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    renderCartData(count: number) {
        var arr: string[] = [];
        for (var i = 1; i <= count; i++) {
            arr.push(String(i))
        }
        this.setState({
            arr: arr,
        })
        return arr;
    }

    clearCart() {
        this.setState({
            count: 0,
            price: 0,
            cartData: [],
            arr: [],
            data: [],
        })
        AsyncStorage.removeItem("count");
        AsyncStorage.removeItem("price");
        AsyncStorage.multiRemove(this.state.arr);
        Alert.alert(
            //title
            '',
            //body
            'Payment successfull!',
            [
                { text: 'Ok' },
            ],
            { cancelable: true }
        );
        this.props.navigation.navigate("Home");
    }

    handleAlert = () => {
        const { navigation } = this.props;
        Alert.alert(
            //title
            'Payment',
            //body
            'Total Amount: ' + this.state.price + ' TL',
            [
                { text: 'Cancel' },
                {
                    text: 'Pay', onPress: () => this.clearCart()
                },
            ],
            { cancelable: true }
        );
    };

    render() {

        const { navigation, data } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.cartData}
                    keyExtractor={item => item.foodId.toString()}
                    renderItem={({ item }: itemProp) => (
                        <View style={styles.rowContainer} >
                            <View style={styles.columnContainer1}>
                                <Image source={require("src/pages/images/menulogo.png")} style={{ width: 70, height: 70 }} />
                            </View>
                            <View style={styles.columnContainer2}>
                                <TouchableOpacity style={styles.deleteCartButton}
                                    onPress={() => this.addCart(item)}>
                                    <Icon name="md-close" size={30} style={{ color: colors.headTextColor }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.foodName}</Text>
                                <Text>{"Menu Content: " + item.contents}</Text>
                                <Text>{"Calorie: " + item.calorie + " Kcal"}</Text>
                                <Text>{"Price: " + item.price + " TL"}</Text>

                            </View>

                        </View>
                    )}
                />
                <View style={{ backgroundColor: "#FFE0004D", flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", padding: 20, flex: 2 }}>
                        {"Toplam Fiyat: " + this.state.price + " TL"}
                    </Text>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.headTextColor, margin: 10 }}
                        onPress={() => this.handleAlert()}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", top: 10, color: "#FFFFFFCC" }}>PAY</Text>
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
)(Cart);
