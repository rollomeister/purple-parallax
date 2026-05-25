type ProjectSource = {
	title: string;
	subtitle: string;
	meta: string;
	production: string;
	role: string;
	link: string;
	links?: string[];
};

export type Project = ProjectSource & {
	embed: string | null;
	embeds: string[];
};

const getYouTubeEmbed = (url: string) => {
	try {
		const parsed = new URL(url);
		const shortId = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : null;
		const watchId = parsed.searchParams.get("v");
		const id = shortId || watchId;
		return id ? `https://www.youtube.com/embed/${id}` : null;
	} catch {
		return null;
	}
};

const getVimeoEmbed = (url: string) => {
	try {
		const parsed = new URL(url);
		const match = parsed.pathname.match(/\/(\d+)/);
		return match ? `https://player.vimeo.com/video/${match[1]}` : null;
	} catch {
		return null;
	}
};

const getFacebookEmbed = (url: string) => {
	try {
		const parsed = new URL(url);
		if (!parsed.hostname.includes("facebook.com")) {
			return null;
		}

		return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=1280`;
	} catch {
		return null;
	}
};

const getEmbedUrl = (link: string) => {
	if (link.includes("youtube.com") || link.includes("youtu.be")) {
		return getYouTubeEmbed(link);
	}

	if (link.includes("vimeo.com")) {
		return getVimeoEmbed(link);
	}

	if (link.includes("facebook.com")) {
		return getFacebookEmbed(link);
	}

	return null;
};

const projectSources: ProjectSource[] = [
	{
		title: "Papsid",
		subtitle: "Seasons 1-9",
		meta: "Estonian family TV series, 2022-present",
		production: "Ruudu Produtsendid",
		role: "Head costume designer",
		link: "https://www.youtube.com/watch?v=MywN9DJHdA8",
		links: [
			"https://www.youtube.com/watch?v=MywN9DJHdA8",
			"https://www.youtube.com/watch?v=JXtTtVna2RA",
			"https://www.youtube.com/watch?v=zPrjxfmOFrg",
			"https://www.youtube.com/watch?v=5nX6NZZq66E",
		],
	},
	{
		title: "The Agency",
		subtitle: "Season 1, episodes filmed in Estonia",
		meta: "United States drama series, 2024",
		production: "Smokehouse Pictures, Paramount Television Studios, Munchhausen Production",
		role: "Costume Office PA in Estonia",
		link: "https://www.youtube.com/watch?v=pAxMy31nffA",
	},
	{
		title: "Valetamisklubi",
		subtitle: "Season 1",
		meta: "Estonian TV series, 2024",
		production: "Kassikuld",
		role: "Head costume designer",
		link: "https://www.facebook.com/reel/257247664021024",
	},
	{
		title: "Uto",
		subtitle: "Season 1",
		meta: "Finnish TV series, 2024",
		production: "Lucy Loves Drama, Menufilmid",
		role: "Costume on set",
		link: "https://www.youtube.com/watch?v=fhqxzx3X6Lg",
	},
	{
		title: "Bullshit",
		subtitle: "TV mini-series",
		meta: "Danish TV series, 2024",
		production: "Nordisk Film Creative Alliance, Nafta Films",
		role: "Costume continuity",
		link: "https://www.youtube.com/watch?v=c8er-dgf63I",
	},
	{
		title: "Meliora",
		subtitle: "Short film",
		meta: "Estonian short film, 2023",
		production: "BFM School",
		role: "Costume designer",
		link: "https://www.youtube.com/watch?v=6ugsw36XGwM",
	},
	{
		title: "Soo",
		subtitle: "Feature film",
		meta: "Estonian period movie, 2022",
		production: "Taska Film, Kassikuld",
		role: "Head costume designer",
		link: "https://www.youtube.com/watch?v=AGKCqabtHrM",
	},
	{
		title: "Valguses ja Varjus",
		subtitle: "Season 2",
		meta: "Estonian TV series, 2022",
		production: "Kassikuld",
		role: "Costume designer",
		link: "https://www.youtube.com/watch?v=U6-G1uYClRQ",
	},
	{
		title: "Miehen Vaimo",
		subtitle: "Series credit",
		meta: "Finnish TV series, 2022",
		production: "Lucy Loves Drama, Munchhausen Production",
		role: "Costumer",
		link: "https://vimeo.com/875912440",
	},
	{
		title: "Kirsikivid",
		subtitle: "Music video",
		meta: "Reket artist music video, 2021",
		production: "Reket",
		role: "Costume designer",
		link: "https://www.youtube.com/watch?v=K1DMh87DAPY&t=1s",
	},
	{
		title: "Rosvopankki",
		subtitle: "Series credit",
		meta: "Finnish TV series, 2021",
		production: "Moskito Television, Stellar",
		role: "Costume shopper",
		link: "https://vimeo.com/793410788?fl=pl&fe=sh",
	},
	{
		title: "Tulejoonel",
		subtitle: "Season 1",
		meta: "Estonian TV series, 2020",
		production: "Kassikuld",
		role: "Costume designer",
		link: "https://www.youtube.com/watch?v=i5CW-fZ4C98",
	},
];

export const featuredProjects: Project[] = projectSources.map((project) => {
	const links = project.links ?? [project.link];
	const embeds = links.map(getEmbedUrl).filter((embed): embed is string => Boolean(embed));

	return {
		...project,
		embed: embeds[0] ?? null,
		embeds,
	};
});
