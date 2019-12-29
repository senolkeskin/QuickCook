import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginUserService } from "../redux/services/user";
import styles from "./styles";
import { Input } from "react-native-elements"
import { fetchPackageData } from "../redux/actions/fetch";
import { connect } from "react-redux";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  fetchPackageData: () => void;
  data: any;
  loading: boolean;
}

interface userData {
  username: string;
  password: string;
}

interface State {
  errorMessage: string;
}

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/, "*Please enter only valid letters and numbers")
    .min(4, "*Username must be 4 characters or more")
    .max(16, "*Username must be 16 characters or less")
    .required("*Required Field"),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9_-]+$/, "*Please enter only valid letters and numbers")
    .min(6, "*Password must be 6 characters or more")
    .max(16, "*Password must be 16 characters or less")
    .required("*Required Field")
});

class Login extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  handleLogin = (values: userData) => {
    const { navigation, data } = this.props;

    data.users.forEach((item: any) => {
      if (item.username === values.username && item.password === values.password && (values.username.length > 0 && values.password.length > 0)) {
        loginUserService(values.username, values.password).then(res => {
          navigation.navigate("MainStack");
        });
      }
      if (item.username != values.username && item.password != values.password && (values.username.length > 0 && values.password.length > 0)) {
        this.setState({
          errorMessage: "Kullanıcı Adınız veya Şifreniz Yanlış"
        })
      }
    })

  };

  componentDidMount() {
    const { fetchPackageData } = this.props;
    fetchPackageData();
    console.log("userrssssssss")
    console.log(this.props.data.users.length)
    console.log(this.props.data.users)
    this.props.data.users.forEach((item: any) => {
      console.log(item.username)
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >

          <ScrollView bounces={false}>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={values => this.handleLogin(values)}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit, resetForm }) => {
                return (
                  <View>
                    <View style={styles.headStyle}>
                      <Image
                        style={{ width: 200, height: 130, borderRadius: 10 }}
                        source={{ uri: "https://scontent.fbtz1-3.fna.fbcdn.net/v/t1.0-9/80950969_3017237114994251_2273988619758731264_n.jpg?_nc_cat=109&_nc_ohc=J0h32MUPxTUAQkYClhosgiwhnbSzLWlvpl1ONM5JsBDDcoZcQ1SAh8Yyw&_nc_ht=scontent.fbtz1-3.fna&oh=cfc7bf66079b4524c460fb2601591b10&oe=5E72677C" }} />
                      <Text style={styles.headText}>Quick Cook </Text>
                    </View>
                    <View style={styles.inputContainer} >
                      <View style={styles.input}>
                        <Input
                          placeholder="Username"
                          value={values.username}
                          onChangeText={handleChange("username")}
                          onBlur={handleBlur("username")}
                          keyboardType="email-address"
                        />
                      </View>
                      <Text style={styles.errorText}>{errors.username}</Text>
                      <View style={styles.input}>
                        <Input
                          placeholder="Password"
                          value={values.password}
                          onChangeText={handleChange("password")}
                          onBlur={handleBlur("password")}
                          secureTextEntry
                        />
                      </View>
                      <Text style={styles.errorText}>{errors.password}</Text>
                      <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}
                          onPress={() => { handleSubmit() }}
                        >Login</Text>
                      </TouchableOpacity>
                      <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
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
)(Login);
