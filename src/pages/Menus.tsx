import React, { Component } from "react";
import { View, FlatList, AsyncStorage, Text, TouchableOpacity, Image } from "react-native";
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
}

class Menus extends Component<Props, State> {
    static navigationOptions = ({ navigation }: Props) => ({
        headerTitle: "Menus",
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
            price:0,
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
            this.setState({
                count: count,
                price:price,
            })
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
                // We have data!!
                console.log(value);
                console.log("price"+price);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    render() {

        const { navigation, data } = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.navigation.getParam("Foods")}
                    keyExtractor={item => item.foodId}
                    renderItem={({ item }: itemProp) => (
                        <View style={styles.rowContainer} >
                            <View style={styles.columnContainer1}>
                                <Image source={require("src/pages/images/menulogo.png")} style={{ width: 70, height: 70 }} />
                            </View>
                            <View style={styles.columnContainer2}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.foodName}</Text>
                                <Text>{"Menu Content: " + item.contents}</Text>
                                <Text>{"Calorie: " + item.calorie + " Kcal"}</Text>
                                <Text>{"Price: " + item.price + " TL"}</Text>
                                <TouchableOpacity style={styles.addCartButton}
                                    onPress={() => this.addCart(item)}>
                                    <Icon name="md-add-circle" size={30} style={{ color: colors.headTextColor }} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                />
                <TouchableOpacity style={styles.cartButton2}
                    onPress={() => this.props.navigation.navigate("Cart")}>
                    <Icon name="md-cart" size={60} style={{ color: colors.headTextColor }} />
                    <Text style={styles.cartButtonTextStyle2}>{this.state.count}</Text>
                </TouchableOpacity>

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
)(Menus);
