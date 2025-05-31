import { addToCart, updateQuantity } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { Product } from '@/types/product';
import { formatPriceFromUSD } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export function GroceryCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => 
    state.cart.items.find(item => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (change: number) => {
    dispatch(updateQuantity({ id: product.id, quantity: change }));
  };
  const handlePress = () => {
    router.push({
      pathname: `/screens/ProductScreen`,
      params: {
        product: JSON.stringify(product)
      }
    });
  };

  return (
    <TouchableOpacity style={styles.card} 
    activeOpacity={0.8}
    onPress={handlePress}
    >
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
          <Text style={styles.price}>
            {formatPriceFromUSD(product.price)}
          </Text>
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

        {cartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(-1)}
            >
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleUpdateQuantity(1)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#333',
  },
});
