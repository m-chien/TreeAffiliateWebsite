import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./AlternativeSuggestions.css";

export interface Alternative {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
}

interface AlternativeSuggestionsProps {
  title?: string;
  description?: string;
  alternatives: Alternative[];
}

const AlternativeSuggestions = ({
  title = "Gợi Ý Thay Thế",
  description = "Không ưng ý 2 loại cây trên? Tham khảo thêm các dòng cây trồng trong nhà vô cùng dễ chăm sóc khác:",
  alternatives,
}: AlternativeSuggestionsProps) => {
  return (
    <section className="comparison-section-dark text-center">
      <div className="comparison-alternatives">
        <h2 className="font-serif">{title}</h2>
        <p>{description}</p>

        {/* Swiper Carousel */}
        <div className="alternatives-carousel-wrapper">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            loop={alternatives.length > 1}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="alternatives-swiper"
          >
            {alternatives.map((alt) => (
              <SwiperSlide key={alt.id}>
                <div className="alt-card">
                  <div className="alt-image">
                    <img src={alt.image} alt={alt.name} />
                  </div>
                  <div className="alt-info">
                    <h4>{alt.name}</h4>
                    <span className="price">{alt.price}</span>
                    <a
                      href={alt.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="alt-btn"
                    >
                      Xem giá tốt nhất
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="swiper-button-prev-custom"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="swiper-button-next-custom"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AlternativeSuggestions;
