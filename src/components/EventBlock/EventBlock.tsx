"use client";

import React, { useState } from "react";
import styles from "@/styles/EventBlock.module.css";
type EventBlockProps = {
    index: number;
    onRemove: () => void;
};


const ratingCriteria = [
    "Оффлайн презентации",
    "Количество опубликованных медиапродуктов",
    "Выступление в СМИ",
];


const EventBlock: React.FC<EventBlockProps> = ({ index, onRemove }) => {
    const [selectedCriterion, setSelectedCriterion] = useState<string>(ratingCriteria[0]);
    const [mediaLinks, setMediaLinks] = useState<string[]>([""]);
    const [folderLink, setFolderLink] = useState("");

    const removeLink = (index: number) => {
        setMediaLinks(mediaLinks.filter((_: string, i: number) => i !== index));
    };

    const handleLinkChange = (value: string, index: number) => {
        const newLinks = [...mediaLinks];
        newLinks[index] = value;
        setMediaLinks(newLinks);
    };

    const addLink = () => {
        setMediaLinks([...mediaLinks, ""]);
    };

    const renderFields = () => {
        switch (selectedCriterion) {
            case "Оффлайн презентации":
                return (
                    <>
                        <label className={styles.label}>Событие (описание)</label>
                        <textarea className={styles.textarea} />

                        <label className={styles.label}>Когда</label>
                        <input type="date" className={styles.input} />

                        <label className={styles.label}>Количество человек</label>
                        <input type="number" className={styles.input} />

                        <label className={styles.label}>Результаты</label>
                        <textarea className={styles.textarea} />

                        <label className={styles.label}>Фото (ссылка или описание)</label>
                        <input className={styles.input} />
                    </>
                );

            case "Выступление в СМИ":
                return (
                    <>
                        <label className={styles.label}>Событие (описание)</label>
                        <textarea className={styles.textarea} />

                        <label className={styles.label}>Когда</label>
                        <input type="date" className={styles.input} />

                        <label className={styles.label}>
                            Ссылка на материал, опубликованный в СМИ или соцсетях
                        </label>
                        <input type="url" className={styles.input} />

                        <label className={styles.label}>Фото</label>
                        <input className={styles.input} />
                    </>
                );

            case "Количество опубликованных медиапродуктов":
                return (
                    <>
                        <label className={styles.label}>Ссылки на медиапродукты</label>
                        {mediaLinks.map((link, i) => (
                            <div key={i} className={styles.linkRow}>
                                <input
                                    type="url"
                                    className={styles.linkInput}
                                    placeholder={`Ссылка #${i + 1}`}
                                    value={link}
                                    onChange={(e) => handleLinkChange(e.target.value, i)}
                                />
                                <button
                                    type="button"
                                    className={styles.removeLinkBtn}
                                    onClick={() => removeLink(i)}
                                    title="Удалить ссылку"
                                >
                                    🗑
                                </button>
                            </div>
                        ))}
                        <button type="button" className={styles.addBtn} onClick={addLink}>
                            ➕ Добавить ссылку
                        </button>

                        <label className={styles.label}>Ссылка на папку со скриншотами</label>
                        <input
                            type="url"
                            className={styles.input}
                            value={folderLink}
                            onChange={(e) => setFolderLink(e.target.value)}
                            placeholder="https://disk.yandex.ru/..."
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.block}>
            <div className={styles.header}>
                <h3 className={styles.title}>Критерий #{index + 1}</h3>
                <button onClick={onRemove} className={styles.removeBtn}>🗑</button>
            </div>

            <label className={styles.label}>Критерий рейтинга</label>
            <select
                className={styles.select}
                value={selectedCriterion}
                onChange={(e) => setSelectedCriterion(e.target.value)}
            >
                {ratingCriteria.map((criterion, i) => (
                    <option key={i} value={criterion}>
                        {criterion}
                    </option>
                ))}
            </select>

            {renderFields()}
        </div>
    );
};

export default EventBlock;
