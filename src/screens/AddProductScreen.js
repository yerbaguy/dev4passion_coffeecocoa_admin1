import React, { useState, useEffect, use } from 'react';
import {
    View,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { firestore, storage } from '../firebase/config';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const AddProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const [productDesc, setProductDesc] = useState('');
     const [farm, setFarm] = useState('');
     const [farmer, setFarmer] = useState('');
     const [roaster, setRoaster] = useState('');
    // const [dealer, setDealer] = useState('');
    // const [brand, setBrand] = useState('');
    // const [origin, setOrigin] = useState('');
    // const [typeOfCoffee, setTypeOfCoffee] = useState('');
    // const [variety, setVariety] = useState('');
    // const [processingMethods, setProcessingMethod] = useState('');
    // const [altitude, setAltitude] = useState('');
    // const [soilType, setSoilType] = useState('');
    // const [harvestDate, setHarvestDate] = useState('');
    // const [roastingDate, setRoastingDate] = useState('');
    // const [roastingType, setRoastingType] = useState('');
    // const [prparationType, setPreparationType] = useState('');
    // const [punctationSCCA, setPunctationSCAA] = useState('');
    // const [tsteOfCoffee, setTasteOfCoffee] = useState('');
    // const [powerOfCaffeine, setPowerOfCaffeine] = useState('');
    // const [acidity, setAcidity] = useState('');
    // const [bitterness, setBitterness] = useState('');
    // const [quilibrio, setEquilibrio] = useState('');
    // const [aroma, setAroma] = useState('');
    // const [tasteImprssions, setTasteImpressions] = useState('');
    // const [brewingMethods, setBrewingMethods] = useState('');
    // const [brewingRecipe, setBrewingRecipe] = useState('');
    // const [additionalInformation, setAdditionalInformation] = useState('')
    // const [nutritionalValue, setNutritionalValue] = useState('');
    // const [freshnessGuarantee, setFreshnessGuarantee] = useState('');
    // const [expiritionDate, setExpiriationData] = useState('');
    // const [numberOfSeries, setNumberOfSeries] = useState('');
    // const [productCode, setProductCode] = useState('');
    // const [informationOnTheMethodAndCostOfDelivery, setInformationOnTheMethodAndCostOfDelivery] = useState('');
    // const [informationOnGroupPurchaces, setInformationOnGroupPurchases] = useState('');
    // const [individualPrice1000gWithTax, setIndividualPrice1000gWithTax] = useState('');
    // const [groupPriceOf1000gWithTax, setGroupPriceOf1000gWithTax] = useState('');


    // Fetch categories from Firestore
    useEffect(() => {
        const unsubscribe = firestore()
            .collection('categories')
            .onSnapshot((snapshot) => {
                const categoryList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                }));
                setCategories(categoryList);
            }, (error) => {
                console.error('Failed to fetch categories:', error);
                Alert.alert('Error', 'Failed to load categories');
            });
        return () => unsubscribe();
    }, []);

    // Request permission for gallery access
    const requestPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your gallery to select an image.',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true; // iOS permissions are handled via Info.plist
    };

    const pickImage = async () => {
        const hasPermission = await requestPermission();
        if (!hasPermission) {
            Alert.alert('Permission Denied', 'Storage access is required.');
            return;
        }

        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
        });

        if (!result.didCancel && result.assets) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (!image) return null;
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const ref = storage().ref().child(`products/${Date.now()}`);
            await ref.put(blob);
            return await ref.getDownloadURL();
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    };

    const addProduct = async () => {
        
        if (!productDesc || !farm || !farmer || !roaster || !name || !price || !category) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        
        
        // if (!productDesc || !name || !price || !category) {
        //     Alert.alert('Error', 'Please fill all fields');
        //     return;
        // }
        try {
            const imageUrl = await uploadImage();
            await firestore().collection('products').add({
                
                productDesc,
                farm,
                farmer,
                roaster,
                
                
                
                
                
                
                // name,
                // price: parseFloat(price),
                // image: imageUrl || '',
                category, // Store the selected category name
                // name,
                // price: parseFloat(price),
                // image: imageUrl || '',
                // category, // Store the selected category name
            });
            Alert.alert('Success', 'Product added successfully');
            setProductDesc('');
            setFarm('');
            setFarmer('');
            setRoaster('');

            setName('');
            setPrice('');
            setImage(null);
            setCategory('');
        } catch (error) {
            Alert.alert('Error', 'Failed to add product');
            console.error(error);
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
        {/* <View style={styles.container}> */}

                    <TextInput
                        style={styles.input}
                        placeholder="product description"
                        value={productDesc}
                        onChangeText={setProductDesc}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="farm"
                        value={farm}
                        onChangeText={setFarm}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="farmer"
                        value={farmer}
                        onChangeText={setFarmer}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="roaster"
                        value={roaster}
                        onChangeText={setRoaster}
                    />

                    {/* <TextInput
                        style={styles.input}
                        placeholder="farm"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="farmer"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="roaster"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="dealer"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="brand"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="origin"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="type of coffee"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="variety"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="processing methods"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="altitute"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="soil type"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="harvest date"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="roasting date"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="roasting typ"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="preparation type"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="punctation scaa"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="taste of coffee"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="power of coffeine"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="acidity"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="bitterness"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="equilibrio"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="aroma"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="taste impressions"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="brewing methods"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="brewing recipe"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="additional information"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="nutritional value"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="freshness quarantee"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="expiriation date"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="number of series"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="product code"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="information of the method and cost of delivery"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="information on group purchases"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="individual price 1000g with tax"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="group price of 1000g with tax"
                        value={name}
                        onChangeText={setName}
                    /> */}

        


            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Select a category" value="" />
                {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                ))}
            </Picker>
            <Button title="Pick Image" onPress={pickImage} />
            <Button title="Add Product" onPress={addProduct} />
        {/* </View> */}
        </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    picker: { borderWidth: 1, borderRadius: 5, marginBottom: 10 },
});

export default AddProductScreen;