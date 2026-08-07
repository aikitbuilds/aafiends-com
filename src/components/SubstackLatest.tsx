import { XMLParser } from "fast-xml-parser";
import { ButtonPrimary, ButtonQuiet } from "@/components/design";

const FEED_URL = "https://api.substack.com/feed/podcast/9963027.rss";

type FeedItem = {
  title: string;
  link: string;
  date: string;
  snippet: string;
  enclosureUrl: string | null;
};

/**
 * The four most recent Substack episodes, rendered as an editorial list —
 * rebuilt August 2026 for the "Dawn Ledger" world (DESIGN.md).
 *
 * It used to be a two-by-two grid of rounded cards with a violet hover
 * border. Four cards of identical weight say nothing about which one to read
 * first; a dated list with a rule between entries does, and it matches the
 * blog index it sits next to. Dates stay in mono because they are
 * measurements; titles move to the display serif because they are arguments.
 */
/**
 * Fetch and parse the feed. The try/catch stays wrapped around the network
 * and parsing work only — building JSX inside it would put render errors
 * somewhere a try/catch can never actually catch them.
 */
async function loadLatest(): Promise<FeedItem[] | null> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch RSS");
    const xml = await res.text();

    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const jObj = parser.parse(xml);

    // Substack RSS has rss.channel.item (can be array or single object)
    let items = jObj?.rss?.channel?.item;
    if (!items) throw new Error("No items in feed");
    if (!Array.isArray(items)) items = [items];

    return items.slice(0, 4).map((item: Record<string, unknown>) => {
      // Strip HTML from description
      let desc = String(item.description ?? "");
      desc = desc.replace(/<[^>]*>?/gm, "");
      if (desc.length > 140) desc = desc.substring(0, 140) + "...";

      const enclosure = item.enclosure as Record<string, string> | undefined;
      const enclosureUrl = enclosure && enclosure["@_url"] ? enclosure["@_url"] : null;

      // Parse pubDate
      const pubDate = new Date(String(item.pubDate));
      const dateStr = pubDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        title: String(item.title ?? ""),
        link: String(item.link ?? ""),
        date: dateStr,
        snippet: desc,
        enclosureUrl,
      };
    });
  } catch {
    return null;
  }
}

export default async function SubstackLatest() {
  const latestItems = await loadLatest();

  if (!latestItems || latestItems.length === 0) {
    return (
      <div className="w-full">
        <p className="max-w-[52ch] text-[#b8b4a6]">
          The feed is not answering right now. The episodes are all still there.
        </p>
        <div className="mt-6">
          <ButtonPrimary href="https://aafiends.substack.com" external>
            Read the latest on Substack
          </ButtonPrimary>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border-t border-[#1d231d]">
        {latestItems.map((item, i) => (
          <article key={i} className="border-b border-[#1d231d] px-1 py-7">
            <h3 className="font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.18] text-[#f2efe6]">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline transition-colors hover:text-[#4cc07a]"
              >
                {item.title}
              </a>
            </h3>
            <p className="mt-2.5 max-w-[62ch] text-[15.5px] leading-relaxed text-[#b8b4a6]">
              {item.snippet}
            </p>
            <p className="font-measure mt-3.5 text-[13px] text-[#7d7a70]">{item.date}</p>
            {item.enclosureUrl && (
              <audio
                controls
                preload="none"
                src={item.enclosureUrl}
                className="mt-4 h-9 w-full max-w-[34rem]"
              />
            )}
          </article>
        ))}
      </div>
      <div className="mt-8">
        <ButtonQuiet href="https://aafiends.substack.com" external>
          Every episode on Substack
        </ButtonQuiet>
      </div>
    </div>
  );
}
