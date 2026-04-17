<script lang="ts">
	import { animate } from '$lib/actions/animate';
</script>

<section class="py-24 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
	<div use:animate={{ type: 'fade-up' }}>
		<h2 class="text-3xl font-serif text-gold mb-8 italic">Onde Nos Encontraremos</h2>
		<div class="space-y-6 text-cream/70 leading-relaxed">
			<p>
				O <span class="text-cream font-medium">Hotel da Margem</span>, localizado no coração do Tarumã Açu, é o cenário escolhido para este mergulho na espiritualidade.
			</p>
			<p class="flex items-start gap-3">
				<svg class="w-6 h-6 text-terracotta shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
				<span>Ramal do Bancrevea, 30 — Tarumã Açu, Manaus - AM</span>
			</p>
			<p class="flex items-start gap-3">
				<svg class="w-6 h-6 text-terracotta shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
				<span>Apenas 21 km da MPC (aprox. 33 minutos de carro)</span>
			</p>
		</div>
	</div>

	<div use:animate={{ type: 'fade-up', delay: 0.2 }} class="grid grid-cols-2 gap-4">
		<div class="bg-surface p-6 rounded-2xl border border-cream/5 flex flex-col justify-center text-center translate-y-8">
			<span class="text-3xl font-serif text-cream mb-1">80</span>
			<span class="text-xs uppercase tracking-widest text-cream/40 px-2">Participantes</span>
		</div>
		<div class="bg-terracotta p-6 rounded-2xl flex flex-col justify-center text-center">
			<span class="text-3xl font-serif text-cream mb-1 italic">Vagas</span>
			<span class="text-xs uppercase tracking-widest text-cream/60 px-2">Limitadas</span>
		</div>
		<div class="col-span-2 bg-surface p-6 rounded-2xl border border-cream/5 flex flex-col justify-center text-center">
			<span class="text-xl font-serif text-gold mb-2 leading-tight">Pensão Completa</span>
			<p class="text-xs text-cream/40 px-4">Café, almoço, coffee break e jantar incluso</p>
		</div>
	</div>
</section>
