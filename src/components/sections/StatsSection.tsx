import { siteStats } from "@/lib/stats";

export default function StatsSection() {
  return (
    <section id="stats" className="stats section light-background">
      <div className="container">
        <div className="row gy-4">
          {siteStats.map((stat) => (
            <div key={stat.id} className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
              <i className={stat.icon}></i>
              <div className="stats-item">
                <span
                  data-purecounter-start="0"
                  data-purecounter-end={stat.end}
                  data-purecounter-duration="1"
                  className="purecounter"
                ></span>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
