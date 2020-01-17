import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const location = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = location.coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });

                loadDevs();
            }
        }
        loadInitialPosition();
    }, []);

    async function loadDevs() {
        try {
            const { latitude, longitude } = currentRegion;
            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs
                }
            });
            setDevs(response.data);
            console.log(response.data.length);
        } catch (error) {
            console.log(error);
        }
    }

    if (!currentRegion) {
        return null;
    }

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    }

    return (
        <>
            <MapView
                initialRegion={currentRegion}
                style={style.map}
                onRegionChangeComplete={handleRegionChanged}
            >
                {devs.map(dev =>
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}>
                        <Image style={style.avatar} source={{ uri: dev.avatarUrl }} />
                        <Callout onPress={() => { navigation.navigate('Profile', { githubUsername: dev.githubUsername }) }}>
                            <View style={style.callout}>
                                <Text style={style.devName}>{dev.name}</Text>
                                <Text style={style.devBio}>{dev.bio}</Text>
                                <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )}
            </MapView>
            <View style={style.searchForm}>
                <TextInput
                    style={style.searchInput}
                    placeholder="Search devs by techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} style={style.loadButton}>
                    <MaterialIcons size={20} color="#FFF" name="my-location" />
                </TouchableOpacity>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            heigh: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default Main;