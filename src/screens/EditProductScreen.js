import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { firestore } from '../firebase/config'; // Adjust path as needed

const EditProductScreen = ({ route, navigation }) => {
    const { product } = route.params;

    // Initialize state for each field
    const [productDesc, setProductDesc] = useState(product.productDesc || '');
    const [farm, setFarm] = useState(product.farm || '');
    const [farmer, setFarmer] = useState(product.farmer || '');
    const [roaster, setRoaster] = useState(product.roaster || '');
    const [dealer, setDealer] = useState(product.dealer || '');
    const [brand, setBrand] = useState(product.brand || '');
    const [origin, setOrigin] = useState(product.origin || '');
    const [image, setImage] = useState(product.image || '');

    const handleSave = async () => {
        try {
            // Update Firestore document
            await firestore().collection('products').doc(product.id).update({
                productDesc,
                farm,
                farmer,
                roaster,
                dealer,
                brand,
                origin,
                image,
            });
            Alert.alert('Success', 'Product updated successfully');
            navigation.goBack(); // Return to HomeScreen
        } catch (error) {
            console.error('Error updating product:', error);
            Alert.alert('Error', 'Failed to update product');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                value={productDesc}
                onChangeText={setProductDesc}
                placeholder="Product Description"
            />
            <TextInput
                style={styles.input}
                value={farm}
                onChangeText={setFarm}
                placeholder="Farm"
            />
            <TextInput
                style={styles.input}
                value={farmer}
                onChangeText={setFarmer}
                placeholder="Farmer"
            />
            <TextInput
                style={styles.input}
                value={roaster}
                onChangeText={setRoaster}
                placeholder="Roaster"
            />
            <TextInput
                style={styles.input}
                value={dealer}
                onChangeText={setDealer}
                placeholder="Dealer"
            />
            <TextInput
                style={styles.input}
                value={brand}
                onChangeText={setBrand}
                placeholder="Brand"
            />
            <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
                placeholder="Origin"
            />
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage}
                placeholder="Image URL"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => navigation.goBack()} color="gray" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default EditProductScreen;




// import React, { useState } from 'react';
// import {
//     View,
//     TextInput,
//     Button,
//     Alert,
//     StyleSheet,
//     Platform,
//     PermissionsAndroid,
// } from 'react-native';
// import { firestore, storage } from '../firebase/config';
// import { launchImageLibrary } from 'react-native-image-picker';

// const EditProductScreen = ({ route, navigation }) => {
//     const { product } = route.params;
//     const [name, setName] = useState(product.name);
//     const [price, setPrice] = useState(product.price.toString());
//     const [image, setImage] = useState(product.image);

//     // Request permission for gallery access
//     const requestPermission = async () => {
//         if (Platform.OS === 'android') {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//                 {
//                     title: 'Storage Permission',
//                     message: 'App needs access to your gallery to select an image.',
//                     buttonPositive: 'OK',
//                 }
//             );
//             return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
//         return true; // iOS permissions are handled via Info.plist
//     };

//     const pickImage = async () => {
//         const hasPermission = await requestPermission();
//         if (!hasPermission) {
//             Alert.alert('Permission Denied', 'Storage access is required.');
//             return;
//         }

//         const result = await launchImageLibrary({
//             mediaType: 'photo',
//             quality: 1,
//             includeBase64: false,
//         });

//         if (!result.didCancel && result.assets) {
//             setImage(result.assets[0].uri);
//         }
//     };

//     const uploadImage = async () => {
//         if (!image || image === product.image) return image;
//         try {
//             const response = await fetch(image);
//             const blob = await response.blob();
//             const ref = storage().ref().child(`products/${Date.now()}`);
//             await ref.put(blob);
//             return await ref.getDownloadURL();
//         } catch (error) {
//             console.error('Image upload failed:', error);
//             throw error;
//         }
//     };

//     const updateProduct = async () => {
//         if (!name || !price) {
//             Alert.alert('Error', 'Please fill all fields');
//             return;
//         }
//         try {
//             const imageUrl = await uploadImage();
//             await firestore().collection('products').doc(product.id).update({
//                 name,
//                 price: parseFloat(price),
//                 image: imageUrl,
//             });
//             Alert.alert('Success', 'Product updated successfully');
//             navigation.goBack();
//         } catch (error) {
//             Alert.alert('Error', 'Failed to update product');
//             console.error(error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Product Name"
//                 value={name}
//                 onChangeText={setName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Price"
//                 value={price}
//                 onChangeText={setPrice}
//                 keyboardType="numeric"
//             />
//             <Button title="Pick Image" onPress={pickImage} />
//             <Button title="Update Product" onPress={updateProduct} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20 },
//     input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
// });

// export default EditProductScreen;