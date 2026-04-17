<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import EventDetails from '$lib/components/EventDetails.svelte';
	import PricingBento from '$lib/components/PricingBento.svelte';
	import Logistics from '$lib/components/Logistics.svelte';
	import FAQAccordion from '$lib/components/FAQAccordion.svelte';
	import StickyCTA from '$lib/components/StickyCTA.svelte';
	import { animate } from '$lib/actions/animate';
</script>

<svelte:head>
	<title>Retiro de Espiritualidade 2026 | Liderança MPC</title>
	<meta name="description" content="Retiro de Espiritualidade para Liderança MPC. Participe de um momento único de renovação e fé nos dias 30 e 31 de Outubro." />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</svelte:head>

<main class="bg-charcoal min-h-screen selection:bg-terracotta selection:text-cream">
	<!-- Navigation / Logo -->
	<nav class="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-charcoal/80 to-transparent">
		<div class="flex items-center gap-3">
			<svg width="40" height="40" viewBox="0 0 100 100" class="text-terracotta drop-shadow-lg">
				<path d="M50 15L85 75H15L50 15Z" fill="none" stroke="currentColor" stroke-width="3"/>
				<path d="M50 40L70 75H30L50 40Z" fill="currentColor"/>
				<path d="M25 25L30 30M25 30L30 25" stroke="currentColor" stroke-width="2"/>
				<circle cx="27.5" cy="27.5" r="1.5" fill="currentColor"/>
			</svg>
			<span class="font-serif italic text-cream text-xl">MPC</span>
		</div>
		<div class="hidden md:flex gap-8 text-[10px] uppercase tracking-widest text-cream/40">
			<a href="#event" class="hover:text-gold transition-colors">O Evento</a>
			<a href="#logistica" class="hover:text-gold transition-colors">Localização</a>
			<a href="#investimento" class="hover:text-gold transition-colors">Investimento</a>
			<a href="#faq" class="hover:text-gold transition-colors">Dúvidas</a>
		</div>
	</nav>

	<Hero />

	<div id="event">
		<EventDetails />
	</div>

	<div id="logistica">
		<Logistics />
	</div>

	<!-- Quote Section -->
	<section class="py-24 px-6 text-center border-y border-cream/5">
		<div class="max-w-2xl mx-auto" use:animate={{ type: 'fade-up' }}>
			<p class="font-serif italic text-2xl md:text-3xl text-cream/80 leading-relaxed mb-6">
				"Um tempo de solitude, oração e renovação para aqueles que lideram com paixão e compaixão."
			</p>
			<div class="h-px w-24 bg-gold mx-auto opacity-30"></div>
		</div>
	</section>

	<div id="investimento">
		<PricingBento />
	</div>

	<div id="faq">
		<FAQAccordion />
	</div>

	<!-- Footer -->
	<footer class="py-24 px-6 border-t border-cream/5 text-center text-cream/20 pb-[140px]">
		<div class="mb-8 flex justify-center opacity-50 grayscale">
			<svg width="40" height="40" viewBox="0 0 100 100">
				<path d="M50 15L85 75H15L50 15Z" fill="none" stroke="currentColor" stroke-width="2"/>
			</svg>
		</div>
		<p class="text-[10px] uppercase tracking-widest mb-2 font-bold select-none cursor-default">
			Missão Paixão e Compaixão • © 2026
		</p>
		<p class="text-[8px] max-w-xs mx-auto leading-relaxed italic">
			Hotel Pousada Margem da Amazônia — Tarumã Açu, Manaus.
		</p>
	</footer>

	<StickyCTA />
</main>

<style>
	main {
		overflow-x: hidden;
	}
</style>
