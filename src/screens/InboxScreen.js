// src/screens/InboxScreen.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CleverTap from 'clevertap-react-native';

export default function InboxScreen() {
  const [messages, setMessages]     = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // load inbox on mount, and whenever CleverTap notifies us of an update
  useEffect(() => {
    const loadInbox = () => {
      CleverTap.getAllInboxMessages().then(all => {
        setMessages(all);
        setUnreadCount(all.filter(m => !m.isRead).length);
      });
    };

    // initial load
    loadInbox();

    // re‐load when the SDK signals new inbox data
    const initListener = CleverTap.addListener(
      CleverTap.CLEVERTAP_INBOX_MESSAGES_DID_UPDATE,
      loadInbox
    );

    return () => {
      CleverTap.removeListener(
        CleverTap.CLEVERTAP_INBOX_MESSAGES_DID_UPDATE,
        initListener
      );
    };
  }, []);

  const onMessagePress = msg => {
    // mark viewed in the SDK
    CleverTap.pushInboxNotificationViewedEvent(msg.messageId);

    // if you want to mark it read in your UI:
    setMessages(ms =>
      ms.map(m =>
        m.messageId === msg.messageId ? { ...m, isRead: true } : m
      )
    );

    // then show the full message detail, or navigation...
    // e.g. navigation.navigate('InboxDetail', { message: msg });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.unreadCard]}
      onPress={() => onMessagePress(item)}
    >
      <Text style={[styles.title, !item.isRead && styles.unreadText]}>
        {item.title}
      </Text>
      <Text numberOfLines={2} style={styles.body}>
        {item.message}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Inbox ({unreadCount} unread)</Text>
      <FlatList
        data={messages}
        keyExtractor={m => m.messageId}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header:    { fontSize: 20, fontWeight: '700', padding: 16 },
  card:      {
    backgroundColor: '#F9F9F9',
    borderRadius:    8,
    padding:         12,
    marginBottom:    12,
  },
  unreadCard:      { backgroundColor: '#E8F1FF' },
  title:           { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  unreadText:      { color: '#30241F' },
  body:            { fontSize: 14, color: '#666' },
});
