import { clearCart, removeFromCart, updateQuantity } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { formatPriceFromUSD } from '@/utils/currency';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);

  const { items, total } = useSelector((state: RootState) => state.cart);
  const isCartEmpty = items.length === 0;

  const handleUpdateQuantity = (id: number, change: number) => {
    dispatch(updateQuantity({ id, quantity: change }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handlePayment = () => {
    setIsLoading(true);

    // Mock payment processing
    setTimeout(() => {
      setIsLoading(false);
      dispatch(clearCart());
      setShowSuccessScreen(true);
    }, 1500);
  };

  const handleContinueShopping = () => {
    setShowSuccessScreen(false);
    router.push('/');
  };

  // Show success screen
  if (showSuccessScreen) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          </View>
          <Text style={styles.successTitle}>Payment Successful!</Text>
          <Text style={styles.successSubtitle}>Your order has been confirmed</Text>
          <TouchableOpacity
            style={styles.successButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.successButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Shopping Cart</Text>
        
        {items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{formatPriceFromUSD(item.price)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, -1)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>{formatPriceFromUSD(total)}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.payButton, isLoading && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isLoading}
        >
          <Text style={styles.payButtonText}>
            {isLoading ? 'Processing...' : 'Pay Now'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
  },
  quantity: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  removeButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ff5252',
    marginLeft: 16,
  },
  removeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  payButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Success screen styles
  successContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  successIcon: {
    marginBottom: 24,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 50,
    padding: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  successButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Cart;