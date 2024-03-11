import { useEffect, useState } from 'react';
import { getDaysBetweenDates } from './dates';

/**
 * Set some state in React, and also persist that value in localStorage.
 * @param {string} storageKey The key of the value in localStorage.
 * @param {string | null} initialValue The initial value to store in localStorage and React state.
 * @returns {[string | null, React.Dispatch<string | null>]}
 */
export function useStateWithStorage(storageKey, initialValue) {
	const [value, setValue] = useState(
		() => localStorage.getItem(storageKey) ?? initialValue,
	);
	useEffect(() => {
		if (value === null || value === undefined) {
			return localStorage.removeItem(storageKey);
		}
		return localStorage.setItem(storageKey, value);
	}, [storageKey, value]);

	return [value, setValue];
}

export function purchaseUrgency(dateNextPurchased, lastPurchased) {
	const today = new Date();
	const nextPurchaseDaysBetween = getDaysBetweenDates(
		today,
		dateNextPurchased.toDate(),
	);
	const lastPurchaseDaysBetween = getDaysBetweenDates(
		lastPurchased.toDate(),
		today,
	);
	if (lastPurchaseDaysBetween > 60) {
		return 'Inactive';
	}
	if (nextPurchaseDaysBetween < 0) {
		return 'Overdue';
	} else if (nextPurchaseDaysBetween <= 7) {
		return 'Soon';
	} else if (nextPurchaseDaysBetween <= 30) {
		return 'Kind Of Soon';
	} else {
		return 'Not Soon';
	}
}
