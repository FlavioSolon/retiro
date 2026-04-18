<script lang="ts">
	import { animate } from '$lib/actions/animate';
	import { vibrate } from '$lib/utils/haptics';
	import { onMount } from 'svelte';

	// Import all gallery images
	import cima from '$lib/assets/cima.webp';
	import entrada from '$lib/assets/entrada.webp';
	import exterior from '$lib/assets/exterior.webp';
	import exterior1 from '$lib/assets/exterior1.webp';
	import piscina from '$lib/assets/piscina.webp';
	import quarto from '$lib/assets/quarto.webp';
	import rio from '$lib/assets/rio.webp';

	const images = [
		{ src: entrada, alt: 'Entrada do Hotel Pousada Margem da Amazônia', title: 'Entrada Principal' },
		{ src: exterior, alt: 'Vista exterior da pousada', title: 'Vista Exterior' },
		{ src: exterior1, alt: 'Área externa da pousada', title: 'Área Externa' },
		{ src: piscina, alt: 'Piscina do hotel', title: 'Piscina' },
		{ src: quarto, alt: 'Acomodações do hotel', title: 'Quartos' },
		{ src: rio, alt: 'Vista do rio', title: 'Vista do Rio' },
		{ src: cima, alt: 'Vista aérea da pousada', title: 'Vista Aérea' }
	];

	let selectedIndex = $state<number | null>(null);
	let currentSlide = $state(0);
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let isLoading = $state(true);

	function openLightbox(index: number) {
		vibrate(40);
		selectedIndex = index;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		selectedIndex = null;
		document.body.style.overflow = '';
	}

	function nextImage() {
		if (selectedIndex !== null) {
			selectedIndex = (selectedIndex + 1) % images.length;
		}
	}

	function prevImage() {
		if (selectedIndex !== null) {
			selectedIndex = (selectedIndex - 1 + images.length) % images.length;
		}
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % images.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	}

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;
		
		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (selectedIndex === null) return;
		
		switch (e.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowRight':
				nextImage();
				break;
			case 'ArrowLeft':
				prevImage();
				break;
		}
	}

	onMount(() => {
		isLoading = false;
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="py-16 md:py-24 px-4 md:px-6 bg-charcoal" use:animate={{ type: 'fade-up' }}>
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-8 md:mb-12">
			<p class="text-[10px] text-gold uppercase tracking-[0.3em] font-black mb-3 italic">Galeria</p>
			<h2 class="font-serif italic text-2xl md:text-3xl text-cream/90">O Local do Retiro</h2>
			<p class="text-cream/50 text-sm mt-2 max-w-md mx-auto">
				Explore o Hotel Pousada Margem da Amazônia, onde sua experiência de renovação acontecerá
			</p>
		</div>

		<!-- Mobile Slider -->
		<div class="md:hidden relative">
			<div 
				class="relative aspect-[4/3] rounded-2xl overflow-hidden bg-charcoal/50"
				on:touchstart={handleTouchStart}
				on:touchend={handleTouchEnd}
			>
				{#each images as image, i}
					{#if i === currentSlide}
						<button
							class="absolute inset-0 w-full h-full"
							on:click={() => openLightbox(i)}
							aria-label="Abrir imagem em tamanho grande"
						>
							<img
								src={image.src}
								alt={image.alt}
								class="w-full h-full object-cover"
								loading="eager"
								decoding="async"
							/>
							<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-4">
								<p class="text-cream text-sm font-medium text-left">{image.title}</p>
							</div>
						</button>
					{/if}
				{/each}

				<!-- Navigation Arrows -->
				<button
					class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm flex items-center justify-center text-cream/80 hover:text-cream transition-all"
					on:click={(e) => { e.stopPropagation(); prevSlide(); }}
					aria-label="Imagem anterior"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>
				<button
					class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/80 backdrop-blur-sm flex items-center justify-center text-cream/80 hover:text-cream transition-all"
					on:click={(e) => { e.stopPropagation(); nextSlide(); }}
					aria-label="Próxima imagem"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			</div>

			<!-- Dots Indicator -->
			<div class="flex justify-center gap-2 mt-4">
				{#each images as _, i}
					<button
						class="w-2 h-2 rounded-full transition-all {i === currentSlide ? 'bg-gold w-6' : 'bg-cream/30'}"
						on:click={() => currentSlide = i}
						aria-label="Ir para imagem {i + 1}"
					/>
				{/each}
			</div>
		</div>

		<!-- Desktop Grid -->
		<div class="hidden md:grid grid-cols-3 gap-4">
			{#each images as image, i}
				<button
					class="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-charcoal/50 cursor-pointer"
					on:click={() => openLightbox(i)}
					aria-label="Abrir {image.title} em tamanho grande"
				>
					<img
						src={image.src}
						alt={image.alt}
						class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
						loading={i < 4 ? "eager" : "lazy"}
						decoding="async"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div class="absolute bottom-0 left-0 right-0 p-4">
							<p class="text-cream text-sm font-medium">{image.title}</p>
							<p class="text-cream/60 text-xs mt-1">Clique para ampliar</p>
						</div>
					</div>
					<div class="absolute top-3 right-3 w-8 h-8 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-cream">
							<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
						</svg>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Lightbox Modal -->
{#if selectedIndex !== null}
	<div 
		class="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4"
		on:click={closeLightbox}
		on:touchstart={handleTouchStart}
		on:touchend={handleTouchEnd}
	>
		<!-- Close Button -->
		<button
			class="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-cream/10 backdrop-blur-sm flex items-center justify-center text-cream hover:bg-cream/20 transition-all"
			on:click={closeLightbox}
			aria-label="Fechar galeria"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		</button>

		<!-- Image Counter -->
		<div class="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-sm">
			<p class="text-cream text-sm font-medium">{selectedIndex + 1} / {images.length}</p>
		</div>

		<!-- Navigation Arrows (Desktop) -->
		<button
			class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream/10 backdrop-blur-sm items-center justify-center text-cream hover:bg-cream/20 transition-all"
			on:click={(e) => { e.stopPropagation(); prevImage(); }}
			aria-label="Imagem anterior"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
		</button>
		<button
			class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-cream/10 backdrop-blur-sm items-center justify-center text-cream hover:bg-cream/20 transition-all"
			on:click={(e) => { e.stopPropagation(); nextImage(); }}
			aria-label="Próxima imagem"
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M9 18l6-6-6-6" />
			</svg>
		</button>

		<!-- Main Image -->
		<div 
			class="relative max-w-5xl max-h-[85vh] w-full"
			on:click={(e) => e.stopPropagation()}
		>
			<img
				src={images[selectedIndex].src}
				alt={images[selectedIndex].alt}
				class="w-full h-full object-contain rounded-lg"
				loading="eager"
				decoding="sync"
			/>
			
			<!-- Caption -->
			<div class="absolute -bottom-12 left-0 right-0 text-center">
				<p class="text-cream text-lg font-medium">{images[selectedIndex].title}</p>
				<p class="text-cream/50 text-sm mt-1">Deslize para navegar • ESC para fechar</p>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Prevent layout shift during image load */
	img {
		content-visibility: auto;
	}
	
	/* Smooth transitions for mobile slider */
	@media (max-width: 768px) {
		button > img {
			will-change: transform;
		}
	}
</style>
