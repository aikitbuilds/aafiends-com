import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://api.substack.com/feed/podcast/9963027.rss";

export default async function SubstackLatest() {
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
    
    const latestItems = items.slice(0, 4).map((item: any) => {
      // Strip HTML from description
      let desc = item.description || "";
      desc = desc.replace(/<[^>]*>?/gm, '');
      if (desc.length > 140) desc = desc.substring(0, 140) + '...';
      
      const enclosureUrl = item.enclosure && item.enclosure["@_url"] ? item.enclosure["@_url"] : null;
      
      // Parse pubDate
      const pubDate = new Date(item.pubDate);
      const dateStr = pubDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      
      return {
        title: item.title,
        link: item.link,
        date: dateStr,
        snippet: desc,
        enclosureUrl
      };
    });

    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {latestItems.map((item: any, i: number) => (
            <div key={i} className="flex flex-col p-5 bg-[#09090b] border border-[#27272a] rounded-2xl hover:border-[#a855f7]/50 transition-colors">
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">{item.date}</div>
              <h3 className="text-sm font-bold text-white mb-2 leading-tight">{item.title}</h3>
              <p className="text-xs text-neutral-400 line-clamp-3 mb-4 flex-grow">{item.snippet}</p>
              
              {item.enclosureUrl && (
                <div className="mb-4">
                  <audio controls preload="none" src={item.enclosureUrl} className="w-full h-8" />
                </div>
              )}
              
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-[#a855f7] uppercase tracking-widest hover:text-white mt-auto">
                Listen / Read &rarr;
              </a>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="https://aafiends.substack.com" target="_blank" rel="noopener noreferrer" className="text-xs font-black text-white hover:text-[#a855f7] uppercase tracking-widest">
            See all on Substack &rarr;
          </a>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-sm text-neutral-400 mb-4">Read the latest on Substack</p>
        <a href="https://aafiends.substack.com" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl bg-[#a855f7] text-black text-sm font-black tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:bg-[#9333ea]">
          Go to Publication &rarr;
        </a>
      </div>
    );
  }
}
