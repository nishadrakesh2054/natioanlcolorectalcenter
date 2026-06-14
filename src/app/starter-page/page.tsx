import type { Metadata } from "next";
import Link from "next/link";
import PageTitle from "@/components/layout/PageTitle";

export const metadata: Metadata = {
  title: "Starter Page",
};

export default function StarterPage() {
  return (
    <>
      <PageTitle title="Starter Page" />
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>Est velit egestas dui id ornare arcu odio</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Visit the <Link href="/">home page</Link> or explore our{" "}
                <Link href="/services">services</Link> and{" "}
                <Link href="/contact">contact</Link> pages.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="icon-box">
                <i className="bi bi-heart-pulse"></i>
                <h4>Patient-first care</h4>
                <p>
                  Use this starter page as a template when adding new content sections to the
                  Medilab Next.js site.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
