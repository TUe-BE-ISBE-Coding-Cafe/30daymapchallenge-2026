<script>
	import { base } from '$app/paths';
	import maps from '$lib/maps.json';
	import { links, kickoff, themes, resources } from '$lib/content.js';

	let selectedDay = $state(null);
	let openMap = $state(null);
	let dialog;

	const countByDay = $derived(
		maps.reduce((acc, m) => ((acc[m.day] = (acc[m.day] ?? 0) + 1), acc), {})
	);
	const shown = $derived(selectedDay ? maps.filter((m) => m.day === selectedDay) : maps);
	const authors = $derived(new Set(maps.map((m) => m.handle)).size);
	const themeName = (day) => themes[day - 1]?.name ?? '';

	// Highlight today's theme while the challenge runs (1–30 Nov 2026).
	const now = new Date();
	const today = now.getFullYear() === 2026 && now.getMonth() === 10 ? now.getDate() : null;

	function pickDay(day) {
		selectedDay = selectedDay === day ? null : day;
		document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
	}

	function show(map) {
		openMap = map;
		dialog.showModal();
	}
</script>

<svelte:head>
	<title>#30DayMapChallenge 2026 | BE Coding Café, TU/e</title>
	<meta
		name="description"
		content="Maps made by the TU/e BE Coding Café community for the #30DayMapChallenge, 1–30 November 2026."
	/>
</svelte:head>

<header class="hero">
	<div class="wrap">
		<p class="eyebrow">BE Coding Café · TU Eindhoven · Special edition</p>
		<h1>#30DayMapChallenge <span>2026</span></h1>
		<p class="lede">
			One theme a day, every day from <strong>1 to 30 November</strong>. Make a map for the days
			that suit you and share it. Here are the maps our community made.
		</p>
		<div class="actions">
			<a class="btn primary" href={links.signup} target="_blank" rel="noreferrer">Join the challenge</a>
			<a class="btn" href="#gallery">See the maps</a>
			<a class="btn" href={links.repo} target="_blank" rel="noreferrer">Starter repo</a>
		</div>
		<dl class="stats">
			<div><dt>Maps</dt><dd>{maps.length}</dd></div>
			<div><dt>Mapmakers</dt><dd>{authors}</dd></div>
			<div><dt>Days covered</dt><dd>{Object.keys(countByDay).length} / 30</dd></div>
		</dl>
	</div>
</header>

