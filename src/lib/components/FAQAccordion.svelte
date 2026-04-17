<script lang="ts">
	import { vibrate } from '$lib/utils/haptics';
	import { slide } from 'svelte/transition';

	const faqs = [
		{
			q: "O retiro é para toda a igreja?",
			a: "Não. O retiro é exclusivo para Pastores, Líderes de departamento, PGA, Casa dos Filhos, colíderes de PGA, líderes em formação do Caminho de Sabedoria e Executivos de Liderança do Departamento de Artes."
		},
		{
			q: "Posso levar meu filho?",
			a: "Não. Não haverá estrutura ou programação para crianças. O foco do retiro é totalmente voltado para líderes da MPC."
		},
		{
			q: "Como funcionam as suítes do hotel?",
			a: "Os apartamentos serão compartilhados. Haverá um andar exclusivo para mulheres e outro para homens."
		},
		{
			q: "A alimentação está inclusa?",
			a: "Sim. O hotel oferece pensão completa: café da manhã, almoço, coffee break e jantar (incluindo refrigerantes, suco e água)."
		},
		{
			q: "Preciso levar toalha e roupa de cama?",
			a: "Não. O hotel fornece roupas de cama e banho."
		},
		{
			q: "O hotel possui estacionamento?",
			a: "Sim. O estacionamento é gratuito e privativo."
		}
	];

	let openIndex = $state(-1);

	function toggle(index: number) {
		vibrate(60);
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<section class="py-24 px-6 max-w-4xl mx-auto">
	<div class="text-center mb-16">
		<h2 class="text-3xl font-serif text-gold italic mb-2">Dúvidas Frequentes</h2>
		<p class="text-cream/40 text-xs tracking-widest uppercase">Tudo o que você precisa saber</p>
	</div>

	<div class="space-y-6">
		{#each faqs as faq, i (faq.q)}
			<div 
				class="bg-surface rounded-3xl border border-cream/10 overflow-hidden transition-all duration-500 {openIndex === i ? 'ring-2 ring-gold/30 shadow-2xl' : ''}"
			>
				<button 
					type="button"
					class="w-full p-8 text-left flex justify-between items-center gap-6 group min-h-[48px]"
					onclick={() => toggle(i)}
				>
					<span class="font-serif text-xl text-cream group-hover:text-gold transition-all duration-300 leading-tight opacity-100">{faq.q}</span>
					<div class="shrink-0 transition-transform duration-500 {openIndex === i ? 'rotate-180 text-gold scale-125' : 'text-gold/40'}">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M6 9l6 6 6-6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
				</button>
				
				{#if openIndex === i}
					<div transition:slide={{ duration: 400 }}>
						<div class="px-8 pb-8 text-cream/90 font-medium leading-relaxed text-base border-t border-cream/5 pt-6 bg-charcoal/30">
							{faq.a}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
