import { useState, useEffect, useCallback } from 'react';
import { getDaysUntilExpiry } from '../utils/dateUtils';
import { STORAGE_KEYS } from '../constants/storageKeys';

export function useNotifications(warranties) {
  const [permission, setPermission] = useState(() => {
    return 'Notification' in window ? Notification.permission : 'default';
  });

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return 'denied';
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, []);

  const sendNotification = useCallback((title, options) => {
    if (permission === 'granted') {
      new Notification(title, options);
    }
  }, [permission]);

  useEffect(() => {
    if (permission !== 'granted' || !warranties || warranties.length === 0) return;

    const checkAndNotify = () => {
      const now = Date.now();
      const lastCheck = localStorage.getItem(STORAGE_KEYS.LAST_NOTIFICATION_CHECK);
      const ONE_DAY = 24 * 60 * 60 * 1000;

      // Only check once per day
      if (lastCheck && now - parseInt(lastCheck, 10) < ONE_DAY) {
        return;
      }

      const expiringSoon = warranties.filter((w) => {
        const days = getDaysUntilExpiry(w.purchaseDate, w.warrantyMonths);
        return days > 0 && days <= 7; // Expiring in next 7 days
      });

      const expired = warranties.filter((w) => {
        const days = getDaysUntilExpiry(w.purchaseDate, w.warrantyMonths);
        return days <= 0 && days > -2; // Recently expired (today or yesterday)
      });

      if (expiringSoon.length > 0) {
        sendNotification('Warranty Vault: Action Needed', {
          body: `You have ${expiringSoon.length} warranties expiring within 7 days.`,
          icon: '/favicon.svg',
          tag: 'warranty-expiring' // Replace previous notifications with this tag
        });
      }

      if (expired.length > 0) {
         sendNotification('Warranty Vault: Item Expired', {
          body: `${expired.length} item(s) recently expired. Check them now.`,
          icon: '/favicon.svg',
          tag: 'warranty-expired'
        });
      }

      localStorage.setItem(STORAGE_KEYS.LAST_NOTIFICATION_CHECK, now.toString());
    };

    checkAndNotify();
  }, [warranties, permission, sendNotification]);

  return { permission, requestPermission };
}
