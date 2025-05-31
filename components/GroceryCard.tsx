import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Product } from '@/types/product'; // adjust path as needed

export function GroceryCard({ product }: { product: Product }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.discount}>-{product.discountPercentage}%</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text
            style={[
              styles.availability,
              product.availabilityStatus.toLowerCase().includes('in stock')
                ? styles.inStock
                : styles.outOfStock,
            ]}
          >
            {product.availabilityStatus}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => console.log('Add to cart:', product.title)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  discount: {
    fontSize: 13,
    color: '#e53935',
    fontWeight: '500',
  },
  rating: {
    fontSize: 13,
    color: '#fbc02d',
  },
  availability: {
    fontSize: 13,
    fontWeight: '600',
  },
  inStock: {
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
   addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
