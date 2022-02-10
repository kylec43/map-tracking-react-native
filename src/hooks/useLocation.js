import { useState, useEffect } from 'react';
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    //If shouldTrack or callback changes, the useEffect function will be run again after the first time
    useEffect(() => {

        let subscriber = null;
        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();
                if (!granted) {
                    throw new Error('Location permission not granted');
                }
    
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000, //Update every one second
                    distanceInterval: 10, //Update every ten meters
                },
                callback
                );

            } catch (e) {
              setErr(e);
            }
        };

        if (shouldTrack){
            startWatching();
        } else {
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }

        //useEffect will run this function on the next call
        return () => {
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        };

    }, [shouldTrack, callback]);

    return [err];
}