export function vibrate(ms = 50) {
	// iOS Safari doesn't support vibration API
	// Check for iOS specifically to avoid errors
	const isIOS = typeof navigator !== 'undefined' && 
		/iPad|iPhone|iPod/.test(navigator.userAgent) && 
		!(window as any).MSStream;
	
	if (isIOS) return; // Skip on iOS
	
	if (typeof navigator !== 'undefined' && navigator.vibrate) {
		navigator.vibrate(ms);
	}
}

// Check if haptics are supported (useful for UI feedback)
export function isHapticsSupported(): boolean {
	if (typeof navigator === 'undefined') return false;
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
	if (isIOS) return false;
	return 'vibrate' in navigator;
}
