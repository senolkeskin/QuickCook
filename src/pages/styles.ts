import { StyleSheet } from "react-native";
import { colors } from "../constants";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
    justifyContent: "flex-start",
  },
  headStyle: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  headText: {
    fontSize: 35,
    fontWeight: "700",
    color: "#FF7000",

  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center"
  },
  linkText: {
    color: colors.primary,
    fontWeight: "700"
  },
  input: {
    backgroundColor: "white",
    margin: 5,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 40,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop:10,
  },
  buttonText: {
    textAlign: "center",
    color: colors.containerBg,
    fontWeight: "900",
    fontSize:20,
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  homeButtonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:33,
    paddingLeft: 18,
    paddingRight: 16,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 7,
    marginBottom: 5,
    flexWrap:"wrap",
  },
  homeButtonText:{
    color:"white",
    fontSize:25,
    fontWeight:"bold"
  },
  rowContainer:{
    flexDirection:"row",
    padding:10,
    backgroundColor:"#FFFFFFB3",
    margin:10,
    borderRadius:10,
  },
  columnContainer1:{
    flexDirection:"column",
    padding:5,
    margin:5,
    alignItems:"flex-start",
    flex:1,
  },
  columnContainer2:{
    flexDirection:"column",
    padding:5,
    margin:5,
    alignItems:"flex-start",
    flex:3.5,
  },
  addCartButton:{
    left:220,
    top:5,
  },
  deleteCartButton:{
    left:220,
  },
  cartButton1:{
    right:10,
    bottom:50,
  },
  cartButtonTextStyle1:{
    left:22,
    bottom:50,
    fontSize:16,
    fontWeight:"bold",
    color:"white"

  },
  cartButton2:{
    left:335,
    top:15,
  },
  cartButtonTextStyle2:{
    left:22,
    bottom:50,
    fontSize:16,
    fontWeight:"bold",
    color:"white"

  },
  errorText: {
    marginLeft: 50,
    marginBottom: 10,
    textAlign: "justify",
    color: "#EA0808",
    fontSize: 12,
  },
});

export default styles;
