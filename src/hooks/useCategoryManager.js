import { useState, useEffect } from "react";

export function useCategoryManager() {
  const [categories, setCategories] = useState(() => {
    const stored = localStorage.getItem("categories");
    return stored ? JSON.parse(stored) : ["Bahasa Indonesia", "Matematika", "IPA", "IPS", "Fiksi"];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (cat) => {
    if (!categories.includes(cat)) {
      setCategories([...categories, cat]);
    }
  };

  const updateCategory = (oldCat, newCat) => {
    setCategories(categories.map((cat) => (cat === oldCat ? newCat : cat)));
  };

  const deleteCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const refreshCategories = () => {
    const stored = localStorage.getItem("categories");
    if (stored) setCategories(JSON.parse(stored));
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshCategories,
  };
}
