import { GroceryCard } from '@/components/GroceryCard';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  Camera, CameraView } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [groceries, setGroceries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    fetchGroceries();
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const fetchGroceries = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/category/groceries');
      const data = await response.json();
      if (!data?.products || !Array.isArray(data?.products)) {
        throw new Error('Invalid data format');
      }
      setGroceries(data?.products);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch groceries', err);
      setError('Failed to fetch groceries');
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data } : { type: string; data: string }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // Handle the scanned barcode data here
    setShowScanner(false);
    setScanned(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.light.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groceries}
        renderItem={({ item }) => item && (
          <View style={styles.itemContainer}>
            <GroceryCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      
      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => {
          setShowScanner(true);
          setScanned(false);
        }}
      >
        <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={showScanner}
        onRequestClose={() => setShowScanner(false)}
        animationType="slide"
      >
        <View style={styles.scannerContainer}>
          {hasPermission ? (
            <>
              <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
    barcodeTypes: ["qr","ean13", "ean8",  "code128", "code39"],
  }}
              />
              <View style={styles.overlay}>
                <View style={styles.scanArea} />
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowScanner(false);
                  setScanned(false);
                }}
              >
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.permissionText}>No access to camera</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    maxWidth: '50%', // Adjust this value to control the gap between columns
  
  },
  scanButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  permissionText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});
