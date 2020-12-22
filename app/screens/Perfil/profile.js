import React,{useContext} from 'react'
import {AutoContext} from '../../recursos/context/UsuarioContext';
import {View,Text,Button} from 'react-native';

const Perfil = () => {
    const {signOut}=useContext(AutoContext)
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Perfil</Text>
            <Button
                title="Cerrar Session"
                onPress={()=>signOut()}
            />
        </View>
    )

}
export default Perfil
