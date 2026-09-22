"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import { getAllBlogs } from "@/lib/getBlogs";

const BLOGS_PER_PAGE = 9;

function blogYear(createdAt) {
  if (!createdAt) return null;
  if (createdAt.seconds) return new Date(createdAt.seconds * 1000).getFullYear();
  if (createdAt instanceof Date) return createdAt.getFullYear();
  if (typeof createdAt === "number") return new Date(createdAt).getFullYear();
  return null;
}

function formatDate(value) {
  if (!value) return "";
  if (typeof value === "object" && value.seconds) {
    return moment(new Date(value.seconds * 1000)).format("MMMM D, YYYY");
  }
  return moment(value).format("MMMM D, YYYY");
}

function getSlug(blog) {
  const customURL = blog?.customURL || blog?.data?.customURL;
  if (customURL?.length > 3) return customURL;
  const title = blog?.title || blog?.data?.title || "";
  return title
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .join("-");
}

function previewText(blog) {
  const content = blog?.content || blog?.data?.content || "";
  if (!content) return "";
  const text = content
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > 160 ? `${text.slice(0, 160)}...` : text;
}

export default function ResourcesLibrary() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const data = await getAllBlogs();
      const filtered = data.filter((blog) => {
        if (blog.isPublished !== true) return false;
        const year = blogYear(blog.created_at);
        return year != null && year >= 2025;
      });
      if (!cancelled) {
        setBlogs(filtered);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);
  const pageBlogs = blogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );
  const countLabel = loading ? "…" : String(blogs.length);

  return (
    <>
      <section className="phero">
        <span className="aura aura-a" />
        <span className="aura aura-b" />
        <span className="mesh" />
        <div className="phero-in">
          <div className="inner">
            <span className="eyebrow">Resources</span>
            <h1>The Future of Provider Ops, Decoded by CredFlow</h1>
            <p className="lede">
              Explore field-tested strategies on provider onboarding, revenue acceleration, workflow automation, and the AI-powered tools reshaping healthcare operations.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary btn-lg" href="#library">
                <span className="wv"><i /><i /></span>
                <span className="lbl">Browse the library</span>
              </a>
            </div>
          </div>
          <div className="phero-art">
            <div className="panel">
              <div className="panel-top">
                <span className="lights"><i /><i /><i /></span>
                <span>Resource library</span>
                <span className="tag-live"><i /> {countLabel} ARTICLES</span>
              </div>
              <div className="feed">
                <div className="fitem">
                  <span className="ico"><svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 016.5 3H19v14H6.5A2.5 2.5 0 004 19.5z" /><path d="M4 19.5A2.5 2.5 0 016.5 17H19v4H6.5A2.5 2.5 0 014 19.5z" /></svg></span>
                  <span><h4>Credentialing fundamentals</h4><small>Terms, delegated models, specialist roles</small></span>
                  <span className="pill pill-run">Insight</span>
                </div>
                <div className="fitem">
                  <span className="ico"><svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></span>
                  <span><h4>Payer &amp; provider enrollment</h4><small>Medicare, Medicaid, CAQH, guides</small></span>
                  <span className="pill pill-run">Insight</span>
                </div>
                <div className="fitem">
                  <span className="ico"><svg viewBox="0 0 24 24"><path d="M4 20V9M10 20V4M16 20v-7M22 20V11" /></svg></span>
                  <span><h4>Choosing software</h4><small>What to compare before you buy</small></span>
                  <span className="pill pill-run">Insight</span>
                </div>
              </div>
              <div className="panel-foot">
                <span className="eq"><i /><i /><i /><i /><i /></span>
                <p><b>Written by the team</b> &middot; updated as the rules change</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="library">
        <div className="head rev in">
          <span className="eyebrow">Library</span>
          <h2>{loading ? "Loading resources" : `${blogs.length} Resources found`}</h2>
          <p className="lede">
            Practical guides on credentialing, payer enrollment, and the operations behind getting providers billable.
          </p>
        </div>

        {!loading && blogs.length === 0 && (
          <p className="lede" style={{ textAlign: "center" }}>
            No resources available yet. Check back soon.
          </p>
        )}

        {pageBlogs.length > 0 && (
          <div className="rgrid">
            {pageBlogs.map((blog) => {
              const title = blog.title || blog.data?.title || "Untitled";
              const date = formatDate(blog.created_at);
              return (
                <Link
                  key={blog.id || getSlug(blog)}
                  className="rcard rev in"
                  href={`/resources/info/${getSlug(blog)}`}
                  data-cta-id="resources-article-card"
                  data-cta-location="resources-grid"
                >
                  <span className="meta">
                    <span className="eyebrow">Insight</span>
                    {date ? <span>{date}</span> : null}
                  </span>
                  <h3>{title}</h3>
                  {previewText(blog) ? <p>{previewText(blog)}</p> : <p />}
                  <span className="tlink">
                    Read the guide
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: "var(--s6)" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"} btn-sm`}
                onClick={() => {
                  setCurrentPage(i + 1);
                  const library = document.getElementById("library");
                  if (library) library.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="lbl">{i + 1}</span>
              </button>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mini-cta rev in">
          <div>
            <span className="eyebrow">Talk it through</span>
            <h2>Reading up on credentialing? Bring us the hard part.</h2>
            <p>A specialist reviews your payer mix and walks through where your enrollments actually stall.</p>
          </div>
          <Link className="btn btn-primary btn-lg" href="/demo">
            <span className="wv"><i /><i /></span>
            <span className="lbl">Talk to a specialist</span>
          </Link>
        </div>
      </section>
    </>
  );
}
