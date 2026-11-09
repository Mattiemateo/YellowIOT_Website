// /llms.txt — compacte samenvatting voor AI-agents en LLM's (https://llmstxt.org).
import type { APIRoute } from 'astro';
import { SPONSOR_RAISED, SPONSOR_GOAL } from 'astro:env/server';
import { site, sponsors, tiers, crowdfunding } from '../data/site';
import { parts } from '../data/parts';

export const GET: APIRoute = () => {
  const u = site.url;
  const body = `# ${site.name} (FTC #${site.teamNumber})

> ${site.name} is een Nederlands FIRST Tech Challenge (FTC) roboticateam van ${site.members} jongeren van ${site.memberAge} jaar. De robot van seizoen 2026 heet ${site.robot}. Het team zoekt sponsors en nieuwe teamleden (vanaf ${site.minJoinAge} jaar). De site is in het Nederlands.

## Kernfeiten

- Teamnummer: ${site.teamNumber} (FIRST Tech Challenge)
- Robot seizoen 2026: ${site.robot}
- Teamleden: ${site.members}, alle ${site.memberAge} jaar
- Contact: ${site.email}
- Doneren: ${site.bunq}
- Sponsordoel dit seizoen: €${SPONSOR_GOAL.toLocaleString('nl-NL')}, waarvan €${SPONSOR_RAISED.toLocaleString('nl-NL')} opgehaald
- Laatste crowdfunding: €${crowdfunding.raised} van €${crowdfunding.goal} doel (${Math.round((crowdfunding.raised / crowdfunding.goal) * 100)}%), ${crowdfunding.supporters} supporters, in één avond
- Deelgenomen aan het FTC Premier Event in Eindhoven (teams uit 25+ landen)
- Huidige sponsors: ${sponsors.join(', ')}
- LinkedIn: ${site.linkedin}
- Instagram: ${site.instagram}

## Pagina's

- [Home en robot ${site.robot}](${u}/): wie we zijn, de robot interactief verkennen, team, portfolio
- [Sponsors](${u}/sponsors/): sponsorpakketten (${tiers.map((t) => t.name).join(', ')}), voortgang seizoensdoel, contactformulier, FAQ
- [Doe mee](${u}/doe-mee/): open rollen (social media & content, communicatie & partnerships, engineering portfolio) en aanmeldformulier
- [Ons verhaal: FTC Premier Event](${u}/bedankt/): wat de crowdfunding opleverde en hoe het event ging

## Onderdelen van ${site.robot}

${parts.map((p) => `- [${p.name}](${u}/porcupine/${p.slug}/): ${p.teaser}`).join('\n')}

## Optional

- [Engineering portfolio seizoen ${site.season} (PDF)](${u}/portfolio.pdf)
- [Sitemap](${u}/sitemap-index.xml)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
