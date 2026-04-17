<script lang="ts">
	import { vibrate } from '$lib/utils/haptics';

	const ctaLink = "https://eventos.sistemaprover.com.br/pt/missaopaixaoecompaixao/retiroesp";

	function handleClick() {
		vibrate(100);
	}
</script>

<div class="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
	<div class="max-w-md mx-auto pointer-events-auto">
		<div class="glass p-4 rounded-3xl border border-cream/10 shadow-2xl flex items-center justify-between gap-4">
			<div class="hidden sm:block pl-2">
				<p class="text-[10px] uppercase tracking-widest text-cream/40 font-bold mb-0.5">Vagas Limitadas</p>
				<p class="text-xs text-gold font-serif italic">80 Participantes Max</p>
			</div>
			
			<a 
				href={ctaLink}
				target="_blank"
				rel="noopener noreferrer"
				class="flex-1 bg-terracotta hover:bg-terracotta/90 text-cream font-serif italic text-lg py-3 rounded-2xl text-center transition-all active:scale-95 shadow-lg shadow-terracotta/20 flex items-center justify-center gap-2"
				onclick={handleClick}
			>
				Garantir Vaga
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
					<path d="M12.5 5L17.5 10L12.5 15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M2.5 10H17.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>
	</div>
</div>

<div class="h-[safe-area-inset-bottom]"></div>
