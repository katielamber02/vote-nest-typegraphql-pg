import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    NavigationDrawerScreenOptions,
    NavigationScreenComponent
} from "react-navigation";

const SignupScreen: NavigationScreenComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Signup Screen</Text>
        </View>
    );
};
SignupScreen.navigationOptions = (): NavigationDrawerScreenOptions => ({
    title: "Signup"
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 16,
        margin: 10
    }
});

export default SignupScreen;