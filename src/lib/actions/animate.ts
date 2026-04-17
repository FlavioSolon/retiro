import type { gsap as GSAPType } from 'gsap';
import type { ScrollTrigger as STType } from 'gsap/dist/ScrollTrigger';

export type AnimateOptions = {
	type?: 'reveal' | 'fade-up' | 'split-text';
	delay?: number;
	duration?: number;
	stagger?: number;
	scroll?: boolean;
};

// Lazy-loaded GSAP instances
let gsap: typeof GSAPType | null = null;
let ScrollTrigger: typeof STType | null = null;
let gsapPromise: Promise<void> | null = null;

async function loadGsap() {
	if (typeof window === 'undefined') return;
	if (gsap) return;
	
	if (!gsapPromise) {
		gsapPromise = (async () => {
			const gsapModule = await import('gsap');
			const scrollTriggerModule = await import('gsap/dist/ScrollTrigger');
			gsap = gsapModule.gsap;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger!);
		})();
	}
	
	await gsapPromise;
}

export function animate(node: HTMLElement, options: AnimateOptions = {}) {
	// SSR: just return empty destroy function
	if (typeof window === 'undefined') {
		return { destroy() {} };
	}
	
	const {
		type = 'fade-up',
		delay = 0,
		duration = 0.8,
		stagger = 0.05,
		scroll = true
	} = options;

	// Check for reduced motion preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	
	// If reduced motion is preferred, just make element visible without animation
	if (prefersReducedMotion) {
		node.style.opacity = '1';
		return { destroy() {} };
	}

	// Store cleanup function
	let cleanup: (() => void) | null = null;
	
	// Initialize animation
	const initAnimation = async () => {
		await loadGsap();
		if (!gsap) return;

		const timeline = gsap.timeline({
			delay,
			scrollTrigger: scroll && ScrollTrigger ? {
				trigger: node,
				start: 'top 85%',
				toggleActions: 'play none none none',
				preventOverlaps: true,
				fastScrollEnd: true
			} : undefined
		});

		if (type === 'split-text') {
			const text = node.textContent || '';
			node.innerHTML = '';
			node.style.opacity = '1';

			const words = text.split(' ').map((word, index, array) => {
				const wrapper = document.createElement('span');
				wrapper.style.display = 'inline-block';
				wrapper.style.overflow = 'hidden';
				wrapper.style.verticalAlign = 'top';
				
				const inner = document.createElement('span');
				inner.textContent = word;
				inner.style.display = 'inline-block';
				inner.style.whiteSpace = 'nowrap';
				wrapper.appendChild(inner);
				
				node.appendChild(wrapper);
				
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
			timeline.from(node, {
				opacity: 0,
				y: 30,
				duration,
				ease: 'power2.out'
			});
		}

		cleanup = () => {
			timeline.kill();
		};
	};

	initAnimation();

	return {
		destroy() {
			cleanup?.();
		}
	};
}
