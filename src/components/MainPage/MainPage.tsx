"use client";

import React, { useEffect, useState } from "react";
import FormConst from "@/components/FormConst/FormConst";
import ArtSchoolsBlock from "@/components/ArtSchoolsBlock/ArtSchoolsBlock";
import AgeGroupsBlock from "@/components/AgeGroupsBlock/AgeGroupsBlock";
import ResultsBlock from "../ResultsBlock/ResultsBlock";
import styles from "@/styles/MainPage.module.css";

export default function MainPage() {
    const [activeTab, setActiveTab] = useState("calculation");
    const [isLoading, setIsLoading] = useState(true);

    const [menCount, setMenCount] = useState("");
    const [womenCount, setWomenCount] = useState("");
    const [artSchools, setArtSchools] = useState([{ id: Date.now(), name: "", count: "" }]);
    const [ageGroups, setAgeGroups] = useState([{ id: Date.now(), range: "", count: "" }]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/data");
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setMenCount(data.menCount || "");
                        setWomenCount(data.womenCount || "");
                        setArtSchools(data.artSchools?.length > 0 ? 
                            data.artSchools.map((item) => ({
                                id: Date.now() + Math.random(),
                                name: item.name,
                                count: item.count
                            })) 
                            : [{ id: Date.now(), name: "", count: "" }]
                        );
                        setAgeGroups(data.ageGroups?.length > 0 ?
                            data.ageGroups.map((item) => ({
                                id: Date.now() + Math.random(),
                                range: item.range,
                                count: item.count
                            }))
                            : [{ id: Date.now(), range: "", count: "" }]
                        );
                    }
                }
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const addArtSchool = () => {
        setArtSchools([...artSchools, { id: Date.now() + Math.random(), name: "", count: "" }]);
    };

    const addAgeGroup = () => {
        setAgeGroups([...ageGroups, { id: Date.now() + Math.random(), range: "", count: "" }]);
    };

    const handleArtSchoolChange = (id, field, value) => {
        setArtSchools(artSchools.map(school => school.id === id ? { ...school, [field]: value } : school));
    };

    const handleAgeGroupChange = (id, field, value) => {
        setAgeGroups(ageGroups.map(group => group.id === id ? { ...group, [field]: value } : group));
    };

    const removeArtSchool = (id) => {
        setArtSchools(artSchools.filter(school => school.id !== id));
    };

    const removeAgeGroup = (id) => {
        setAgeGroups(ageGroups.filter(group => group.id !== id));
    };

    const handleSubmit = async () => {
        const dataToSend = {
            menCount,
            womenCount,
            artSchools: artSchools.map(({ name, count }) => ({ name, count })),
            ageGroups: ageGroups.map(({ range, count }) => ({ range, count })),
        };

        try {
            const response = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                alert("Данные успешно сохранены");
            } else {
                alert("Ошибка при сохранении");
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Ошибка сети");
        }
    };

    const handleClear = () => {
        setMenCount("");
        setWomenCount("");
        setArtSchools([{ id: Date.now(), name: "", count: "" }]);
        setAgeGroups([{ id: Date.now(), range: "", count: "" }]);
    };

    if (isLoading) {
        return <div className={styles.loader}></div>;
    }

    return (
        <div className={styles.MainPage}>
            {/* NAVIGATION BAR */}
            <nav className={styles.navbar}>
                <button
                    className={`${styles.tabButton} ${activeTab === "calculation" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("calculation")}
                >
                    Расчет
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "results" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("results")}>
                    Результаты
                </button>
            </nav>

            {/* CONTENT */}
            {activeTab === "calculation" && (
                <>
                    <FormConst menCount={menCount} womenCount={womenCount} setMenCount={setMenCount} setWomenCount={setWomenCount} />
                    <ArtSchoolsBlock artSchools={artSchools} onAdd={addArtSchool} onChange={handleArtSchoolChange} onRemove={removeArtSchool} />
                    <AgeGroupsBlock ageGroups={ageGroups} onAdd={addAgeGroup} onChange={handleAgeGroupChange} onRemove={removeAgeGroup} />

                    <div className={styles.buttonRow}>
                        <button type="button" className={styles.submitBtn} onClick={handleSubmit}>Рассчитать</button>
                        <button type="button" className={styles.clearBtn} onClick={handleClear}>Очистить форму</button>
                    </div>
                </>
            )}

            {activeTab === "results" && (
                <ResultsBlock />
            )}
        </div>
    );
}