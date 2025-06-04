"use client";

import React from "react";
import styles from "@/styles/ArtSchoolsBlock.module.css";

type ArtSchoolsBlockProps = {
    artSchools: { id: number, name: string, count: string }[];
    onAdd: () => void;
    onChange: (id: number, field: string, value: string) => void;
    onRemove: (id: number) => void;
};
const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;

const ArtSchoolsBlock: React.FC<ArtSchoolsBlockProps> = ({ artSchools, onAdd, onChange, onRemove }) => {
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>Арт-школы</h3>
            {artSchools.map((school, index) => (
                <div key={school.id} className={styles.row}>
                    <input
                        className={styles.input}
                        placeholder="Название арт-школы"
                        value={school.name}
                        onChange={(e) => onChange(school.id, "name", e.target.value)}
                    />
                    <input
                        type={isMobile ? "text" : "number"}
                        className={styles.countInput}  // Вот тут главное изменение
                        placeholder="Количество"
                        value={school.count}
                        onChange={(e) => onChange(school.id, "count", e.target.value)}
                    />
                    <button className={styles.removeBtn} onClick={() => onRemove(school.id)}>🗑</button>
                </div>
            ))}
            <button className={styles.addBtn} onClick={onAdd}>➕ Добавить арт-школу</button>
        </div>
    );
};

export default ArtSchoolsBlock;
