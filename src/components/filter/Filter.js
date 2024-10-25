import { useEffect, useRef, useState } from "react";
import { useData } from "../providers";
import styled from "styled-components";

export function Filter() {
  const filterRef = useRef();
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const { updateFilters } = useData();

  useEffect(() => {
    const clickOutside = (e) => {
      if (!filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.body.addEventListener("click", clickOutside);
    return () => document.body.removeEventListener("click", clickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleApplyFilters = () => {
    updateFilters(filters);
    setOpenFilter(false);
  };

  const handleRefreshFilters = () => {
    setFilters({
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    });
    updateFilters({});
    setOpenFilter(false);
  };

  const filterLabels = {
    name: "Имени",
    status: "Статусу",
    species: "Виду",
    type: "Типу",
    gender: "Полу",
  };

  const getSelectedFilters = () => {
    const selected = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        selected.push(`${filterLabels[key]}`);
      }
    }
    return selected.length > 0 ? selected.join(" ,") : "Нет выбранных фильтров";
  };

  return (
    <FilterContainer ref={filterRef}>
      <FilterLabel>
        <FilterText>Фильтрация по:</FilterText>
        <FilterSpan onClick={() => setOpenFilter(!openFilter)}>
          {getSelectedFilters()}
        </FilterSpan>
      </FilterLabel>
      {openFilter && (
        <FilterPopup>
          <FilterInput
            type="text"
            name="name"
            placeholder="Имя"
            onChange={handleChange}
          />
          <FilterInput
            type="text"
            name="status"
            placeholder="Статус"
            onChange={handleChange}
          />
          <FilterInput
            type="text"
            name="species"
            placeholder="Вид"
            onChange={handleChange}
          />
          <FilterInput
            type="text"
            name="type"
            placeholder="Тип"
            onChange={handleChange}
          />
          <FilterInput
            type="text"
            name="gender"
            placeholder="Пол"
            onChange={handleChange}
          />
          <ApplyButton onClick={handleApplyFilters}>
            Применить фильтры
          </ApplyButton>
          <RefreshButton onClick={handleRefreshFilters}>
            Сбросить фильтры
          </RefreshButton>
        </FilterPopup>
      )}
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  position: relative;
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
`;

const FilterText = styled.b`
  color: #fff;
  margin-right: 8px;
`;

const FilterSpan = styled.span`
  color: rgb(131, 191, 70);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  :hover {
    transform: translateY(-5px);
  }
`;

const FilterPopup = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  padding: 10px 0;
  background-color: rgb(38, 55, 80);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.09);
  border: 2px solid rgb(131, 191, 70);
  border-radius: 10px;
  overflow: hidden;
`;

const FilterInput = styled.input`
  display: block;
  padding: 5px 10px;
  margin: 0 10px;
  background-color: rgb(68, 59, 80);
  color: rgb(131, 191, 70);
  border-radius: 4px;
  ::placeholder {
    color: #bdbbc0;
  }
`;

const ApplyButton = styled.button`
  font-size: 14px;
  margin-top: 10px;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 8px;
  background-color: rgb(131, 191, 70);
`;

const RefreshButton = styled(ApplyButton)`
  background-color: #ff6666;
`;
