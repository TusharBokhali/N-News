// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { router, Stack, useLocalSearchParams } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import { NewsDataType } from '@/types';
// import Loading from '@/components/Loading';
// import { Colors } from '@/constants/Colors';
// import Moment from 'moment';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Feather from '@expo/vector-icons/Feather';
// type Props = {

// }
// export default function NewsDetails(props: Props) {
//     const { id } = useLocalSearchParams<{ id: string }>();
//     const [Getnews, setAddNews] = useState<NewsDataType[]>([]);
//     const [isLoading, setLoading] = useState(true);
//     const [bookmark,setBookmark] = useState(false)


//     useEffect(() => {
//         getNEws();
//     },[])

//     useEffect(()=>{
//         if(!isLoading){
//             renderBook(Getnews[0].article_id);
//         }
//     },[isLoading])

//     const saveBook = async(newsId:string) => {
//         setBookmark(true)
//         await AsyncStorage.getItem("bookmark").then((token) => {
//             const res = JSON.parse(token);
//             if(res !==null){
//                 let data = res.find((value:string) => value === newsId);
//                 if(data ==null){
//                     res.push(newsId)
//                     AsyncStorage.setItem("bookmark",JSON.stringify(res))
//                     alert("News Saved!");
//                 }
//             } else{
//                 let bookmark = [];
//                 bookmark.push(newsId);
//                 AsyncStorage.setItem("bookmark",JSON.stringify(bookmark));
//                 alert("News Saved!");

//             }
//         })
//     }

//     const removeBookmark = async(newsId:string)=>{
//         setBookmark(false);

//          const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
//             const res = JSON.parse(token);
//             return res.filter((id:string)=> id !==newsId)
//         });
//         await  AsyncStorage.setItem("bookmark",JSON.stringify(bookmark));
//         alert("News unsaved!")
//     }

//     const renderBook = async (newsId:string) => {
//         await AsyncStorage.getItem("bookmark").then((token) => {
//             const res = JSON.parse(token);
//             if(res!=null){
//                 let data = res.find((value:string) => value === newsId);
//                 return data ==null ? setBookmark(false) : setBookmark(true)
//             }
//         })
//     }

  
//     const getNEws = async () => {
//         try {
//             // const URL = `https://newsdata.io/api/1/news?apikey=pub_58190849134dea2a1059428616e31663bbb8d&id=${id}`
//             // const URL = `https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&id=${id}`
//             const URL = `https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&id=${id}`
//             const res = await axios.get(URL)


//             if (res && res.data) {
//                 setAddNews(res.data.results)
//                 setLoading(false)
//             }
//         } catch (e: any) {
//             console.log(e);
//         }
//     }
//     return (
//         <>
//             <Stack.Screen options={{
//                 headerLeft: () => (
//                     <TouchableOpacity onPress={() => router.back()}>
//                         <Ionicons name='arrow-back' size={22} />
//                     </TouchableOpacity>
//                 ),
//                 headerRight: () => (
//                     <View style={{flexDirection:'row',gap:10,}}>
//                     <TouchableOpacity onPress={() => bookmark ? removeBookmark(Getnews[0].article_id) : saveBook(Getnews[0].article_id)}>
//                     <Feather name="download" size={24} color="black" />
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => bookmark ? removeBookmark(Getnews[0].article_id) : saveBook(Getnews[0].article_id)}>
//                         <Ionicons name={bookmark ? 'heart' : 'heart-outline'} size={22} color={bookmark ? "red" : Colors.black}/>
//                     </TouchableOpacity>
//                     </View>
                    
//                 ),
//                 title: ''
//             }} />
//             {isLoading ? (
//                 <Loading size={'large'} />
//             ) : (
//                 <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
//                     <View>
//                         <Text style={{fontSize:16,fontWeight:'600',color:Colors.black,marginVertical:10,letterSpacing:0.6}}>{Getnews[0].title}</Text>
//                         <View style={styles.newsInfoAbout}>
//                             <Text style={styles.NewsAboutes}>{Moment(Getnews[0].pubDate).format('MMMM DD, hh:mm a')}</Text>
//                             <Text style={styles.NewsAboutes}>{Getnews[0].source_name}</Text>
//                         </View>
//                         <Image source={{uri:Getnews[0].image_url}} style={styles.NewsImages}/>
//                         {Getnews[0].content ? (
//                             <Text style={{fontSize:14,color:'#555',letterSpacing:0.8,lineHeight:22,}}>{Getnews[0].description}</Text>
//                         ):(
//                             <Text style={{fontSize:14,color:'#555',letterSpacing:0.8,lineHeight:22,}}>{Getnews[0].description}</Text>
//                         )}
//                     </View>
//                 </ScrollView>
//             )}
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor:Colors.white,
//     },
//     contentContainer:{
//         marginHorizontal:20,
//         paddingBottom:30,
//     },
//     NewsImages:{
//         width: '100%',
//         height:300,
//         marginBottom:20,
//         borderRadius:10,
//     },
//     newsInfoAbout:{
//         flexDirection:'row',
//         justifyContent:'space-between',
//         marginBottom:20,
//     },
//     NewsAboutes:{
//         fontSize:12,
//         color:Colors.darkGrey,
//     }
// })
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


