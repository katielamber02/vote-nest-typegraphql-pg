import ApolloClient from "apollo-boost";
import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { StyleSheet, Text, View } from "react-native";

const client = new ApolloClient({
    uri: "http://localhost:3013/graphql"
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Text>MY TEXT</Text>
            </View>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});