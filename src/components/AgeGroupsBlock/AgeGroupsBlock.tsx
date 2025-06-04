"use client";

import React from "react";
import styles from "@/styles/AgeGroupsBlock.module.css";

type AgeGroupsBlockProps = {
    ageGroups: { id: number, range: string, count: string }[];
    onAdd: () => void;
    onChange: (id: number, field: string, value: string) => void;
    onRemove: (id: number) => void;
};

const isMobile = typeof window !== 'undefined' && window.innerWidth < 480;

const AgeGroupsBlock: React.FC<AgeGroupsBlockProps> = ({ ageGroups, onAdd, onChange, onRemove }) => {
    return (
        <div className={styles.block}>
            <h3 className={styles.title}>Возрастные группы</h3>
            {ageGroups.map((group, index) => (
                <div key={group.id} className={styles.row}>
                    <input
                        className={styles.input}
                        placeholder="Возрастной диапазон (например, 18-25)"
                        value={group.range}
                        onChange={(e) => onChange(group.id, "range", e.target.value)}
                    />
                    <input
                        type={isMobile ? "text" : "number"}
                        className={styles.countInput} 
                        placeholder="Количество участников"
                        value={group.count}
                        onChange={(e) => onChange(group.id, "count", e.target.value)}
                    />
                    <button className={styles.removeBtn} onClick={() => onRemove(group.id)}>🗑</button>
                </div>
            ))}
            <button className={styles.addBtn} onClick={onAdd}>➕ Добавить {isMobile ? "" : "возрастную "}группу</button>
        </div>
    );
};

export default AgeGroupsBlock;
