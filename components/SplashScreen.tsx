import { View, Animated , StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Call onComplete after animation finishes
      setTimeout(onComplete, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <MaterialCommunityIcons name="leaf" size={100} color="#fff" />
      </Animated.View>
      <Animated.Text
        style={[styles.title, { opacity: fadeAnim }]}
      >
        Twinleaves
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, { opacity: fadeAnim }]}
      >
        Your daily essentials, delivered
      </Animated.Text>
      <Animated.View
        style={[styles.divider, { opacity: fadeAnim }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34C759'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  divider: {
    width: 100,
    height: 2,
    backgroundColor: '#fff',
    marginTop: 20,
  }
  
});

export default SplashScreen