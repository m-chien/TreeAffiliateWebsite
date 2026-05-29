import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  XCircle,
  Check,
  Sun,
  Activity,
  Wind,
  Heart,
  Shield,
  ShoppingCart,
  Award,
  Leaf,
  Sprout,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import ReviewSection from "../components/ReviewSection";
import "./ComparisonPage.css";
import CareSteps from "../components/CareSteps";
import FAQ from "../components/FAQ";
import AlternativeSuggestions from "../components/AlternativeSuggestions";
import { mockAlternatives } from "../data/plantData";
import {
  fetchAllCayCanh,
  fetchPlantForComparison,
  type CayCanhDTO,
  type PlantForComparison,
} from "../services/cayCanhService";

/* ============================================================
   ComparisonPage – trang so sánh cây cảnh
   Dữ liệu được fetch từ backend: GET /api/v1/cay-canh
   ============================================================ */
const ComparisonPage = () => {
  // ---------- State: danh sách cây (dropdown) ----------
  const [plantList, setPlantList] = useState<CayCanhDTO[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // ---------- State: cây đang chọn ----------
  const [plant1Id, setPlant1Id] = useState<string>("");
  const [plant2Id, setPlant2Id] = useState<string>("");

  // ---------- State: chi tiết cây so sánh ----------
  const [plant1, setPlant1] = useState<PlantForComparison | null>(null);
  const [plant2, setPlant2] = useState<PlantForComparison | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // ---------- Scroll to top ----------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------- Fetch danh sách cây ----------
  useEffect(() => {
    const loadPlantList = async () => {
      setListLoading(true);
      setListError(null);
      try {
        const plants = await fetchAllCayCanh(0, 100);
        if (plants.length === 0) {
          setListError("Không có dữ liệu cây cảnh. Vui lòng thêm cây vào hệ thống.");
          setListLoading(false);
          return;
        }
        setPlantList(plants);
        // Đặt default: cây 1 và cây 2 khác nhau
        setPlant1Id(String(plants[0].id));
        setPlant2Id(String(plants[plants.length > 1 ? 1 : 0].id));
      } catch {
        setListError("Không thể kết nối đến server. Kiểm tra backend đang chạy tại port 8080.");
      } finally {
        setListLoading(false);
      }
    };
    loadPlantList();
  }, []);

  // ---------- Fetch chi tiết khi thay đổi selection ----------
  useEffect(() => {
    if (!plant1Id) return;
    const loadPlant1 = async () => {
      setDetailLoading(true);
      const p = await fetchPlantForComparison(Number(plant1Id));
      setPlant1(p);
      setDetailLoading(false);
    };
    loadPlant1();
  }, [plant1Id]);

  useEffect(() => {
    if (!plant2Id) return;
    const loadPlant2 = async () => {
      setDetailLoading(true);
      const p = await fetchPlantForComparison(Number(plant2Id));
      setPlant2(p);
      setDetailLoading(false);
    };
    loadPlant2();
  }, [plant2Id]);

  // ---------- Logic xác định cây "tốt hơn" ----------
  const isP1Better =
    plant1 &&
    plant2 &&
    (plant1.care_difficulty < plant2.care_difficulty ||
      plant1.air_purifying > plant2.air_purifying);
  const isP2Better = plant1 && plant2 && !isP1Better;

  // ---------- Render helpers ----------
  const renderStars = (rating: number) => (
    <div className="comparison__stars">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "#ffc107" : "#e0e0e0"}
          color={i < rating ? "#ffc107" : "#e0e0e0"}
        />
      ))}
    </div>
  );

  const renderAirPurifying = (count: number) => (
    <div className="flex justify-center gap-1" style={{ display: "flex", gap: "4px" }}>
      {[...Array(Math.min(count, 5))].map((_, i) => (
        <div
          key={i}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={12} color="#ffffff" strokeWidth={3} />
        </div>
      ))}
    </div>
  );

  const renderPetFriendly = (isFriendly: boolean) =>
    isFriendly ? (
      <div className="comparison__status comparison__status--safe">
        <CheckCircle size={16} /> An toàn
      </div>
    ) : (
      <div className="comparison__status comparison__status--danger">
        <XCircle size={16} /> Độc hại
      </div>
    );

  // ---------- Vine SVG helper ----------
  const VineTopLeft = () => (
    <motion.svg
      className="vine-decor vine-top-left"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <motion.path d="M-10,110 C20,70 -10,20 50,-10" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M15,55 C25,45 35,50 30,65 C20,65 10,60 15,55 Z" fill="#4CAF50" opacity="0.8" />
      <path d="M5,25 C20,15 25,25 20,35 C10,40 0,30 5,25 Z" fill="#2E7D32" opacity="0.9" />
      <path d="M30,-5 C45,-10 50,0 40,10 C25,15 20,5 30,-5 Z" fill="#81C784" opacity="0.9" />
    </motion.svg>
  );

  const VineBottomRight = () => (
    <motion.svg
      className="vine-decor vine-bottom-right"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.7 }}
    >
      <motion.path d="M110,-10 C70,30 110,80 50,110" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M85,45 C75,55 65,50 70,35 C80,35 90,40 85,45 Z" fill="#4CAF50" opacity="0.8" />
      <path d="M95,75 C80,85 75,75 80,65 C90,60 100,70 95,75 Z" fill="#2E7D32" opacity="0.9" />
      <path d="M70,105 C55,110 50,100 60,90 C75,85 80,95 70,105 Z" fill="#81C784" opacity="0.9" />
    </motion.svg>
  );

  // ===============================================================
  // RENDER
  // ===============================================================
  const mappedAlternatives = plantList
    .filter((p) => String(p.id) !== plant1Id && String(p.id) !== plant2Id)
    .slice(0, 5)
    .map((p) => ({
      id: String(p.id),
      name: p.tenCay,
      price: p.giaThamKhao || (p.gia ? `${p.gia.toLocaleString("vi-VN")}₫` : "Liên hệ"),
      image: p.anh || "/images/main-plant.png",
      link: "#",
    }));

  return (
    <div className="comparison-page">
      {/* Background decoration */}
      <div className="global-artistic-background">
        <Leaf className="decor-leaf leaf-1" size={120} />
        <Leaf className="decor-leaf leaf-2" size={80} />
        <Sprout className="decor-leaf leaf-3" size={100} />
        <Leaf className="decor-leaf leaf-4" size={60} />
        <Leaf className="decor-leaf leaf-5" size={110} />
        <Sprout className="decor-leaf leaf-6" size={70} />
        <Leaf className="decor-leaf leaf-7" size={90} />
        <Leaf className="decor-leaf leaf-8" size={50} />
        <Leaf className="decor-leaf leaf-9" size={130} />
        <Sprout className="decor-leaf leaf-10" size={85} />
        <Leaf className="decor-leaf leaf-11" size={95} />
        <Leaf className="decor-leaf leaf-12" size={75} />
        <Sprout className="decor-leaf leaf-13" size={105} />
        <Leaf className="decor-leaf leaf-14" size={55} />
        <Leaf className="decor-leaf leaf-15" size={115} />
      </div>

      {/* Hero Section */}
      <motion.section
        className="comparison-hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif">Bàn Cân Thực Vật</h1>
        <p>
          Phân vân không biết nên chọn cây nào cho góc làm việc? Hãy sử dụng
          công cụ so sánh trực quan dưới đây để tìm ra người bạn xanh mát lý
          tưởng nhất dành riêng cho bạn.
        </p>
      </motion.section>

      {/* Interactive Tool Section */}
      <section className="comparison-interactive-section">
        <motion.div
          className="comparison-selectors"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <VineTopLeft />

          {/* ---- Loading / Error State cho danh sách ---- */}
          {listLoading ? (
            <div className="comparison-loading-state">
              <Loader2 size={32} className="spin-icon" style={{ color: "#2E7D32" }} />
              <p style={{ color: "#555", marginTop: 8 }}>Đang tải danh sách cây cảnh...</p>
            </div>
          ) : listError ? (
            <div className="comparison-error-state">
              <AlertTriangle size={32} style={{ color: "#e57373" }} />
              <p style={{ color: "#c62828", marginTop: 8 }}>{listError}</p>
              <button
                className="btn-retry"
                onClick={() => window.location.reload()}
                style={{
                  marginTop: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 16px",
                  background: "#2E7D32",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                <RefreshCw size={14} /> Thử lại
              </button>
            </div>
          ) : (
            <>
              {/* Selector cây 1 */}
              <div className="selector-group">
                <label>Cây số 1</label>
                <select
                  value={plant1Id}
                  onChange={(e) => setPlant1Id(e.target.value)}
                  className="plant-select"
                  id="select-plant-1"
                >
                  {plantList.map((p) => (
                    <option key={p.id} value={String(p.id)} disabled={String(p.id) === plant2Id}>
                      {p.tenCay}
                    </option>
                  ))}
                </select>
              </div>

              <div className="selector-vs">
                <span className="vs-circle">VS</span>
              </div>

              {/* Selector cây 2 */}
              <div className="selector-group">
                <label>Cây số 2</label>
                <select
                  value={plant2Id}
                  onChange={(e) => setPlant2Id(e.target.value)}
                  className="plant-select"
                  id="select-plant-2"
                >
                  {plantList.map((p) => (
                    <option key={p.id} value={String(p.id)} disabled={String(p.id) === plant1Id}>
                      {p.tenCay}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <VineBottomRight />
        </motion.div>

        {/* ---- Bảng so sánh ---- */}
        {detailLoading ? (
          <motion.div
            className="comparison-loading-state"
            style={{ padding: "3rem", textAlign: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 size={40} className="spin-icon" style={{ color: "#2E7D32" }} />
            <p style={{ color: "#555", marginTop: 12 }}>Đang tải thông tin cây...</p>
          </motion.div>
        ) : (
          plant1 && plant2 && (
            <motion.div
              className="comparison-table-wrapper"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="comparison-table">
                {/* Row 1: Ảnh & Tên */}
                <div className="comparison__cell comparison__cell--feature comparison__cell--first-row">
                  <h3>Tiêu chí</h3>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--first-row ${isP1Better ? "highlight" : ""}`}>
                  {isP1Better && (
                    <div className="best-choice-badge">
                      <Award size={12} className="inline-icon" /> Lựa Chọn Tốt Nhất
                    </div>
                  )}
                  <div className="comparison__image-wrapper">
                    <img src={plant1.image} alt={plant1.name} />
                  </div>
                  <h4 className="comparison__plant-name">{plant1.name}</h4>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--first-row ${isP2Better ? "highlight" : ""}`}>
                  {isP2Better && (
                    <div className="best-choice-badge">
                      <Award size={12} className="inline-icon" /> Lựa Chọn Tốt Nhất
                    </div>
                  )}
                  <div className="comparison__image-wrapper">
                    <img src={plant2.image} alt={plant2.name} />
                  </div>
                  <h4 className="comparison__plant-name">{plant2.name}</h4>
                </div>

                {/* Row 2: Độ khó chăm sóc */}
                <div className="comparison__cell comparison__cell--feature comparison__cell--alt">
                  <div className="criteria-header">
                    <Heart size={18} className="criteria-icon" />
                    <span>Độ khó chăm sóc</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--alt ${isP1Better ? "highlight" : ""}`}>
                  {renderStars(plant1.care_difficulty)}
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--alt ${isP2Better ? "highlight" : ""}`}>
                  {renderStars(plant2.care_difficulty)}
                </div>

                {/* Row 3: Lọc không khí */}
                <div className="comparison__cell comparison__cell--feature">
                  <div className="criteria-header">
                    <Wind size={18} className="criteria-icon" />
                    <span>Lọc không khí</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--data ${isP1Better ? "highlight" : ""}`}>
                  {renderAirPurifying(plant1.air_purifying)}
                </div>
                <div className={`comparison__cell comparison__cell--data ${isP2Better ? "highlight" : ""}`}>
                  {renderAirPurifying(plant2.air_purifying)}
                </div>

                {/* Row 4: Ánh sáng */}
                <div className="comparison__cell comparison__cell--feature comparison__cell--alt">
                  <div className="criteria-header">
                    <Sun size={18} className="criteria-icon" />
                    <span>Ánh sáng cần thiết</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--alt ${isP1Better ? "highlight" : ""}`}>
                  <span className="light-tag">{plant1.light_requirement}</span>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--alt ${isP2Better ? "highlight" : ""}`}>
                  <span className="light-tag">{plant2.light_requirement}</span>
                </div>

                {/* Row 5: Phù hợp thú cưng */}
                <div className="comparison__cell comparison__cell--feature">
                  <div className="criteria-header">
                    <Shield size={18} className="criteria-icon" />
                    <span>An toàn thú cưng</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--data ${isP1Better ? "highlight" : ""}`}>
                  {renderPetFriendly(plant1.pet_friendly)}
                </div>
                <div className={`comparison__cell comparison__cell--data ${isP2Better ? "highlight" : ""}`}>
                  {renderPetFriendly(plant2.pet_friendly)}
                </div>

                {/* Row 6: Giá */}
                <div className="comparison__cell comparison__cell--feature comparison__cell--alt">
                  <div className="criteria-header">
                    <Activity size={18} className="criteria-icon" />
                    <span>Giá tham khảo</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--price comparison__cell--data comparison__cell--alt ${isP1Better ? "highlight" : ""}`}>
                  {plant1.price}
                </div>
                <div className={`comparison__cell comparison__cell--price comparison__cell--data comparison__cell--alt ${isP2Better ? "highlight" : ""}`}>
                  {plant2.price}
                </div>

                {/* Row 7: Link mua hàng */}
                <div className="comparison__cell comparison__cell--feature comparison__cell--last-row">
                  <div className="criteria-header">
                    <ShoppingCart size={18} className="criteria-icon" />
                    <span>Nơi Bán</span>
                  </div>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--last-row ${isP1Better ? "highlight" : ""}`}>
                  <a
                    href={plant1.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-cta ${isP1Better ? "highlight" : ""}`}
                    id={`affiliate-link-plant-1-${plant1.id}`}
                  >
                    Xem giá tốt nhất
                  </a>
                </div>
                <div className={`comparison__cell comparison__cell--data comparison__cell--last-row ${isP2Better ? "highlight" : ""}`}>
                  <a
                    href={plant2.affiliate_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-cta ${isP2Better ? "highlight" : ""}`}
                    id={`affiliate-link-plant-2-${plant2.id}`}
                  >
                    Xem giá tốt nhất
                  </a>
                </div>
              </div>
            </motion.div>
          )
        )}
      </section>

      {/* Gợi Ý Thay Thế */}
      <AlternativeSuggestions alternatives={mappedAlternatives.length > 0 ? mappedAlternatives : mockAlternatives} />

      {/* Hướng dẫn chăm sóc */}
      <CareSteps />

      {/* FAQ */}
      <section className="comparison-section-dark">
        <FAQ
          theme="dark"
          title="Câu Hỏi Thường Gặp (FAQ)"
          items={[
            {
              question: `Trồng ${plant1?.name || "cây này"} và ${plant2?.name || "cây kia"} chung một chậu được không?`,
              answer:
                "Thông thường, mỗi loại cây có nhu cầu nước và ánh sáng khác nhau. Việc trồng chung một chậu có thể làm rễ tranh giành chất dinh dưỡng hoặc dễ gây úng rễ nếu nhu cầu tưới tiêu không đồng đều. Tốt nhất là nên trồng riêng rẽ để cây phát triển khỏe mạnh nhất.",
            },
            {
              question: "Cây nào lọc bụi mịn tốt hơn?",
              answer:
                "Hầu hết các dòng cây trồng trong nhà (như Lưỡi Hổ, Lan Ý, Trầu Bà) đều có khả năng hút khí độc (formaldehyde, benzene) cực tốt theo nghiên cứu của NASA. Tuy nhiên, để lọc bụi mịn PM2.5 thì máy lọc không khí chuyên dụng mới là lựa chọn chính xác nhất. Cây xanh chỉ hỗ trợ thanh lọc không khí cơ bản.",
            },
            {
              question:
                "Nhà có thú cưng (chó, mèo) thì tuyệt đối phải tránh cây nào?",
              answer:
                "Bạn nên tránh trồng Monstera, Vạn Niên Thanh, và Kim Tiền vì lá của chúng có chứa tinh thể calcium oxalate có thể gây ngứa miệng, nôn mửa cho chó mèo nếu ăn phải. Những cây an toàn là Lan Ý (mức độ độc thấp), Cọ cảnh, hoặc Cỏ Lan Chi.",
            },
          ]}
        />
      </section>

      {/* Review Section */}
      <div
        style={{
          backgroundColor: "#ffffff",
          paddingTop: "4rem",
          paddingBottom: "4rem",
        }}
      >
        <ReviewSection />
      </div>
    </div>
  );
};

export default ComparisonPage;