type Props = {};

export default function NewsDetails(props: Props) {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [Getnews, setAddNews] = useState<NewsDataType[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            renderBook(Getnews[0].article_id);
        }
    }, [isLoading]);

    const saveBook = async (newsId: string) => {
        setBookmark(true);
        await AsyncStorage.getItem("bookmark").then((token) => {
            const res = JSON.parse(token);
            if (res !== null) {
                let data = res.find((value: string) => value === newsId);
                if (data == null) {
                    res.push(newsId);
                    AsyncStorage.setItem("bookmark", JSON.stringify(res));
                    alert("News Saved!");
                }
            } else {
                let bookmark = [];
                bookmark.push(newsId);
                AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
                alert("News Saved!");
            }
        });
    };

    const removeBookmark = async (newsId: string) => {
        setBookmark(false);

        const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
            const res = JSON.parse(token);
            return res.filter((id: string) => id !== newsId);
        });
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("News unsaved!");
    };

    const renderBook = async (newsId: string) => {
        await AsyncStorage.getItem("bookmark").then((token) => {
            const res = JSON.parse(token);
            if (res != null) {
                let data = res.find((value: string) => value === newsId);
                return data == null ? setBookmark(false) : setBookmark(true);
            }
        });
    };

    const getNews = async () => {
        try {
            const URL = `https://newsdata.io/api/1/news?apikey=pub_587283ebc33a278489b0ac3fbc09c7d385cc4&id=${id}`;
            const res = await axios.get(URL);

            if (res && res.data) {
                setAddNews(res.data.results);
                setLoading(false);
            }
        } catch (e: any) {
            console.log(e);
        }
    };
    const downloadPDF = async () => {
        try {
            const htmlContent = `
                <html>
                    <head>
                        <title>${Getnews[0].pubDate}</title>
                    </head>
                    <body>
                    <img src="${Getnews[0].image_url}" width="50%" style="display: block; margin-left: auto; margin-right: auto;" />
                        <h1>${Getnews[0].title}</h1>
                        <p>${Getnews[0].description}</p>
                        <p>${Getnews[0].content}</p>
                        
                    </body>
                </html>
            `;
    
            
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
            if (!uri) {
                Alert.alert("Error", "PDF generation failed.");
                return;
            }
    
            
            const fileName = `News_${Date.now()}.pdf`;
    
            if (Platform.OS === 'android') {
                
                const dirUri = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    
                if (dirUri.granted) {
                    
                    const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
                        dirUri.directoryUri,
                        fileName,
                        'application/pdf'
                    );
    
                
                    const pdfContent = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
    
                    await FileSystem.writeAsStringAsync(fileUri, pdfContent, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
    
                    Alert.alert("Success", "PDF saved successfully!");
                } else {
                    Alert.alert("Permission Denied", "Unable to save PDF to external storage.");
                }
            } else if (Platform.OS === 'ios') {
                // Save locally for iOS
                const pdfUri = `${FileSystem.documentDirectory}${fileName}`;
                await FileSystem.moveAsync({ from: uri, to: pdfUri });
    
                // Share the file
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(pdfUri);
                } else {
                    Alert.alert("Saved Locally", `PDF saved to local storage: ${pdfUri}`);
                }
            }
        } catch (error) {
            console.error("Error saving PDF:", error);
            Alert.alert("Error", "An error occurred while saving the PDF.");
        }
    };
    

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 20 }}>
                            <TouchableOpacity onPress={()=>{downloadPDF()}}>
                                <Feather name="download" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    bookmark
                                        ? removeBookmark(Getnews[0].article_id)
                                        : saveBook(Getnews[0].article_id)
                                }
                            >
                                <Ionicons
                                    name={bookmark ? 'heart' : 'heart-outline'}
                                    size={22}
                                    color={bookmark ? 'red' : Colors.black}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                    title: '',
                }}
            />
            {isLoading ? (
                <Loading size="large" />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <View>
                        <Text style={styles.title}>{Getnews[0].title}</Text>
                        <View style={styles.newsInfoAbout}>
                            <Text style={styles.NewsAboutes}>
                                {Moment(Getnews[0].pubDate).format('MMMM DD, hh:mm a')}
                            </Text>
                            <Text style={styles.NewsAboutes}>{Getnews[0].source_name}</Text>
                        </View>
                        <Image source={{ uri: Getnews[0].image_url }} style={styles.NewsImages} />
                        <Text style={styles.content}>
                            {Getnews[0].content || Getnews[0].description}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    contentContainer: {
        marginHorizontal: 20,
        paddingBottom: 30,
    },
    NewsImages: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    newsInfoAbout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    NewsAboutes: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
        letterSpacing: 0.6,
    },
    content: {
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22,
    },
});
