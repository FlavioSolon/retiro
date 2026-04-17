<script lang="ts">
	import { animate } from '$lib/actions/animate';
	import { vibrate } from '$lib/utils/haptics';

	// Svelte 5 Runes for logic
	let mesSimulado = $state(new Date().getMonth()); // Default to actual month
	
	const regrasParcelamento = [
		{ m: 0, nome: 'Jan', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 1, nome: 'Fev', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 2, nome: 'Mar', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 3, nome: 'Abril', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 4, nome: 'Maio', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 5, nome: 'Junho', lote: 1, valor: 550, maxParcelas: 7 },
		{ m: 6, nome: 'Julho', lote: 2, valor: 580, maxParcelas: 6 },
		{ m: 7, nome: 'Agosto', lote: 2, valor: 580, maxParcelas: 4 },
		{ m: 8, nome: 'Setembro', lote: 3, valor: 600, maxParcelas: 3 },
		{ m: 9, nome: 'Outubro', lote: 3, valor: 600, maxParcelas: 2 },
		{ m: 10, nome: 'Nov', lote: 3, valor: 600, maxParcelas: 1 },
		{ m: 11, nome: 'Dez', lote: 3, valor: 600, maxParcelas: 1 },
	];

	// Derive the current rule based on month boundaries
	const regraAtual = $derived.by(() => {
		if (mesSimulado < 4) return regrasParcelamento[4]; // Maio
		if (mesSimulado > 9) return regrasParcelamento[9]; // Outubro
		return regrasParcelamento[mesSimulado];
	});
	
	// Selection state
	let parcelaSelecionada = $state(1);
	
	// EFFECT: Reset selected installment to max available when month changes
	$effect(() => {
		parcelaSelecionada = regraAtual.maxParcelas;
	});

	// Value Display derived from selection
	const valorParcelado = $derived((regraAtual.valor / parcelaSelecionada).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

	function selecionar(num: number) {
		vibrate(40);
		parcelaSelecionada = num;
	}

	function alterarMes(m: number) {
		vibrate(60);
		mesSimulado = m;
	}
</script>

<section class="py-24 px-6 max-w-xl mx-auto">
	<div class="text-center mb-16" use:animate>
		<h2 class="text-4xl md:text-5xl font-serif text-cream italic mb-4">Investimento</h2>
		<p class="text-gold uppercase tracking-[0.2em] text-[10px] font-black italic">Confira os valores e condições</p>
	</div>

	<!-- 1. Main Calculator Card -->
	<div 
		use:animate={{ type: 'fade-up' }}
		class="relative bg-surface rounded-[3.5rem] border border-cream/10 p-10 shadow-2xl overflow-hidden mb-12"
	>
		<!-- Sacred Glow -->
		<div class="absolute -top-32 -right-32 w-64 h-64 bg-terracotta/10 blur-[100px] rounded-full"></div>
		
		<div class="relative z-10 flex flex-col items-center">
			<!-- Lote Indicator -->
			<div class="bg-charcoal/80 border border-gold/20 text-gold px-6 py-2 rounded-full text-[12px] uppercase tracking-[0.3em] font-black mb-10 shadow-lg">
				{regraAtual.lote}º Lote • {regraAtual.nome}
			</div>

			<!-- Large Display Price -->
			<div class="flex flex-col items-center mb-12 text-center">
				<p class="text-cream/30 text-[11px] uppercase tracking-widest font-black mb-4 italic">Valor da Parcela</p>
				<h3 class="text-5xl md:text-7xl font-serif text-cream italic leading-none drop-shadow-sm">
					{parcelaSelecionada}x de <span class="text-gold">{valorParcelado}</span>
				</h3>
				<div class="mt-8 flex items-center gap-3">
					<div class="h-px w-8 bg-cream/10"></div>
					<p class="text-cream/50 text-sm font-medium">Total: <span class="text-cream underline decoration-terracotta/60">R$ {regraAtual.valor},00</span></p>
					<div class="h-px w-8 bg-cream/10"></div>
				</div>
			</div>

			<!-- Installment Selector -->
			<div class="w-full mb-10">
				<p class="text-[10px] text-cream/40 uppercase tracking-[0.2em] font-black mb-6 text-center italic">Escolha o número de parcelas</p>
				<div class="flex flex-wrap justify-center gap-3">
					{#each Array.from({length: regraAtual.maxParcelas}, (_, i) => i + 1) as p (p)}
						<button 
							type="button"
							class="w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] border-2 flex flex-col items-center justify-center transition-all duration-300 transform active:scale-95 min-w-[48px] min-h-[48px]
							{parcelaSelecionada === p ? 'bg-terracotta border-terracotta text-cream shadow-xl shadow-terracotta/20 -translate-y-1' : 'bg-charcoal/40 border-cream/10 text-cream/30 hover:border-gold/30 hover:text-gold'}"
							onclick={() => selecionar(p)}
						>
							<span class="text-xl md:text-2xl font-serif italic leading-none">{p}x</span>
						</button>
					{/each}
				</div>
			</div>

			<p class="text-[11px] text-cream/20 uppercase tracking-[0.1em] font-medium text-center leading-relaxed">
				Pagamento seguro via cartão de crédito<br/>
				*** SEM JUROS ***
			</p>
		</div>
	</div>

	<!-- 2. Month Switcher (Simulator) - REDESIGNED SENIOR LOOK -->
	<div 
		use:animate={{ type: 'fade-up', delay: 0.2 }}
		class="bg-charcoal/40 p-8 rounded-[3rem] border border-cream/5 mb-12"
	>
		<div class="flex items-center justify-between mb-8">
			<h4 class="text-cream font-serif text-2xl italic">Simular Mês</h4>
			<span class="bg-gold/10 text-gold text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-full border border-gold/20">Modo Teste</span>
		</div>
		
		<div class="grid grid-cols-2 gap-4">
			{#each [4, 5, 6, 7, 8, 9] as m (m)}
				<button 
					type="button"
					class="relative p-6 rounded-3xl border-2 flex flex-col items-start gap-4 transition-all duration-500 overflow-hidden transform active:scale-95 min-h-[100px]
					{mesSimulado === m ? 'bg-gold border-gold text-charcoal shadow-2xl shadow-gold/10' : 'bg-surface border-cream/5 text-cream hover:border-gold/30'}"
					onclick={() => alterarMes(m)}
				>
					<div class="flex flex-col items-start leading-none">
						<span class="text-[10px] uppercase tracking-widest font-black mb-1 opacity-60">Lote {regrasParcelamento[m].lote}</span>
						<span class="text-xl font-serif italic font-bold">{regrasParcelamento[m].nome}</span>
					</div>
					
					<div class="flex items-baseline gap-1 mt-auto">
						<span class="text-[10px] font-bold">R$</span>
						<span class="text-2xl font-serif font-black">{regrasParcelamento[m].valor}</span>
					</div>

					{#if mesSimulado === m}
						<div class="absolute -bottom-4 -right-4 text-charcoal/5 rotate-12">
							<svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- 3. Cancellation Policy Box -->
	<div 
		use:animate={{ type: 'fade-up', delay: 0.4 }}
		class="bg-terracotta/5 rounded-[2.5rem] border border-terracotta/20 p-10 shadow-xl relative overflow-hidden group"
	>
		<h3 class="text-terracotta font-serif italic text-2xl mb-8 flex items-center gap-3">
			<span>📌</span> Política de Cancelamento
		</h3>
		
		<div class="space-y-6 text-cream text-lg leading-relaxed">
			<p class="flex items-start gap-4">
				<span class="text-terracotta mt-1.5 flex-shrink-0">●</span>
				<span>Desistência com <strong class="text-white font-bold underline decoration-terracotta/30">90 dias</strong> de antecedência para reembolso.</span>
			</p>
			<p class="flex items-start gap-4">
				<span class="text-terracotta mt-1.5 flex-shrink-0">●</span>
				<span>Taxa de desistência: <strong class="text-white font-serif italic text-xl">R$ 200,00</strong>.</span>
			</p>
			
			<div class="bg-charcoal/60 p-6 rounded-2xl border border-terracotta/20 mt-6 leading-relaxed">
				<p class="text-[10px] uppercase tracking-widest font-black text-terracotta mb-2 italic">❗ Atenção</p>
				<p class="text-cream font-medium">Nenhum reembolso será aplicado para desistências após o prazo de 90 dias ou não comparecimento.</p>
			</div>
		</div>
	</div>
</section>
