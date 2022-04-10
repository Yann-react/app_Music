import React ,{useEffect , useRef , useState} from 'react'
import { Animated,View ,FlatList ,Text,Image, StyleSheet,SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'
import Icon from 'react-native-vector-icons/Ionicons'
import songs from '../data/DataSong'


const {width, height} = Dimensions.get('window')
const MusicPlayer = () =>{
    const scrollX = useRef(new Animated.Value(0)).current;
    const songSlider = useRef(null)
    const [ songIndex , setSongIndex] = useState(0)
   
   
    useEffect(() => {
        scrollX.addListener(({ value}) => {
            const index = Math.round( value / width)
            setSongIndex(index)
        })
    

        return() => {
            scrollX.removeAllListeners()
        }
    }, [])

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1 )*width
        })
    }

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1 )*width
        })
    }

    const Songs = ({index , item}) => {
        return (
            <Animated.View style={{
                width:width,
                justifyContent:"center",
                alignItems:'center',
            }}>
        <View style={styles.kietuWrapper}>
        <Image 
        source={item.image}
        style= {styles.kietuImage}
        />
        </View>
            </Animated.View>
        )
    }
    return (
        <SafeAreaView style={styles.container} >

        <View style={styles.maincontainer}>
          <View style={{width:width}}>
            <Animated.FlatList
            ref={songSlider}
            data={songs}
            renderItem={Songs}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{nativeEvent: {
                    contentOffset: {x : scrollX}
                }}],
                {useNativeDriver: true}
            )}
            />
            </View>
               <View>
                   <Text style={{fontSize: 18, fontWeight: '600' , textAlign:'center', color:'#EEEEEE'}}>{songs[songIndex].title}</Text>
                   <Text style={{fontSize: 14, fontWeight: '200' , textAlign:'center', color:'#EEEEEE'}}>{songs[songIndex].artist}</Text>
               </View>
               <View>
                  <Slider style={{width:350, height:40, marginTop:25,flexDirection:'row'}}
                  value={10}
                  minimumValue={0}
                  maximumValue={100}
                  thumbTintColor='#FFD369'
                  minimumTrackTintColor='#FFD369'
                  maximumTrackTintColor='#FFF'
                  onSlidingComplete={()=>{}}
                  /> 
                  <View style={{width: 340, flexDirection:'row', justifyContent:"space-between"}}>
                      <Text style={styles.progressText}>0:00</Text>
                      <Text style={styles.progressText}>3:00</Text>
                  </View>
               </View>
               <View style={{ flexDirection:'row', width:'60%', justifyContent:'space-between', marginTop:15}}>
               <TouchableOpacity onPress={skipToPrevious}>
                <Icon name='play-skip-back-outline' size={35} color='#FFD369' />
                </TouchableOpacity>
               <TouchableOpacity onPress={()=>{}}>
                <Icon name='ios-pause-circle' size={75} color='#FFD369' />
                </TouchableOpacity>
               <TouchableOpacity onPress={skipToNext}>
                <Icon name='play-skip-forward-outline' size={35} color='#FFD369' />
                </TouchableOpacity>
               </View>
           
        </View>
        <View style={{
            borderTopColor:'#393E46',
            borderTopWidth:1,
            width: width,
            alignItems:'center',
            paddingVertical:15
        }}>
            <View style={{flexDirection: 'row', justifyContent:'space-between',width:'80%'}}>
                <TouchableOpacity onPress={()=>{}}>
                <Icon name='heart-outline' size={30} color='#777777' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                <Icon name='repeat' size={30} color='#777777' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                <Icon name='share-outline' size={30} color='#777777' />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                <Icon name='ellipsis-horizontal' size={30} color='#777777' />
                </TouchableOpacity>
            </View>
            

        </View>
        </SafeAreaView>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:'#222831'
    },
    maincontainer : {
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    kietuWrapper:{
        width: 300,
        height: 340,
        marginBottom: 25,

        shadowColor: '#ccc',
        shadowOffset:{
            width: 5 ,
            height: 5
        },
        shadowOpacity:0.5,
        shadowRadius:3.84,
        elevation: 5
    },
    kietuImage:{
        width:"100%",
        height:'100%',
        borderRadius:15
    },
    progressText: {
        color:"#fff"
    }
})