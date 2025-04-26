// src/screens/CartScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { firebase } from '../config/firebase';
// import { AuthContext } from '../context/AuthContext';
import { firebase } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

const CartScreen = () => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from Firestore
    useEffect(() => {
        if (user) {
            const unsubscribe = firebase
                .firestore()
                .collection('carts')
                .doc(user.uid)
                .collection('items')
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCartItems(items);
                });
            return unsubscribe;
        }
    }, [user]);

    // Add item to cart (e.g., a coffee product)
    const addToCart = async () => {
        if (!user) return;
        const newItem = {
            name: 'Coffee Blend',
            price: 12.99,
            quantity: 1,
        };
        await firebase
            .firestore()
            .collection('carts')
            .doc(user.uid)
            .collection('items')
            .add(newItem);
    };

    // Render cart item
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price} x {item.quantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Add Coffee to Cart" onPress={addToCart} />
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text>No items in cart</Text>}
            />
            <Button
                title="Logout"
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default CartScreen;



// import React, { useEffect, useState } from 'react';
// import { View, FlatList, Text, Button, StyleSheet, Alert } from 'react-native';
// import { firestore, auth } from '../firebase/config';

// const CartScreen = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const user = auth().currentUser;
//         if (!user) {
//             setCartItems([]);
//             setTotalPrice(0);
//             return;
//         }

//         const unsubscribe = firestore()
//             .collection('carts')
//             .doc(user.uid)
//             .onSnapshot(
//                 (doc) => {
//                     if (doc.exists) {
//                         const items = doc.data().items || [];
//                         setCartItems(items);
//                         // Calculate total price
//                         const total = items.reduce(
//                             (sum, item) => sum + item.price * item.quantity,
//                             0
//                         );
//                         setTotalPrice(total);
//                     } else {
//                         setCartItems([]);
//                         setTotalPrice(0);
//                     }
//                 },
//                 (error) => {
//                     console.error('Error fetching cart:', error);
//                     Alert.alert('Error', 'Failed to fetch cart');
//                 }
//             );

//         return () => unsubscribe && unsubscribe();
//     }, []);

//     const removeFromCart = async (item) => {
//         try {
//             const user = auth().currentUser;
//             if (!user) return;

//             const cartRef = firestore().collection('carts').doc(user.uid);
//             await cartRef.update({
//                 items: firestore.FieldValue.arrayRemove(item),
//             });
//             Alert.alert('Success', `${item.productDesc} removed from cart`);
//         } catch (error) {
//             console.error('Error removing from cart:', error);
//             Alert.alert('Error', 'Failed to remove from cart');
//         }
//     };

//     const updateQuantity = async (item, newQuantity) => {
//         if (newQuantity < 1) {
//             removeFromCart(item);
//             return;
//         }

//         try {
//             const user = auth().currentUser;
//             if (!user) return;

//             const cartRef = firestore().collection('carts').doc(user.uid);
//             await cartRef.update({
//                 items: firestore.FieldValue.arrayRemove(item),
//             });
//             await cartRef.update({
//                 items: firestore.FieldValue.arrayUnion({
//                     ...item,
//                     quantity: newQuantity,
//                 }),
//             });
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//             Alert.alert('Error', 'Failed to update quantity');
//         }
//     };

//     const renderCartItem = ({ item }) => (
//         <View style={styles.cartItem}>
//             <Text style={styles.itemName}>{item.productDesc}</Text>
//             <Text style={styles.itemDetails}>Farm: {item.farm}</Text>
//             <Text style={styles.itemDetails}>Price: ${item.price}</Text>
//             <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
//             <View style={styles.quantityControls}>
//                 <Button
//                     title="-"
//                     onPress={() => updateQuantity(item, item.quantity - 1)}
//                 />
//                 <Button
//                     title="+"
//                     onPress={() => updateQuantity(item, item.quantity + 1)}
//                 />
//             </View>
//             <Button
//                 title="Remove"
//                 color="red"
//                 onPress={() => removeFromCart(item)}
//             />
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Your Cart</Text>
//             {cartItems.length === 0 ? (
//                 <Text style={styles.emptyText}>Your cart is empty</Text>
//             ) : (
//                 <>
//                     <FlatList
//                         data={cartItems}
//                         renderItem={renderCartItem}
//                         keyExtractor={(item) => item.productId}
//                     />
//                     <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 10 },
//     title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//     cartItem: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         marginBottom: 10,
//     },
//     itemName: { fontSize: 16, fontWeight: 'bold' },
//     itemDetails: { fontSize: 14, color: 'gray' },
//     quantityControls: { flexDirection: 'row', marginVertical: 5 },
//     total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginTop: 10 },
//     emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
// });

// export default CartScreen;