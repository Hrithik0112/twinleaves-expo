import { View, TouchableOpacity, StatusBar, Platform, Animated } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { resetAndNavigateTo } from '@/utils/Navigation';

const LoginScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      resetAndNavigateTo('/(tabs)');
    }, 2000);
  };

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#fff',
      padding: 20 
    }}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <MaterialCommunityIcons name="leaf" size={80} color="#34C759" />
      </Animated.View>
      
      <Animated.Text style={{
        fontSize: 24,
        color: '#34C759',
        fontWeight: 'bold',
        marginTop: 20,
        opacity: fadeAnim
      }}>
        Welcome to Twinleaves
      </Animated.Text>

      <Animated.Text style={{
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 10,
        opacity: fadeAnim
      }}>
        Your daily essentials, delivered to your doorstep
      </Animated.Text>

      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#34C759',
          padding: 15,
          borderRadius: 8,
          marginTop: 40,
          width: '100%',
          justifyContent: 'center'
        }}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        <MaterialCommunityIcons name="google" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Animated.Text style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
          opacity: fadeAnim
        }}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Animated.Text>
      </TouchableOpacity>

      <Animated.Text style={{
        fontSize: 12,
        color: '#999',
        marginTop: 20,
        opacity: fadeAnim
      }}>
        By continuing, you agree to our Terms & Conditions
      </Animated.Text>
    </View>
  );
};

export default LoginScreen;