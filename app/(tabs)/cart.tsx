import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Cart = () => {
  // Temporary empty state for demonstration
  const cartItems = [];
  const isCartEmpty = cartItems.length === 0;

  if (isCartEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require('../../assets/images/empty-cart.jpg')}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven't added anything to your cart yet
        </Text>
        <Link href="/" asChild>
          <Text style={styles.shopButton}>Start Shopping</Text>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {/* Cart items will go here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  shopButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
  },
});

export default Cart;