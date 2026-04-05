import React from 'react';
import styles from './Dashboard.module.css';
import { overviewStats, topProducts, topArticles, chartData } from '../../data/adminData';

const Overview: React.FC = () => {
  return (
    <div className={styles.dashboardBody}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Tổng quan</h1>
        <p className={styles.pageSubtitle}>Theo dõi hiệu suất Affiliate và hoạt động của trang web</p>
      </div>

      {/* Overview Stats */}
      <div className={styles.statsGrid}>
        {overviewStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <h3 className={styles.statTitle}>{stat.title}</h3>
              <div className={styles.statIconWrapper}>
                {stat.icon}
              </div>
            </div>
            <div className={styles.statContent}>
              <p className={`${styles.statValue} ${stat.highlight ? styles.highlight : ''}`}>
                {stat.value}
              </p>
              <p className={styles.statSubtitle}>
                {stat.trend > 0 ? (
                  <span className={styles.trendUp}>+{stat.trend}%</span>
                ) : stat.trend < 0 ? (
                  <span className={styles.trendDown}>{stat.trend}%</span>
                ) : null}
                {stat.trend !== 0 && ' '}
                {stat.trendLabel}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className={styles.chartSection}>
        <h2 className={styles.sectionTitle}>Biểu đồ Clicks & Doanh thu (30 Ngày)</h2>
        <div className={styles.chartPlaceholder}>
          {chartData.map((data, idx) => (
            <div key={idx} className={styles.barGroup}>
              <div className={styles.barClick} style={{ height: `${data.clicks}%` }}></div>
              <div className={styles.barRevenue} style={{ height: `${data.revenue}%` }}></div>
              <span className={styles.chartLabel}>{data.day}</span>
            </div>
          ))}
        </div>
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColorClick}></div>
            <span>Lượt Clicks</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColorRev}></div>
            <span>Doanh thu</span>
          </div>
        </div>
      </div>

      {/* Ranking Blocks */}
      <div className={styles.rankingGrid}>
        {/* Top Products */}
        <div className={styles.rankingCard}>
          <h2 className={styles.sectionTitle}>Top 5 Cây được Click nhiều nhất</h2>
          <div className={styles.rankingList}>
            {topProducts.map((product) => (
              <div key={product.id} className={styles.rankingItem}>
                <div className={styles.itemLeft}>
                  <span className={styles.rankNumber}>#{product.rank}</span>
                  <img src={product.imageUrl} alt={product.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{product.name}</span>
                    <span className={styles.itemDesc}>{product.category}</span>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.clickCount}>{product.clicks.toLocaleString()}</span>
                  <span className={styles.clickLabel}>clicks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Articles */}
        <div className={styles.rankingCard}>
          <h2 className={styles.sectionTitle}>Top 5 Bài viết kéo Traffic tốt nhất</h2>
          <div className={styles.rankingList}>
            {topArticles.map((article) => (
              <div key={article.id} className={styles.rankingItem}>
                <div className={styles.itemLeft}>
                  <span className={styles.rankNumber}>#{article.rank}</span>
                  <div className={`${styles.itemInfo} ${styles.articleItemInfo}`}>
                    <span className={styles.itemName}>{article.title}</span>
                    <span className={styles.itemDesc}>Bởi {article.author} • {article.views.toLocaleString()} lượt xem</span>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.clickCount}>{article.affiliateClicks.toLocaleString()}</span>
                  <span className={styles.clickLabel}>affiliate clicks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
