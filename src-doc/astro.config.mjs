import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'DamFit Documentation',
			social: {
				github: 'https://github.com/OregonStateUniversity/osu-fsf',
			},
			sidebar: [
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Architecture',
					autogenerate: { directory: 'arch' },
				},
				{
					label: 'Documents',
					autogenerate: { directory: 'docs' },
				}
			],
		}),
	],
});
