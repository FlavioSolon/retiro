<script lang="ts">
	import { animate } from '$lib/actions/animate';

	let { title = "Retiro de Espiritualidade para Liderança MPC" } = $props();
</script>

<section class="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
	<!-- Background Image with Overlay -->
	<div class="absolute inset-0 z-0">
		<img 
			src="/images/fundo.avif" 
			alt="Sacred atmosphere" 
			class="w-full h-full object-cover opacity-50 scale-105"
			loading="eager"
			fetchpriority="high"
			decoding="async"
		/>
		<div class="absolute inset-0 bg-warm-overlay"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 max-w-5xl">
		<h1 
			use:animate={{ type: 'split-text', delay: 0.5, stagger: 0.04 }}
			class="text-[clamp(1.65rem,5.5vw,4.5rem)] font-serif text-cream italic mb-12 drop-shadow-2xl px-2 sm:px-6 leading-tight md:leading-[1.3] whitespace-normal"
		>
			{title}
		</h1>

		<div 
			use:animate={{ type: 'fade-up', delay: 1.2 }}
			class="flex flex-col items-center gap-6"
		>
			<div class="h-20 w-px bg-gradient-to-b from-transparent to-gold opacity-50"></div>
			<p class="text-white font-sans text-xl md:text-2xl italic tracking-wide">
				30 e 31 de Outubro • Hotel da Margem
			</p>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
		</svg>
	</div>
</section>

<style>
	h1 :global(span) {
		display: inline-block;
		white-space: nowrap;
	}
</style>
