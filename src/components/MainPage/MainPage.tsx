"use client";

import React, { useEffect, useState } from "react";
import FormConst from "@/components/FormConst/FormConst";
import ArtSchoolsBlock from "@/components/ArtSchoolsBlock/ArtSchoolsBlock";
import AgeGroupsBlock from "@/components/AgeGroupsBlock/AgeGroupsBlock";
import ResultsBlock from "../ResultsBlock/ResultsBlock";
import styles from "@/styles/MainPage.module.css";
import { init, initData } from '@telegram-apps/sdk';


// Типы
interface ArtSchool {
  id: number;
  name: string;
  count: string;
}

interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  // Можно добавить еще поля, если нужно
}

interface AgeGroup {
  id: number;
  range: string;
  count: string;
}

interface FormDataFromApi {
  menCount: string;
  womenCount: string;
  artSchools: { name: string; count: string }[];
  ageGroups: { range: string; count: string }[];
}

export default function MainPage() {
  const [activeTab, setActiveTab] = useState<"calculation" | "results">("calculation");
  const [isLoading, setIsLoading] = useState(true);

  const [menCount, setMenCount] = useState("");
  const [womenCount, setWomenCount] = useState("");
  const [artSchools, setArtSchools] = useState<ArtSchool[]>([{ id: Date.now(), name: "", count: "" }]);
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>([{ id: Date.now(), range: "", count: "" }]);
  const [user, setUserData] = useState<User | undefined>(undefined);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const data: FormDataFromApi = await response.json();

          setMenCount(data.menCount || "");
          setWomenCount(data.womenCount || "");

          setArtSchools(
            data.artSchools?.length > 0
              ? data.artSchools.map((item) => ({
                  id: Date.now() + Math.random(),
                  name: item.name,
                  count: item.count,
                }))
              : [{ id: Date.now(), name: "", count: "" }]
          );

          setAgeGroups(
            data.ageGroups?.length > 0
              ? data.ageGroups.map((item) => ({
                  id: Date.now() + Math.random(),
                  range: item.range,
                  count: item.count,
                }))
              : [{ id: Date.now(), range: "", count: "" }]
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    init()
    initData.restore();
    let user_data = initData.user()
    setUserData(user_data)

    fetchData();
  }, []);

  const addArtSchool = () => {
    setArtSchools([...artSchools, { id: Date.now() + Math.random(), name: "", count: "" }]);
  };
  
  const addAgeGroup = () => {
    setAgeGroups([...ageGroups, { id: Date.now() + Math.random(), range: "", count: "" }]);
  };
  const handleArtSchoolChange = (id: number, field: keyof ArtSchool | string, value: string) => {
    setArtSchools(artSchools.map((school) => 
      school.id === id ? { ...school, [field as keyof ArtSchool]: value } : school
    ));
  };

  const handleAgeGroupChange = (id: number, field: keyof AgeGroup | string, value: string) => {
    setAgeGroups(ageGroups.map((group) => 
      group.id === id ? { ...group, [field as keyof AgeGroup]: value } : group
    ));
  };

  const removeArtSchool = (id: number) => {
    setArtSchools(artSchools.filter((school) => school.id !== id));
  };

  const removeAgeGroup = (id: number) => {
    setAgeGroups(ageGroups.filter((group) => group.id !== id));
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

  if (user !== undefined){
      if (user.id != 864146808){
          setIsLoading(true);
      }
    }

  return (
    <div className={styles.MainPage}>
      <nav className={styles.navbar}>
        <button className={`${styles.tabButton} ${activeTab === "calculation" ? styles.activeTab : ""}`} onClick={() => setActiveTab("calculation")}>
          Расчет
        </button>
        <button className={`${styles.tabButton} ${activeTab === "results" ? styles.activeTab : ""}`} onClick={() => setActiveTab("results")}>
          Результаты
        </button>
      </nav>

      {activeTab === "calculation" && (
        <>
          <FormConst menCount={menCount} womenCount={womenCount} setMenCount={setMenCount} setWomenCount={setWomenCount} />
          <ArtSchoolsBlock artSchools={artSchools} onAdd={addArtSchool} onChange={handleArtSchoolChange} onRemove={removeArtSchool} />
          <AgeGroupsBlock ageGroups={ageGroups} onAdd={addAgeGroup} onChange={handleAgeGroupChange} onRemove={removeAgeGroup} />

          <div className={styles.buttonRow}>
            <button type="button" className={styles.submitBtn} onClick={handleSubmit}>
              Рассчитать
            </button>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>
              Очистить форму
            </button>
          </div>
        </>
      )}

      {activeTab === "results" && <ResultsBlock />}
    </div>
  );
}