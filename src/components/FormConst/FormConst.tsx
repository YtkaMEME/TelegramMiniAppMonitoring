"use client";

import React from "react";
import styles from "@/styles/FormConst.module.css";

type Props = {
    menCount: string;
    womenCount: string;
    setMenCount: (value: string) => void;
    setWomenCount: (value: string) => void;
};

const FormConst: React.FC<Props> = ({ menCount, womenCount, setMenCount, setWomenCount }) => {
    return (
        <form className={styles.formConst}>
            <div className={styles.block}>
                <label className={styles.label}>Количество мужчин</label>
                <input
                    type="number"
                    className={styles.input}
                    placeholder="Введите количество"
                    value={menCount}
                    onChange={(e) => setMenCount(e.target.value)}
                />
            </div>

            <div className={styles.block}>
                <label className={styles.label}>Количество женщин</label>
                <input
                    type="number"
                    className={styles.input}
                    placeholder="Введите количество"
                    value={womenCount}
                    onChange={(e) => setWomenCount(e.target.value)}
                />
            </div>
        </form>
    );
};

export default FormConst;
