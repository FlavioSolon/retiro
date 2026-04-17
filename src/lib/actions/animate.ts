import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export type AnimateOptions = {
	type?: 'reveal' | 'fade-up' | 'split-text';
	delay?: number;
	duration?: number;
	stagger?: number;
	scroll?: boolean;
};

export function animate(node: HTMLElement, options: AnimateOptions = {}) {
	const {
		type = 'fade-up',
		delay = 0,
		duration = 0.8,
		stagger = 0.05,
		scroll = true
	} = options;

	// Check for reduced motion preference
	const prefersReducedMotion = typeof window !== 'undefined' && 
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	// If reduced motion is preferred, just make element visible without animation
	if (prefersReducedMotion) {
		node.style.opacity = '1';
		return {
			destroy() {}
		};
	}

	const timeline = gsap.timeline({
		delay,
		scrollTrigger: scroll ? {
			trigger: node,
			start: 'top 85%',
			toggleActions: 'play none none none',
			// Improve performance on mobile
			preventOverlaps: true,
			fastScrollEnd: true
		} : undefined
	});

	if (type === 'split-text') {
		const text = node.textContent || '';
		node.innerHTML = '';
		node.style.opacity = '1';

		const words = text.split(' ').map((word, index, array) => {
			// Create wrapper for the word
			const wrapper = document.createElement('span');
			wrapper.style.display = 'inline-block';
			wrapper.style.overflow = 'hidden';
			wrapper.style.verticalAlign = 'top';
			
			// Create inner span with the word
			const inner = document.createElement('span');
			inner.textContent = word;
			inner.style.display = 'inline-block';
			inner.style.whiteSpace = 'nowrap';
			wrapper.appendChild(inner);
			
			node.appendChild(wrapper);
			
			// Add space after word (except last word)
			if (index < array.length - 1) {
				const space = document.createTextNode('\u00A0');
				node.appendChild(space);
			}
			
			return inner;
		});

		timeline.from(words, {
			y: '100%',
			duration,
			stagger,
			ease: 'power3.out'
		});
	} else if (type === 'reveal') {
		timeline.from(node, {
			clipPath: 'inset(0 100% 0 0)',
			duration: duration * 1.5,
			ease: 'power2.inOut'
		});
	} else {
		// fade-up
		timeline.from(node, {
			opacity: 0,
			y: 30,
			duration,
			ease: 'power2.out'
		});
	}

	return {
		destroy() {
			timeline.kill();
		}
	};
}
