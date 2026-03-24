import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
}

const FAQItem = ({ question, answer, isOpen, onToggle, theme }: FAQItemProps) => {
  return (
    <div className={`${styles.faqItem} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.faqQuestion} onClick={onToggle}>
        <h4 className={styles.questionText}>{question}</h4>
        <span className={styles.faqIcon} style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          {isOpen ? "+" : "+"}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.faqAnswer}
          >
            <div className={styles.answerContent}>
              <p className={styles.answerText}>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FAQProps {
  items: { question: string; answer: string }[];
  title?: string;
  theme?: 'light' | 'dark';
}

const FAQ = ({ items, title, theme = 'light' }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${styles.faqWrapper} ${theme === 'dark' ? styles.dark : styles.light}`}>
      {title && <h2 className={styles.faqTitle}>{title}</h2>}
      <div className={styles.accordion}>
        {items.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
