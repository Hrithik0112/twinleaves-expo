import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  title?: string;
}

const Header = ({ title = 'Twinleaves' }: HeaderProps) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MaterialCommunityIcons name="leaf" size={18} color="#fff" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#34C759',
  },
  container: {
    height: 60,
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  }
})

export default Header