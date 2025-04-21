import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ product, onDelete }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Button
                    title="Edit"
                    onPress={() => navigation.navigate('EditProduct', { product })}
                />
                <Button title="Delete" color="red" onPress={() => onDelete(product.id)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
    image: { width: 100, height: 100, marginRight: 10 },
    details: { flex: 1, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: 'gray', marginVertical: 5 },
});

export default ProductItem;