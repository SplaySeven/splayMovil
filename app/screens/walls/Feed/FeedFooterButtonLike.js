import React ,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery,useMutation} from '@apollo/client';
import {ADD_LIKE,IS_LIKE,DELETE_LIKE} from '../../../recursos/gql/like'
const FeedFooterButtonLike = (props) => {
    const {feed}=props
    const [addLike]=useMutation(ADD_LIKE);
    const [deleteLike]=useMutation(DELETE_LIKE);
    const [loadingAction, setLoadingAction] = useState(false)

    const {data,loading,stopPolling,startPolling}=useQuery(IS_LIKE,{
        variables:{idPublication:feed.item.id}
    });

    useEffect(() => {
        startPolling(1000);
        return ()=>{
            stopPolling;
        }
    }, [startPolling,stopPolling]);
    if(loading) return null;
    const {isLike}=data;


    const onDelete =async()=>{
        setLoadingAction(true)
       try {
           await deleteLike({
               variables:{
                   idPublication:feed.item.id
               }
           });
           
       } catch (error) {
           console.log(error)
       }
       setLoadingAction(false)
    }

    const onAddLike=async()=>{
        setLoadingAction(true);
        try {
            await addLike({
                variables:{
                    idPublication:feed.item.id
                }
            });
           
        } catch (error) {
            console.log(error)
        }
     setLoadingAction(false);
    }

    return (
        <>

         <TouchableOpacity style={styles.Button} 
          onPress={isLike? onDelete:onAddLike}
         >
            <View style={styles.Icon}>
                <AntDesign
                name={isLike ? 'like1':'like2'}
                size={20}
                color={isLike ? '#0000ff': '#424040'} 
                />
            </View>
            
    <Text style={styles.Text} isLike={isLike}> Me gusta </Text>
        </TouchableOpacity>   
        </>
    )
}

export default FeedFooterButtonLike;


const styles=StyleSheet.create({
    Button:{
        flexDirection:'row',
    },
    Icon:{
        marginRight:6,
    },
    Text:{
        fontSize:12,
        color: '#0000ff',
    },
})