<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import EventDetails from '$lib/components/EventDetails.svelte';
	import PricingBento from '$lib/components/PricingBento.svelte';
	import Logistics from '$lib/components/Logistics.svelte';
	import FAQAccordion from '$lib/components/FAQAccordion.svelte';
	import StickyCTA from '$lib/components/StickyCTA.svelte';
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';
	import { animate } from '$lib/actions/animate';
</script>

<svelte:head>
	<title>Retiro de Espiritualidade 2026 | Liderança MPC</title>
	<meta name="description" content="Retiro de Espiritualidade para Liderança MPC. Participe de um momento único de renovação e fé nos dias 30 e 31 de Outubro no Hotel Pousada Margem da Amazônia em Manaus." />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Missão Paixão e Compaixão" />
	<meta name="keywords" content="retiro espiritual, liderança cristã, MPC, Missão Paixão e Compaixão, Manaus, Amazonas, renovação espiritual, retiro cristão, liderança evangélica" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://retirompc.com.br" />
	
	<!-- Favicon - SVG with black background for visibility -->
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="icon" type="image/png" href="/images/logo-mpc-white.png" sizes="192x192" />
	<link rel="apple-touch-icon" href="/images/logo-mpc-white.png" sizes="180x180" />
	<link rel="mask-icon" href="/images/logo-mpc-color.png" color="#1a1a2e" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://retirompc.com.br" />
	<meta property="og:title" content="Retiro de Espiritualidade 2026 | Liderança MPC" />
	<meta property="og:description" content="Um tempo de solitude, oração e renovação para aqueles que lideram com paixão e compaixão. Dias 30 e 31 de Outubro em Manaus." />
	<meta property="og:image" content="https://retirompc.com.br/images/logo-mpc-color.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Missão Paixão e Compaixão" />
	<meta property="og:locale" content="pt_BR" />
	
	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://retirompc.com.br" />
	<meta name="twitter:title" content="Retiro de Espiritualidade 2026 | Liderança MPC" />
	<meta name="twitter:description" content="Um tempo de solitude, oração e renovação para aqueles que lideram com paixão e compaixão." />
	<meta name="twitter:image" content="https://retirompc.com.br/images/logo-mpc-color.png" />
	
	<!-- Theme Color for browsers -->
	<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: light)" />
	<meta name="msapplication-TileColor" content="#1a1a2e" />
	<meta name="msapplication-TileImage" content="/images/logo-mpc-color.png" />
	
	<!-- Mobile App Capable -->
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Retiro MPC" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	
	<!-- Preconnect for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<main class="bg-charcoal min-h-screen selection:bg-terracotta selection:text-cream">
	<!-- Navigation / Logo -->
	<nav class="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-charcoal/80 to-transparent">
		<div class="flex items-center gap-3">
			<img 
				src="/images/logo-mpc-white.png" 
				alt="MPC Logo" 
				class="h-14 w-auto drop-shadow-lg"
				width="56"
				height="56"
				loading="eager"
				decoding="async"
			/>
			<span class="font-serif italic text-cream text-xl hidden sm:block">MPC</span>
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

	<!-- Photo Gallery -->
	<PhotoGallery />

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
		<!-- Developer Credits -->
		<div class="mb-8">
			<p class="text-[10px] uppercase tracking-[0.2em] mb-4 text-cream/40">Desenvolvido por</p>
			<div class="flex flex-col items-center gap-3">
				<a 
					href="https://flavio-solon.lovable.app/" 
					target="_blank" 
					rel="noopener noreferrer"
					class="text-cream/70 hover:text-gold transition-colors font-serif italic text-lg"
				>
					Flávio Sólon
				</a>
				<div class="flex items-center gap-4">
					<a 
						href="https://github.com/FlavioSolon" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-9 h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/30 hover:bg-gold/10 transition-all"
						aria-label="GitHub"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</a>
					<a 
						href="https://www.linkedin.com/in/fl%C3%A1vio-s-8941b9212/" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-9 h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/30 hover:bg-gold/10 transition-all"
						aria-label="LinkedIn"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
					<a 
						href="https://www.instagram.com/solonflavi/" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-9 h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/30 hover:bg-gold/10 transition-all"
						aria-label="Instagram"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
						</svg>
					</a>
					<a 
						href="https://flavio-solon.lovable.app/" 
						target="_blank" 
						rel="noopener noreferrer"
						class="w-9 h-9 rounded-full bg-cream/5 border border-cream/10 flex items-center justify-center text-cream/50 hover:text-cream hover:border-gold/30 hover:bg-gold/10 transition-all"
						aria-label="Portfólio"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
							<polyline points="9 22 9 12 15 12 15 22"/>
						</svg>
					</a>
				</div>
			</div>
		</div>

		<div class="h-px w-32 bg-cream/10 mx-auto mb-8"></div>

		<!-- MPC Logo -->
		<div class="mb-8 flex justify-center opacity-80">
			<img 
				src="/images/logo-mpc-white.png" 
				alt="MPC Logo" 
				class="h-20 w-auto"
				width="80"
				height="80"
				loading="lazy"
				decoding="async"
			/>
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
