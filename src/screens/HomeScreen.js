import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { firestore } from '../firebase/config';
import ProductItem from '../components/ProductItem';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('products')
            .onSnapshot((snapshot) => {
                const productList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            });
        return () => unsubscribe();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await firestore().collection('products').doc(id).delete();
            Alert.alert('Success', 'Product deleted successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to delete product');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductItem product={item} onDelete={deleteProduct} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
});

export default HomeScreen;