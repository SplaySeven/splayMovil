import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack=createStackNavigator();
const ProfileStack=createStackNavigator();
const Tab=createMaterialBottomTabNavigator();
//Pantalla
import Wall from '../screens/walls/wall';
import Perfil from '../screens/Perfil/profile';
import Friend from '../screens/Friends/PorSeguir';
import Publication from '../screens/Publications/Publication';
import Notification from '../screens/Notifications/Notification';
import Following from '../screens/Friends/Siguiendo';
import Follw from '../screens/Follws/Follw';
import EditPerfilScreen from '../screens/Perfil/editProfile';

const FeedStack=({navigation})=>(
    <Stack.Navigator>
        <Stack.Screen
            name='Publicaciones'
            component={Publication}
        />
        <Stack.Screen
            name='Publicacioness'
            component={Publication}
            options={{
                title:"Publicaciones"
            }}
        />
    </Stack.Navigator>
);

const FriendStack=({navigation})=>(
    <Stack.Navigator>
        <Stack.Screen
            name="Personas que no Seguimos"
            component={Friend}
            options={{
                title:'Personas a Seguir'
            }}
        />
        <Stack.Screen
            name='Siguiendo'
            component={Following}
            options={{
                title:"Amigos"
            }}
        />
        <Stack.Screen
            name='Seguir'
            component={Follw}
        />
    </Stack.Navigator>
);

const PerfilStackScreen=({navigation})=>(
    <ProfileStack.Navigator
    screenOptions={{
        headerStyle:{
            backgroundColor:'#fff',
            shadowColor:'#fff',
            elevation:0,
        },
        headerTintColor:'#000',
    }}>
        <ProfileStack.Screen
            name="Perfil"
            component={Perfil}
            options={{
                headerLeft:()=>(
                    <Icon.Button
                    name="ios-menu"
                    size={25}
                    backgroundColor="#fff"
                    color="#000"
                    onpres={()=>{}}
                    />
                ),
                headerRight:()=>(
                    <MaterialCommunityIcons.Button
                    name="account-edit"
                    size={25}
                    backgroundColor="#fff"
                    color="#000"
                    onPress={()=>navigation.navigate('EditProfile')}
                    />
                )
            }}
        />
        <ProfileStack.Screen
        name='EditProfile'
        options={{
            title:'Edit Profile'
        }}
        component={EditPerfilScreen}
        />
        </ProfileStack.Navigator>
);

const AppMainTab=()=>{
    return(
        <Tab.Navigator
        initialRouteName="Wall"
        activeColor="#fff"
        barStyle={{backgroundColor:'#00aea2'}}
        >
        <Tab.Screen
            name="Wall"
            component={Wall}
            options={{
                tabBarLabel:'Muro',
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Personas"
            component={FriendStack}
            options={{
                title:"Mi red",
                tabBarLabel:"Mi red",
                tabBarIcon:({color})=>(
                    <Feather name="users" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Publicaciones"
            component={FeedStack}
            options={{
                tabBarLabel:"Publicacion",
                tabBarIcon:({color})=>(
                    <Feather name="plus-circle" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Notificaciones"
            component={Notification}
            options={{
                tabBarLabel:"Notificaciones",
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons name="bell-outline" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="menu"
            component={PerfilStackScreen}
            options={{
                tabBarLabel:"menu",
                tabBarIcon:({color})=>(
                    <MaterialCommunityIcons name="menu" color={color} size={26}/>
                ),
                
            
            }}
        />

        </Tab.Navigator>
    )
}

export default AppMainTab
