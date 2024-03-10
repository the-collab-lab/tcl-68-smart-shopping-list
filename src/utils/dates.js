export const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

// This function will enable us to convert JS dates into Firebase-friendly timestamps, calculate the difference, and then return the difference between them (as a number).

export function getDaysBetweenDates(firstDate, secondDate) {
	// Takes two JS Date objects, converts to MS, calculates MS difference, then converts to days as a number (rounded up or down).
	const firstTime = firstDate.getTime();
	const secondTime = secondDate.getTime();
	const secondsBetween = secondTime - firstTime;
	const daysBetween = secondsBetween / ONE_DAY_IN_MILLISECONDS;
	// Round number here
	return daysBetween.toPrecision(3);
}
