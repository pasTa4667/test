import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import "./media/search.css";
import SideBar from './components/SideBar';
import { getProducts } from '../shared/api';
import { Product } from '../shared/definitions';
import ResultDisplay from './components/ResultDisplay';
import PopupForm from './components/PopupForm';
import OptionsPanel from './components/OptionsPanel';

export default function Search() {
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city') || 'Munich');
  const [time, setTime] = useState(searchParams.get("time") || '12:00');
  const [fromDate, setFromDate] = useState(new Date(searchParams.get("fromDate") || new Date()));
  const [toDate, setToDate] = useState(getValidToDate(searchParams.get("toDate")));
  const [priceMax, setPriceMax] = useState(() => {
    const savedMax = sessionStorage.getItem("priceMax");
    return savedMax ? Number(savedMax) : 100;
  });
  const [priceMin, setPriceMin] = useState(() => {
    const savedMin = sessionStorage.getItem("priceMin");
    return savedMin ? Number(savedMin) : 1;
  });
  const [tagsNotCheckedList, setTagsNotCheckedList] = useState<{ [key: string]: boolean }>(() => {
    const savedTags = sessionStorage.getItem('tagsCheckedList');
    return savedTags ? JSON.parse(savedTags) : {};
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productClicked, setProductClicked] = useState<Product | null>(null);

  useEffect(() => {
    sessionStorage.setItem("priceMax", priceMax.toString());
  }, [priceMax]);

  useEffect(() => {
    sessionStorage.setItem("priceMin", priceMin.toString());
  }, [priceMin]);

  useEffect(() => {
    sessionStorage.setItem("tagsCheckedList", JSON.stringify(tagsNotCheckedList));
  }, [tagsNotCheckedList]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((products) => {
        setProducts(products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching requested data");
        setIsLoading(false);
      });
  }, [city, time, fromDate, toDate]);

  const filteredProducts = useMemo(() => {
    if(isLoading) return [];
    return products.filter((product) => {
      return (
        product.price <= priceMax &&
        product.price >= priceMin && 
        product.tags.find((tag) => tagsNotCheckedList[tag] === false))
    });
  }, [priceMax, priceMin, tagsNotCheckedList, products]);

  function getValidToDate(date: string | null) {
    if (!date || (new Date(date) < fromDate)) return fromDate;
    return new Date(date);
  }

  function handleTagToggle(tag: string) {
    setTagsNotCheckedList((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }))
  }
  
  return (
    <div className="search-container">
      <div className="header"></div>
      <SideBar
        city={city}
        time={time}
        fromDate={fromDate}
        toDate={toDate}
        priceMax={priceMax}
        priceMin={priceMin}
        tagsNotCheckedList={tagsNotCheckedList}
        onTagToggle={handleTagToggle}
        onCityChange={setCity}
        onTimeChange={setTime}
        onFromDateChange={(newDate) => setFromDate(new Date(newDate))}
        onToDateChange={(newDate) => setToDate(new Date(newDate))}
        onPriceMaxChange={setPriceMax}
        onPriceMinChange={setPriceMin}
      />
      <OptionsPanel options={[priceMax, priceMin, tagsNotCheckedList]}/>
      <ResultDisplay isLoading={isLoading} products={filteredProducts} onProductClick={(index) => setProductClicked(filteredProducts[index])}/>
      <PopupForm product={productClicked} onClose={() => setProductClicked(null)}/>
    </div>
  );
}
