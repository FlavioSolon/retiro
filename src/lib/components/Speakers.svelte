<script lang="ts">
	import { animate } from '$lib/actions/animate';
	import { vibrate } from '$lib/utils/haptics';
	
	let isExpanded = $state(false);
	
	function toggleExpand() {
		vibrate(40);
		isExpanded = !isExpanded;
	}
</script>

<section class="relative py-32 px-6 overflow-hidden bg-charcoal">
	<!-- Ambient Background Effects -->
	<div class="absolute inset-0 z-0">
		<div class="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[120px]"></div>
		<div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-terracotta/5 rounded-full blur-[120px]"></div>
	</div>
	
	<!-- Section Header -->
	<div class="relative z-10 max-w-7xl mx-auto">
		<div class="text-center mb-20" use:animate={{ type: 'fade-up' }}>
			<span class="text-gold text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">Nossos Preletores</span>
			<h2 class="text-4xl md:text-6xl font-serif text-cream italic mb-6">
				<span class="text-gold">Revs.</span> Daniel e Rhonda Davis
			</h2>
			<div class="flex items-center justify-center gap-4">
				<div class="h-px w-12 bg-gold/30"></div>
				<p class="text-cream/50 text-sm font-sans">25 anos de casamento • Fort Worth, Texas</p>
				<div class="h-px w-12 bg-gold/30"></div>
			</div>
		</div>
		
		<!-- Main Content Grid -->
		<div class="grid lg:grid-cols-12 gap-8 items-start" use:animate={{ type: 'fade-up', delay: 0.2 }}>
			
			<!-- Large Photo Card - Spans 7 columns -->
			<div class="lg:col-span-7 relative group">
				<div class="relative rounded-[2rem] overflow-hidden bg-surface border border-cream/10 shadow-2xl">
					<!-- Photo -->
					<div class="relative aspect-[4/3] overflow-hidden">
						<img 
							src="/images/preletores.avif" 
							alt="Revs. Daniel e Rhonda Davis"
							class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
							decoding="async"
						/>
						<!-- Gradient Overlay -->
						<div class="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80"></div>
						
						<!-- Floating Badge -->
						<div class="absolute top-6 left-6">
							<div class="bg-gold/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-black shadow-lg">
								Victory.Church
							</div>
						</div>
					</div>
					
					<!-- Photo Caption -->
					<div class="absolute bottom-0 left-0 right-0 p-8">
						<p class="text-cream/80 font-serif italic text-lg md:text-xl leading-relaxed">
							"O casal é casado há 25 anos, tem três filhos e reside em <span class="text-gold">Fort Worth, Texas</span>."
						</p>
					</div>
				</div>
				
				<!-- Decorative Elements -->
				<div class="absolute -bottom-4 -right-4 w-32 h-32 bg-terracotta/20 rounded-full blur-3xl -z-10"></div>
			</div>
			
			<!-- Info Cards - Spans 5 columns -->
			<div class="lg:col-span-5">
				
				<!-- Cards Container - Hidden on mobile unless expanded -->
				<div class="space-y-6 {isExpanded ? 'block' : 'hidden'} lg:block">
					<!-- Rev. Daniel Card -->
					<div class="group relative bg-surface/50 backdrop-blur-sm rounded-[2rem] border border-cream/10 p-8 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5">
						<div class="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/10 transition-colors"></div>
						
						<div class="relative flex items-start gap-5">
							<div class="flex-shrink-0">
								<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
									<span class="text-gold font-serif italic text-2xl">D</span>
								</div>
							</div>
							
							<div class="flex-1 min-w-0">
								<h3 class="text-cream font-serif italic text-xl mb-1">Rev. Daniel Davis</h3>
								<p class="text-gold/80 text-[10px] uppercase tracking-widest font-black mb-3">Pastor de Formação Espiritual</p>
								
								<p class="text-cream/60 text-sm leading-relaxed">
									Pastor de Formação Espiritual na <span class="text-cream font-medium">Victory.Church</span>. Possui doutorado em Teologia e formação como Diretor Espiritual.
								</p>
								
								<div class="mt-4 flex items-center gap-2 text-gold/60 text-xs">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
										<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
										<path d="M6 12v5c3 3 9 3 12 0v-5"/>
									</svg>
									<span>Doutor em Teologia</span>
								</div>
							</div>
						</div>
					</div>
					
					<!-- Rev. Rhonda Card -->
					<div class="group relative bg-surface/50 backdrop-blur-sm rounded-[2rem] border border-cream/10 p-8 hover:border-terracotta/30 transition-all duration-500 hover:shadow-2xl hover:shadow-terracotta/5">
						<div class="absolute top-0 right-0 w-24 h-24 bg-terracotta/5 rounded-full blur-2xl group-hover:bg-terracotta/10 transition-colors"></div>
						
						<div class="relative flex items-start gap-5">
							<div class="flex-shrink-0">
								<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta/20 to-terracotta/5 border border-terracotta/20 flex items-center justify-center">
									<span class="text-terracotta font-serif italic text-2xl">R</span>
								</div>
							</div>
							
							<div class="flex-1 min-w-0">
								<h3 class="text-cream font-serif italic text-xl mb-1">Rev. Rhonda Davis</h3>
								<p class="text-terracotta/80 text-[10px] uppercase tracking-widest font-black mb-3">Pastora Executiva</p>
								
								<p class="text-cream/60 text-sm leading-relaxed">
									Pastora Executiva de Cultura e Desenvolvimento de Equipes na <span class="text-cream font-medium">Victory.Church</span>, com doutorado em Liderança Global.
								</p>
								
								<div class="mt-4 flex items-center gap-2 text-terracotta/60 text-xs">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
										<circle cx="9" cy="7" r="4"/>
										<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
										<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
									</svg>
									<span>Doutora em Liderança Global</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Mobile Expand Button - Shows below the photo on mobile -->
				<button 
					type="button"
					onclick={toggleExpand}
					class="lg:hidden w-full mt-6 py-4 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium flex items-center justify-center gap-2 hover:bg-gold/20 transition-all"
				>
					<span>{isExpanded ? 'Ver menos' : 'Ver biografia completa'}</span>
					<svg 
						width="16" 
						height="16" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="currentColor" 
						stroke-width="2"
						class="transition-transform duration-300 {isExpanded ? 'rotate-180' : ''}"
					>
						<path d="M6 9l6 6 6-6"/>
					</svg>
				</button>
			</div>
		</div>
		
		<!-- Decorative Quote -->
		<div class="mt-20 text-center max-w-3xl mx-auto" use:animate={{ type: 'fade-up', delay: 0.4 }}>
			<div class="relative">
				<div class="absolute -top-8 left-1/2 -translate-x-1/2 text-gold/10 text-8xl font-serif">"</div>
				<p class="relative text-cream/70 font-serif italic text-xl md:text-2xl leading-relaxed pt-8">
					Um casal comprometido com a formação de líderes transformadores
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		position: relative;
	}
</style>
