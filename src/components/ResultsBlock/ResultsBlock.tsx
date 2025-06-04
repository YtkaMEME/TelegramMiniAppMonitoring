"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/ResultsBlock.module.css";

type CalculationData = {
    sampleSize: number;
    targetPol: Record<string, number>;
    targetAge: Record<string, number>;
    targetArt: Record<string, number>;
};

const ResultsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<CalculationData | null>(null);

    useEffect(() => {
        fetch("/api/calculation_results")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            });
    }, []);

    if (loading || !data) {
        return (
            <div className={styles.loader}></div>
        );
    }

    return (
        <div className={styles.block}>
            <h3 className={styles.title}>Результаты расчёта</h3>

            <div className={styles.subBlock}>
                <label className={styles.label}>Объём выборки</label>
                <input type="text" className={styles.input} value={(data.sampleSize - 1).toString()} readOnly />
            </div>

            <div className={styles.subBlock}>
                <label className={styles.label}>Доли по полу</label>
                {Object.entries(data.targetPol).map(([key, value]) => (
                    <div key={key} className={styles.row}>
                        <input type="text" className={styles.input} value={key} readOnly />
                        <input type="text" className={styles.countInput} value={Math.ceil(value * data.sampleSize - 1).toString()} readOnly />
                    </div>
                ))}
            </div>

            <div className={styles.subBlock}>
                <label className={styles.label}>Доли по возрасту</label>
                {Object.entries(data.targetAge).map(([key, value]) => (
                    <div key={key} className={styles.row}>
                        <input type="text" className={styles.input} value={key} readOnly />
                        <input type="text" className={styles.countInput} value={Math.ceil(value * data.sampleSize - 1).toString()} readOnly />
                    </div>
                ))}
            </div>

            <div className={styles.subBlock}>
                <label className={styles.label}>Доли по арт-школам</label>
                {Object.entries(data.targetArt).map(([key, value]) => (
                    <div key={key} className={styles.row}>
                        <input type="text" className={styles.input} value={key} readOnly />
                        <input type="text" className={styles.countInput} value={Math.ceil(value * data.sampleSize - 1).toString()} readOnly />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsBlock;