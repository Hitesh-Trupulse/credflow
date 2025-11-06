"use client";

import { useEffect, useState } from "react";
import parse from "html-react-parser";
import moment from "moment";

export default function BlogContent({ post }) {
  const [headings, setHeadings] = useState([]);
  const [parsedHTML, setParsedHTML] = useState(null);

  const content = post?.data?.content || "";

  useEffect(() => {
    if (typeof window !== "undefined" && content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const headingEls = [...doc.querySelectorAll("h1,h2, h3, h4, h5, h6")];

      const norm = (s = "") =>
        s
          .replace(/\u00a0/g, " ")
          .replace(/\s+/g, " ")
          .trim();

      const extracted = [];
      headingEls.forEach((el) => {
        const text = norm(el.textContent);
        if (!text) return; // 🚫 skip <hX><br></hX> etc.

        // stable slug id from text (fallback if empty after slugging)
        const slug =
          text
            .toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/(^-|-$)/g, "") || `heading-${extracted.length}`;
        el.setAttribute("id", slug);

        // pick the first meaningful sibling (not another heading, not empty)
        let sib = el.nextElementSibling;
        while (sib && /^H[2-6]$/.test(sib.tagName))
          sib = sib.nextElementSibling;

        const sibText = sib ? norm(sib.textContent) : "";
        
        // Truncate to ~80 chars, but end at word boundary with ellipsis
        let preview = "";
        if (sibText) {
          if (sibText.length <= 80) {
            preview = sibText;
          } else {
            // Find the last word boundary before 80 chars
            const truncated = sibText.slice(0, 80);
            const lastSpace = truncated.lastIndexOf(" ");
            // Use word boundary if it's reasonable (not too close to start)
            const cutoff = lastSpace > 40 ? lastSpace : 80;
            preview = truncated.slice(0, cutoff) + "...";
          }
        }

        extracted.push({ id: slug, text, preview });
      });

      setHeadings(extracted);
      setParsedHTML(doc.body.innerHTML);
    }
  }, [content]);

  return (
    <section className="bg-black max-w-7xl w-[90vw] mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
        {/* Sidebar Index */}
        <aside className="md:col-span-2 border-r border-[#454545] pr-4 space-y-6 sticky top-24 h-max hidden md:block">
          <h3 className="text-lg font-semibold tracking-wide mb-2 text-white">
            On this page
          </h3>
          <ul className="space-y-4 list-none">
            {headings
              .filter((h) => h.text && h.text.trim())
              .map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className="block text-sm font-medium text-gray-300 hover:text-[#5063C6] transition-colors"
                  >
                    {h.text}
                  </a>
                  {h.preview ? (
                    <p className="text-xs text-gray-500 mt-1">{h.preview}</p>
                  ) : null}
                </li>
              ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-6">
          {/* Featured Box Section */}
          {post?.data?.featured && (
            <div className="bg-gradient-to-tr from-[#5063C6]/10 to-[#B71CD2]/10 border border-[#454545] p-6 rounded-xl shadow mb-8 flex flex-col md:flex-row items-center gap-6">
              <img
                src={post?.data?.featured_image || "/featured.png"}
                alt="Featured"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-[#B71CD2] font-bold mb-1">
                  {post.data.featured_title || "Featured"}
                </h4>
                <p className="text-base text-gray-300">
                  {post.data.featured_description || ""}
                </p>
              </div>
            </div>
          )}
          {/* Featured image/cover inserted at the top of content */}
          {post?.data?.cover_image && (
            <div className="mb-10">
              <img
                src={post.data.cover_image}
                alt={post?.data?.altTag || "Blog cover"}
                className="rounded-xl w-full aspect-video object-cover my-10 mx-auto shadow-2xl border border-[#454545]"
              />
            </div>
          )}
          {/* The Blog Main HTML Content */}
          <div className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-white 
            prose-p:text-gray-300 
            prose-a:text-[#5063C6] 
            prose-strong:text-white 
            prose-code:text-[#B71CD2] 
            prose-pre:bg-black prose-pre:border prose-pre:border-[#454545] prose-pre:text-gray-300
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300
            prose-blockquote:text-gray-300 prose-blockquote:border-gray-600
            prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-h5:text-white prose-h6:text-white
            prose-em:text-gray-300
            prose-hr:border-gray-600
            [&_*]:text-gray-300 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_h5]:text-white [&_h6]:text-white
            [&_p]:text-gray-300 [&_span]:text-gray-300 [&_div]:text-gray-300
            [&_strong]:text-white [&_b]:text-white
            [&_a]:text-[#5063C6] [&_a:hover]:text-[#B71CD2]
            [&_code]:text-[#B71CD2] [&_pre]:text-gray-300
            [&_ul]:text-gray-300 [&_ol]:text-gray-300 [&_li]:text-gray-300
            [&_blockquote]:text-gray-300">
            {parse(parsedHTML || "")}
          </div>
        </div>
      </div>
    </section>
  );
}
