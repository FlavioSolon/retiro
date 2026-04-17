<script lang="ts">
	import { animate } from '$lib/actions/animate';
	import { vibrate } from '$lib/utils/haptics';

	const address = "Ramal do Bancrevea, 30 — Tarumã Açu, Manaus - AM";
	const hotelName = "Hotel Pousada Margem da Amazônia";
	
	const links = {
		maps: "https://www.google.com/maps/dir/?api=1&destination=Hotel+Pousada+Margem+da+Amazonia",
		waze: "https://waze.com/ul?ll=-2.9974895,-60.09235&navigate=yes",
		uber: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&destination[latitude]=-2.9974895&destination[longitude]=-60.09235&destination[name]=Hotel+Pousada+Margem+da+Amazonia",
		ninenine: "https://99app.com/rider/?destination=-2.9974895,-60.09235&destinationName=Hotel+Pousada+Margem+da+Amazonia"
	};

	let copied = $state(false);

	function copyAddress() {
		vibrate(40);
		navigator.clipboard.writeText(address);
		copied = true;
		setTimeout(() => copied = false, 2000);
	}

	function handleNav(link: string) {
		vibrate(60);
		window.open(link, '_blank');
	}
</script>

<section class="pb-24 px-6 max-w-5xl mx-auto -mt-8">
	<div class="grid lg:grid-cols-2 gap-12 bg-surface/30 p-4 rounded-[2.5rem] border border-cream/5 overflow-hidden">
		<!-- Map Iframe -->
		<div class="w-full h-[350px] md:h-full rounded-3xl overflow-hidden border border-cream/10 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 shadow-inner">
			<iframe 
				title="Mapa Localização"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.359558538197!2d-60.09235009999999!3d-2.9974895000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x926c16f42c8fe061%3A0xcd18350dc06dae54!2sHotel%20Pousada%20Margem%20da%20Amaz%C3%B4nia!5e0!3m2!1spt-BR!2sbr!4v1776388466525!5m2!1spt-BR!2sbr" 
				width="100%" 
				height="100%" 
				style="border:0;" 
				allowfullscreen
				loading="eager"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col justify-center gap-8 px-4 py-8">
			<div>
				<p class="text-[10px] text-gold uppercase tracking-[0.3em] font-black mb-4 italic">Trajeto & Navegação</p>
				<button 
					onclick={copyAddress}
					class="w-full text-gold text-[10px] uppercase tracking-widest font-black flex items-center justify-center gap-2 py-4 rounded-xl bg-gold/5 border border-gold/20 hover:bg-gold/10 transition-all shadow-sm"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
					</svg>
					{copied ? 'Endereço Copiado!' : 'Copiar Endereço Completo'}
				</button>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<button 
					onclick={() => handleNav(links.maps)}
					class="flex flex-col items-center justify-center gap-2 bg-charcoal/60 p-4 rounded-2xl border border-cream/10 hover:border-blue-500/40 group transition-all"
				>
					<div class="w-12 h-12 rounded-xl bg-[#4285F4]/15 flex items-center justify-center group-hover:scale-110 transition-transform border border-[#4285F4]/30">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
							<circle cx="12" cy="9" r="2.5" fill="#4285F4"/>
							<path d="M12 2c-1.5 0-2.87.5-4 1.33l.67 1C9.5 3.83 10.67 3.5 12 3.5c3.03 0 5.5 2.47 5.5 5.5 0 2.33-2.5 6.17-5.5 9.83-3-3.66-5.5-7.5-5.5-9.83 0-1.08.33-2.08.92-2.92l-.67-1C6.08 5.5 5.5 7.17 5.5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-4.69-3.81-8.5-8.5-8.5z" fill="#FBBC05"/>
							<path d="M12 2c4.69 0 8.5 3.81 8.5 8.5 0 5.25-7 13-7 13V2z" fill="#34A853"/>
							<circle cx="12" cy="9" r="2.5" fill="#fff"/>
						</svg>
					</div>
					<span class="text-cream text-sm font-medium">Maps</span>
				</button>

				<button 
					onclick={() => handleNav(links.waze)}
					class="flex flex-col items-center justify-center gap-2 bg-charcoal/60 p-4 rounded-2xl border border-cream/10 hover:border-[#05C8F7]/40 group transition-all"
				>
					<div class="w-12 h-12 rounded-xl bg-[#05C8F7]/15 flex items-center justify-center group-hover:scale-110 transition-transform border border-[#05C8F7]/30">
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
							<circle cx="14" cy="14" r="12" fill="#05C8F7"/>
							<path d="M14 6c-4.42 0-8 3.58-8 8 0 2.5 1.17 4.73 3 6.2V22l2.5-1.5c.75.25 1.55.38 2.38.42.2.02.4.08.62.08 4.42 0 8-3.58 8-8s-3.58-8-8-8z" fill="#fff"/>
							<circle cx="11" cy="13" r="1.5" fill="#333"/>
							<circle cx="17" cy="13" r="1.5" fill="#333"/>
							<path d="M12 17c.5.5 1.5 1 2 1s1.5-.5 2-1" stroke="#333" stroke-width="1" fill="none" stroke-linecap="round"/>
							<path d="M9 11l-1-2M19 11l1-2" stroke="#05C8F7" stroke-width="2" stroke-linecap="round"/>
						</svg>
					</div>
					<span class="text-cream text-sm font-medium">Waze</span>
				</button>

				<button 
					onclick={() => handleNav(links.uber)}
					class="flex flex-col items-center justify-center gap-2 bg-charcoal/60 p-4 rounded-2xl border border-cream/10 hover:border-white/40 group transition-all"
				>
					<div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
							<rect width="24" height="24" rx="4" fill="#000"/>
							<path d="M6 6h12v12H6z" fill="#fff"/>
							<circle cx="12" cy="12" r="3" fill="#000"/>
							<circle cx="12" cy="12" r="1.5" fill="#fff"/>
						</svg>
					</div>
					<span class="text-cream text-sm font-medium">Uber</span>
				</button>

				<button 
					onclick={() => handleNav(links.ninenine)}
					class="flex flex-col items-center justify-center gap-2 bg-charcoal/60 p-4 rounded-2xl border border-cream/10 hover:border-[#FDCB2E]/40 group transition-all"
				>
					<div class="w-12 h-12 rounded-xl bg-[#FDCB2E]/15 flex items-center justify-center group-hover:scale-110 transition-transform border border-[#FDCB2E]/30">
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
							<circle cx="14" cy="14" r="12" fill="#FDCB2E"/>
							<text x="14" y="18" text-anchor="middle" fill="#1a1a2e" font-size="12" font-weight="900" font-family="system-ui">99</text>
						</svg>
					</div>
					<span class="text-cream text-sm font-medium">99</span>
				</button>
			</div>
		</div>
	</div>
</section>
