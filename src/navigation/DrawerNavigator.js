import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';
import AddCategoryScreen from '../screens/AddCategoryScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="AddProduct" component={AddProductScreen} />
            <Drawer.Screen name="AddCategory" component={AddCategoryScreen} />
            <Drawer.Screen name="EditProduct" component={EditProductScreen} options={{ drawerItemStyle: { display: 'none' } }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;