<main>
	<section id="about" class="wrap">
		<h2>What is the #30DayMapChallenge?</h2>
		<div class="two">
			<div>
				<p>
					The <a href={links.official} target="_blank" rel="noreferrer">#30DayMapChallenge</a> is a
					community mapping challenge that runs every November. Each day has a theme, from
					"Points" on day 1 to "Pen &amp; paper" on day 30. You make a map for a theme and share
					it with the hashtag <strong>#30DayMapChallenge</strong>.
				</p>
				<p>
					The BE Coding Café takes part with maps of our own, made in R, Python, QGIS or by hand.
					It's a good excuse to try a new dataset, a new tool or a new projection.
				</p>
			</div>
			<ul class="rules">
				<li><strong>No sign-up needed</strong> to take part. Our form only keeps you in the loop.</li>
				<li>
					<strong>Any tool is very welcome.</strong> R, Python, QGIS, or pen and paper, with or without AI.
				</li>
				<li><strong>You don't need to do all 30.</strong> One or two days is already great.</li>
				<li><strong>It isn't a competition.</strong> Make your own work and credit your data.</li>
			</ul>
		</div>
		<div class="callout">
			<h3>AI is welcome here</h3>
			<p>
				This year the BE Coding Café's theme is AI in research software development, so using an
				AI assistant or agent to help make your maps is supported. It isn't the main aim, though:
				the point is making maps, and maps made in R, Python or any other tool without AI are just as
				welcome.
			</p>
			<p>
				If you do use AI, add one line to your map saying how, for example: <em
					>"AI wrote the plotting code, I chose the data and the projection."</em
				>
				Two days fit AI especially well: Day 10, "Prompting only", where the AI makes the whole map,
				and Day 27, "New tool".
			</p>
		</div>
	</section>

	<section id="join" class="wrap">
		<h2>How to take part</h2>
		<ol class="steps">
			<li>
				<strong>Sign up</strong> with the
				<a href={links.signup} target="_blank" rel="noreferrer">form</a> (2 minutes), so we can send
				you updates. You can join even if you miss the café.
			</li>
			<li>
				<strong>Get the starter repo.</strong> Fork or clone
				<a href={links.repo} target="_blank" rel="noreferrer">the repo</a>. It has R and Python
				templates and a ready-made Eindhoven dataset.
			</li>
			<li><strong>Pick a day</strong> below and make your map.</li>
			<li>
				<strong>Add it</strong> as <code>maps/dayNN-yourhandle/</code> with <code>map.png</code>, your
				code and a <code>README.md</code> from the template, then open a pull request. It appears here
				automatically.
			</li>
			<li><strong>Share it</strong> with #30DayMapChallenge wherever you like.</li>
		</ol>
		<p class="note">
			Kick-off at the Coding Café: <strong>{kickoff.date}</strong>, {kickoff.time}, {kickoff.room}.
			Bring a laptop and make your first map with us.
		</p>
	</section>

	<section id="themes" class="wrap">
		<h2>The 30 themes</h2>
		<p class="sub">Click a day to see its maps.</p>
		<ol class="themes">
			{#each themes as t (t.day)}
				<li>
					<button
						class="theme"
						class:active={selectedDay === t.day}
						class:today={today === t.day}
						class:has={countByDay[t.day]}
						onclick={() => pickDay(t.day)}
						aria-pressed={selectedDay === t.day}
					>
						<span class="day">Day {t.day}{#if today === t.day} · today{/if}</span>
						<span class="name">{t.name}</span>
						<span class="hint">{t.hint}</span>
						<span class="count">{countByDay[t.day] ?? 0} {countByDay[t.day] === 1 ? 'map' : 'maps'}</span>
					</button>
				</li>
			{/each}
		</ol>
	</section>

	<section id="gallery" class="wrap">
		<div class="gallery-head">
			<h2>The maps</h2>
			{#if selectedDay}
				<button class="chip" onclick={() => (selectedDay = null)}>
					Day {selectedDay}: {themeName(selectedDay)} ✕
				</button>
			{/if}
		</div>
		{#if shown.length}
			<ul class="grid">
				{#each shown as m (m.folder)}
					<li>
						<button class="card" onclick={() => show(m)}>
							<img src={base + m.image} alt={m.title || `Map for day ${m.day}`} loading="lazy" />
							<span class="meta">
								<span class="day">Day {m.day} · {themeName(m.day)}</span>
								<span class="who">{m.name || '@' + m.handle}</span>
							</span>
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="empty">
				No maps for this day yet. <a href={links.repo} target="_blank" rel="noreferrer">Be the first.</a>
			</p>
		{/if}
	</section>

	<section id="resources" class="wrap">
		<h2>Resources</h2>
		<div class="res">
			{#each resources as r (r.group)}
				<div>
					<h3>{r.group}</h3>
					<ul>
						{#each r.items as item (item.url)}
							<li>
								<a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
								<span>{item.note}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>
</main>

<footer>
	<div class="wrap">
		<p>
			BE Coding Café, Department of the Built Environment, TU Eindhoven. Maps belong to their
			makers; data credits are on each map.
		</p>
		<p>
			<a href={links.repo} target="_blank" rel="noreferrer">GitHub</a> ·
			<a href={links.signup} target="_blank" rel="noreferrer">Sign-up form</a> ·
			<a href={links.official} target="_blank" rel="noreferrer">30daymapchallenge.com</a>
		</p>
	</div>
</footer>

<dialog bind:this={dialog} onclose={() => (openMap = null)}>
	{#if openMap}
		<div class="detail">
			<button class="close" onclick={() => dialog.close()} aria-label="Close">✕</button>
			<img src={base + openMap.image} alt={openMap.title} />
			<div class="info">
				<p class="day">Day {openMap.day} · {themeName(openMap.day)}</p>
				<h3>{openMap.name || '@' + openMap.handle}</h3>
				<dl>
					{#if openMap.data}<dt>Data</dt><dd>{openMap.data}</dd>{/if}
					{#if openMap.tools}<dt>Tools</dt><dd>{openMap.tools}</dd>{/if}
					{#if openMap.crs}<dt>CRS</dt><dd>{openMap.crs}</dd>{/if}
					{#if openMap.ai}<dt>AI</dt><dd>{openMap.ai}</dd>{/if}
					{#if openMap.learned}<dt>What I learned</dt><dd>{openMap.learned}</dd>{/if}
				</dl>
				<a
					class="btn"
					href={`${links.repo}/tree/main/maps/${openMap.folder}`}
					target="_blank"
					rel="noreferrer">Code and data on GitHub</a
				>
			</div>
		</div>
	{/if}
</dialog>

<style>
	:global(:root) {
		--red: #c81919;
		--red-dark: #a51414;
		--pink: #fff5f5;
		--pink-line: #f2c9c9;
		--ink: #18181b;
		--muted: #52525b;
		--line: #e4e4e7;
		--bg: #ffffff;
		--panel: #fafafa;
	}
	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--red: #f05252;
			--red-dark: #ff7a7a;
			--pink: #2a1517;
			--pink-line: #5c2a2d;
			--ink: #f4f4f5;
			--muted: #a1a1aa;
			--line: #2f2f35;
			--bg: #121214;
			--panel: #1a1a1d;
		}
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--ink);
		font:
			16px/1.6 system-ui,
			-apple-system,
			'Segoe UI',
			sans-serif;
	}
	:global(a) {
		color: var(--red);
	}
	.wrap {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 16px;
	}
	section {
		padding: 56px 0 8px;
	}
	h2 {
		font-size: clamp(1.6rem, 3vw, 2.1rem);
		letter-spacing: -0.02em;
		margin: 0 0 18px;
	}
	h3 {
		margin: 0 0 8px;
	}
	code {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 4px;
		padding: 0 4px;
		font-size: 0.9em;
	}

	/* hero */
	.hero {
		background:
			radial-gradient(circle at 85% 20%, rgb(200 25 25 / 0.12), transparent 45%),
			linear-gradient(var(--pink), var(--bg));
		border-bottom: 1px solid var(--line);
		padding: 64px 0 40px;
	}
	.eyebrow {
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--red);
		margin: 0 0 10px;
	}
	h1 {
		font-size: clamp(2.3rem, 7vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.03em;
		margin: 0 0 16px;
		overflow-wrap: anywhere;
	}
	h1 span {
		color: var(--red);
	}
	.lede {
		max-width: 60ch;
		font-size: 1.15rem;
		color: var(--muted);
		margin: 0 0 24px;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.btn {
		display: inline-block;
		border: 1px solid var(--line);
		background: var(--bg);
		color: var(--ink);
		border-radius: 999px;
		padding: 9px 18px;
		font-weight: 600;
		font-size: 0.92rem;
		text-decoration: none;
	}
	.btn:hover {
		border-color: var(--red);
	}
	.btn.primary {
		background: var(--red);
		border-color: var(--red);
		color: #fff;
	}
	.btn.primary:hover {
		background: var(--red-dark);
	}
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 36px;
		margin: 32px 0 0;
	}
	.stats dt {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--muted);
	}
	.stats dd {
		margin: 0;
		font-size: 1.8rem;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	/* about */
	.two {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: 32px;
	}
	.two p {
		margin: 0 0 14px;
		max-width: 62ch;
	}
	.rules {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	.rules li {
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 12px 16px;
	}
	.callout {
		margin-top: 22px;
		border-left: 3px solid var(--red);
		background: var(--pink);
		border-radius: 0 14px 14px 0;
		padding: 14px 18px;
	}
	.callout p {
		margin: 0;
		max-width: 75ch;
	}
	.callout p + p {
		margin-top: 8px;
	}

	/* steps */
	.steps {
		margin: 0;
		padding-left: 1.3em;
		display: grid;
		gap: 10px;
		max-width: 75ch;
	}
	.steps li::marker {
		color: var(--red);
		font-weight: 800;
	}
	.note {
		margin-top: 18px;
		color: var(--muted);
	}
	.sub {
		margin: -8px 0 16px;
		color: var(--muted);
	}

	/* themes */
	.themes {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
		gap: 10px;
	}
	.theme {
		width: 100%;
		height: 100%;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 2px;
		background: var(--bg);
		color: var(--ink);
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: 12px 14px;
		font: inherit;
		cursor: pointer;
		transition:
			border-color 150ms,
			transform 150ms;
	}
	.theme:hover {
		border-color: var(--red);
		transform: translateY(-2px);
	}
	.theme.has {
		background: var(--pink);
		border-color: var(--pink-line);
	}
	.theme.active {
		border-color: var(--red);
		box-shadow: 0 0 0 2px var(--red) inset;
	}
	.theme.today .day {
		color: var(--red);
	}
	.theme .day {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.theme .name {
		font-weight: 700;
		line-height: 1.25;
	}
	.theme .hint {
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.35;
		flex: 1;
	}
	.theme .count {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--red);
		margin-top: 6px;
	}

	/* gallery */
	.gallery-head {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 12px;
	}
	.chip {
		border: 1px solid var(--red);
		background: var(--pink);
		color: var(--red);
		border-radius: 999px;
		padding: 4px 12px;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
	}
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 16px;
	}
	.card {
		width: 100%;
		display: block;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: 16px;
		overflow: hidden;
		background: var(--bg);
		color: var(--ink);
		font: inherit;
		text-align: left;
		cursor: zoom-in;
		transition:
			transform 150ms,
			box-shadow 150ms;
	}
	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 18px 40px -24px rgb(0 0 0 / 0.35);
	}
	.card img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
		background: #fff;
	}
	.meta {
		display: flex;
		flex-direction: column;
		padding: 10px 14px 12px;
	}
	.meta .day {
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--red);
	}
	.meta .who {
		font-weight: 600;
	}
	.empty {
		color: var(--muted);
	}

	/* resources */
	.res {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 24px;
	}
	.res ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 10px;
	}
	.res a {
		font-weight: 600;
	}
	.res span {
		display: block;
		font-size: 0.88rem;
		color: var(--muted);
	}

	footer {
		margin-top: 64px;
		border-top: 1px solid var(--line);
		padding: 24px 0 40px;
		font-size: 0.9rem;
		color: var(--muted);
	}
	footer p {
		margin: 0 0 6px;
	}

	/* detail dialog */
	dialog {
		border: none;
		border-radius: 20px;
		padding: 0;
		width: min(1000px, calc(100vw - 32px));
		max-height: calc(100vh - 32px);
		background: var(--bg);
		color: var(--ink);
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.6);
	}
	.detail {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		position: relative;
	}
	.detail img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		background: #fff;
	}
	.info {
		padding: 24px;
	}
	.info .day {
		color: var(--red);
		font-weight: 700;
		margin: 0;
	}
	.info dl {
		margin: 12px 0 18px;
	}
	.info dt {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--muted);
		margin-top: 10px;
	}
	.info dd {
		margin: 2px 0 0;
		font-size: 0.92rem;
	}
	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--line);
		background: var(--bg);
		color: var(--ink);
		cursor: pointer;
		font-size: 1rem;
	}

	@media (max-width: 760px) {
		.two,
		.detail {
			grid-template-columns: minmax(0, 1fr);
		}
		.hero {
			padding-top: 40px;
		}
	}
</style>
