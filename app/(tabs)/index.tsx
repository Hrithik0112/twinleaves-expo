import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { GroceryCard } from '@/components/GroceryCard';
import Colors from '@/constants/Colors';
import { Product } from '@/types/product';

export default function HomeScreen() {
  const [groceries, setGroceries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/category/groceries');
      const data = await response.json();
      console.log('Fetched groceries:', data?.products);
      if (!data?.products || !Array.isArray(data?.products)) {
        throw new Error('Invalid data format');
      }
      setGroceries(data?.products);
      console.log("executed");
      setError(null);
    } catch (err) {
      console.error('Failed to fetch groceries', err);
      setError('Failed to fetch groceries');
    } finally {
      setLoading(false);
    }
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
});
