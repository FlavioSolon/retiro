<script lang="ts">
	import { animate } from '$lib/actions/animate';
	import { vibrate } from '$lib/utils/haptics';

	// Get current real date
	const hoje = new Date();
	const mesAtual = hoje.getMonth();
	const anoAtual = hoje.getFullYear();
	
	// Event year is 2026
	const anoEvento = 2026;
	
	// Define lotes with their start dates
	const lotes = [
		{ id: 1, nome: '1º Lote', valor: 550, mesInicio: 4, mesFim: 5, label: 'Maio - Junho' }, // Maio e Junho
		{ id: 2, nome: '2º Lote', valor: 580, mesInicio: 6, mesFim: 7, label: 'Julho - Agosto' }, // Julho e Agosto
		{ id: 3, nome: '3º Lote', valor: 600, mesInicio: 8, mesFim: 9, label: 'Setembro - Outubro' }, // Setembro e Outubro
	];

	// Determine current lote based on actual date (or default to lote 1 if before May 2026)
	function getLoteAtual(): typeof lotes[0] {
		// If before 2026 or before May 2026, show lote 1
		if (anoAtual < anoEvento || (anoAtual === anoEvento && mesAtual < 4)) {
			return lotes[0];
		}
		// If after October 2026, show lote 3
		if (anoAtual > anoEvento || (anoAtual === anoEvento && mesAtual > 9)) {
			return lotes[2];
		}
		// Find current lote based on month
		const lote = lotes.find(l => mesAtual >= l.mesInicio && mesAtual <= l.mesFim);
		return lote || lotes[2]; // Default to lote 3 if not found
	}

	const loteAtual = getLoteAtual();

	// Parcelamento rules based on how many months until October 2026
	const regrasParcelamento = [
		{ m: 4, nome: 'Maio', lote: 1, valor: 550, maxParcelas: 8 },
		{ m: 5, nome: 'Junho', lote: 1, valor: 550, maxParcelas: 7 },
		{ m: 6, nome: 'Julho', lote: 2, valor: 580, maxParcelas: 6 },
		{ m: 7, nome: 'Agosto', lote: 2, valor: 580, maxParcelas: 4 },
		{ m: 8, nome: 'Setembro', lote: 3, valor: 600, maxParcelas: 3 },
		{ m: 9, nome: 'Outubro', lote: 3, valor: 600, maxParcelas: 2 },
	];

	// Simulation state - starts with current month or lote's first month
	let mesSimulado = $state(
		anoAtual === anoEvento && mesAtual >= 4 && mesAtual <= 9 
			? mesAtual 
			: loteAtual.mesInicio
	);
	
	// History toggle state
	let mostrarHistorico = $state(false);

	// Derive the current rule based on simulated month
	const regraAtual = $derived.by(() => {
		const regra = regrasParcelamento.find(r => r.m === mesSimulado);
		return regra || regrasParcelamento[0];
	});
	
	// Check if viewing past lote
	const isLotePassado = $derived(regraAtual.lote < loteAtual.id);
	const isLoteFuturo = $derived(regraAtual.lote > loteAtual.id);
	
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

	function toggleHistorico() {
		vibrate(50);
		mostrarHistorico = !mostrarHistorico;
	}

	// Filter months: show all from May to Oct initially, hide past months as time passes
	const mesesVisiveis = $derived.by(() => {
		if (mostrarHistorico) {
			// Show all months from May to October
			return [4, 5, 6, 7, 8, 9];
		}
		// Show only months from current month forward (or May if before May 2026)
		let mesInicioVisivel = 4; // Start from May by default
		
		if (anoAtual === anoEvento && mesAtual >= 4 && mesAtual <= 9) {
			// We're in the event year between May-Oct, start from current month
			mesInicioVisivel = mesAtual;
		} else if (anoAtual > anoEvento || (anoAtual === anoEvento && mesAtual > 9)) {
			// After October 2026, show all (event has passed)
			mesInicioVisivel = 4;
		}
		
		return regrasParcelamento
			.filter(r => r.m >= mesInicioVisivel)
			.map(r => r.m);
	});
</script>

<section class="py-24 px-6 max-w-xl mx-auto">
	<div class="text-center mb-16" use:animate>
		<h2 class="text-4xl md:text-5xl font-serif text-cream italic mb-4">Investimento</h2>
		<p class="text-gold uppercase tracking-[0.2em] text-[10px] font-black italic">Confira os valores e condições</p>
	</div>

	<!-- Current Lote Info Banner -->
	<div class="bg-gold/10 border border-gold/20 rounded-2xl p-4 mb-6 text-center">
		<p class="text-[10px] uppercase tracking-widest text-gold/70 mb-1">Lote Atual</p>
		<p class="text-cream font-serif italic text-lg">{loteAtual.nome} • R$ {loteAtual.valor},00</p>
		<p class="text-[9px] text-cream/40 mt-1">{loteAtual.label}</p>
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
			<div class="bg-charcoal/80 border border-gold/20 text-gold px-6 py-2 rounded-full text-[12px] uppercase tracking-[0.3em] font-black mb-10 shadow-lg flex items-center gap-2">
				{#if isLotePassado}
					<span class="text-terracotta text-[10px]">(LOTE ANTERIOR)</span>
				{:else if isLoteFuturo}
					<span class="text-cream/50 text-[10px]">(PRÓXIMO LOTE)</span>
				{/if}
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
		<div class="flex items-center justify-between mb-6">
			<div>
				<h4 class="text-cream font-serif text-2xl italic">Simular Pagamento</h4>
				<p class="text-[10px] text-cream/40 mt-1">
					{#if mostrarHistorico}
						Visualizando todos os meses (Maio a Outubro)
					{:else}
						Meses disponíveis para pagamento
					{/if}
				</p>
			</div>
			<button
				type="button"
				onclick={toggleHistorico}
				class="bg-gold/10 hover:bg-gold/20 text-gold text-[9px] uppercase tracking-widest font-black px-4 py-2 rounded-full border border-gold/20 transition-all flex items-center gap-2"
			>
				{#if mostrarHistorico}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M6 18L18 6M6 6l12 12"/>
					</svg>
					<span>Ocultar Anteriores</span>
				{:else}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
					<span>Ver Todos os Lotes</span>
				{/if}
			</button>
		</div>
		
		<div class="grid grid-cols-2 gap-4">
			{#each mesesVisiveis as m (m)}
				{@const regra = regrasParcelamento.find(r => r.m === m) || regrasParcelamento[0]}
				<button 
					type="button"
					class="relative p-6 rounded-3xl border-2 flex flex-col items-start gap-4 transition-all duration-500 overflow-hidden transform active:scale-95 min-h-[100px]
					{mesSimulado === m ? 'bg-gold border-gold text-charcoal shadow-2xl shadow-gold/10' : 'bg-surface border-cream/5 text-cream hover:border-gold/30'}"
					onclick={() => alterarMes(m)}
				>
					<div class="flex flex-col items-start leading-none">
						<span class="text-[10px] uppercase tracking-widest font-black mb-1 opacity-60">Lote {regra.lote}</span>
						<span class="text-xl font-serif italic font-bold">{regra.nome}</span>
					</div>
					
					<div class="flex items-baseline gap-1 mt-auto">
						<span class="text-[10px] font-bold">R$</span>
						<span class="text-2xl font-serif font-black">{regra.valor}</span>
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
