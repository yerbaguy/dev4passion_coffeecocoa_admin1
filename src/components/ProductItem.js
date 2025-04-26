import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore, auth } from '../firebase/config';

const ProductItem = ({ product, onDelete }) => {
    const navigation = useNavigation();

    const addToCart = async () => {
        try {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert('Error', 'Please log in to add items to cart');
                return;
            }

            const cartRef = firestore().collection('carts').doc(user.uid);
            const cartDoc = await cartRef.get();

            if (!cartDoc.exists) {
                // Create new cart with the product
                await cartRef.set({
                    items: [
                        {
                            productId: product.id,
                            quantity: 1,
                            productDesc: product.productDesc,
                            price: product.price || 0, // Ensure price field exists in Firestore
                            farm: product.farm,
                            // Add other relevant fields
                        },
                    ],
                });
            } else {
                // Update existing cart
                const cartData = cartDoc.data();
                const existingItem = cartData.items.find(
                    (item) => item.productId === product.id
                );

                if (existingItem) {
                    // Increment quantity
                    await cartRef.update({
                        items: firestore.FieldValue.arrayRemove(existingItem),
                    });
                    await cartRef.update({
                        items: firestore.FieldValue.arrayUnion({
                            ...existingItem,
                            quantity: existingItem.quantity + 1,
                        }),
                    });
                } else {
                    // Add new item
                    await cartRef.update({
                        items: firestore.FieldValue.arrayUnion({
                            productId: product.id,
                            quantity: 1,
                            productDesc: product.productDesc,
                            price: product.price || 0,
                            farm: product.farm,
                            // Add other relevant fields
                        }),
                    });
                }
            }
            Alert.alert('Success', `${product.productDesc} added to cart`);
        } catch (error) {
            console.error('Error adding to cart:', error);
            Alert.alert('Error', 'Failed to add to cart');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{product.productDesc}</Text>
                <Text style={styles.name}>{product.farm}</Text>
                <Text style={styles.price}>${product.price || 'N/A'}</Text>
                <Button
                    title="Edit"
                    onPress={() => navigation.navigate('EditProduct', { product })}
                />
                <Button title="Delete" color="red" onPress={() => onDelete(product.id)} />
                <Button title="Add to Cart" color="green" onPress={addToCart} />
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


// import React from 'react';
// import { View, Text, Image, Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ProductItem = ({ product, onDelete }) => {
//     const navigation = useNavigation();

//     const EditProduct = ({product}) => {

//     }

//     return (
//         <View style={styles.container}>
//             <Image source={{ uri: product.image }} style={styles.image} />
//             <View style={styles.details}>
//                 {/* <Text style={styles.name}>{product.name}</Text> */}
//                 <Text style={styles.name}>{product.productDesc}</Text>
//                 <Text style={styles.name}>{product.farm}</Text>
//                 <Text style={styles.price}>${product.farmer}</Text>
//                 <Text style={styles.price}>${product.roaster}</Text>

//                 <Text style={styles.name}>{product.dealer}</Text>
//                 <Text style={styles.price}>${product.brand}</Text>
//                 <Text style={styles.price}>${product.origin}</Text>


//                 <Button
//                     title="Edit"
//                     onPress={() => navigation.navigate('EditProduct', { product })}
//                 />
//                 <Button title="Delete" color="red" onPress={() => onDelete(product.id)} />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1 },
//     image: { width: 100, height: 100, marginRight: 10 },
//     details: { flex: 1, justifyContent: 'center' },
//     name: { fontSize: 16, fontWeight: 'bold' },
//     price: { fontSize: 14, color: 'gray', marginVertical: 5 },
// });

// export default ProductItem;