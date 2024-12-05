import React, { useEffect, useState } from 'react';
import cl from './ProductPage.module.css';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Chip from '@mui/material/Chip';
import data from '../../../db.json'; // Импортируем JSON-файл

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchFilter, setsearchFilter] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);

  useEffect(() => {
    // Загрузка данных из JSON-файла
    setProduct(data.catalog);
    setCart([]); // Если нужно стартовать с пустой корзины
  }, []);

  const addToCart = (p) => {
    const existingItem = cart.find(item => item.id === p.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      setCart(prevCart => prevCart.map(item => item.id === updatedItem.id ? updatedItem : item));
    } else {
      setCart(prevCart => [...prevCart, { ...p, quantity: 1 }]);
    }
  };

  const filterProduct = product.filter(n =>
    n.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
    (selectedTypes.length === 0 || selectedTypes.includes(n.typePc)) &&
    (selectedSeries.length === 0 || selectedSeries.includes(n.series))
  );

  const sortedData = () => {
    const sortedArray = [...product].sort((a, b) => {
      return isAscending
        ? parseInt(a.price) - parseInt(b.price)
        : parseInt(b.price) - parseInt(a.price);
    });
    setProduct(sortedArray);
    setIsAscending(!isAscending);
  };

  const groupBySeries = (products) => {
    return products.reduce((acc, product) => {
      const { series } = product;
      if (!acc[series]) {
        acc[series] = [];
      }
      acc[series].push(product);
      return acc;
    }, {});
  };

  const handleTypeChange = (event) => {
    setSelectedTypes(event.target.value);
  };

  const handleSeriesChange = (event) => {
    setSelectedSeries(event.target.value);
  };

  const groupedProducts = groupBySeries(filterProduct);

  return (
    <div className={cl.mainContainer}>
      <div className={cl.hContainer}>
        <h4>Комплектации</h4>
      </div>
      <div className={cl.fsBar}>
        <div className={cl.selectList}>
          <FormControl className={cl.selectTypePc}>
            <InputLabel id="select-label-types">Тип ПК</InputLabel>
            <Select
              labelId="select-label-types"
              multiple
              value={selectedTypes}
              onChange={handleTypeChange}
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Gaming">Gaming</MenuItem>
              <MenuItem value="Workstation">Workstation</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={cl.selectSeries}>
            <InputLabel id="select-label-series">Серия</InputLabel>
            <Select
              labelId="select-label-series"
              multiple
              value={selectedSeries}
              onChange={handleSeriesChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {Array.from(new Set(product.map(p => p.series))).map((series) => (
                <MenuItem key={series} value={series}>
                  {series}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <SwapVertIcon className={cl.sorted} onClick={sortedData} />
      </div>
      <div className={cl.selectedChips}>
        {selectedTypes.map((type) => (
          <Chip key={type} label={type} onDelete={() => setSelectedTypes(selectedTypes.filter(t => t !== type))} />
        ))}
        {selectedSeries.map((series) => (
          <Chip key={series} label={series} onDelete={() => setSelectedSeries(selectedSeries.filter(s => s !== series))} />
        ))}
      </div>
      {Object.keys(groupedProducts).map(series => (
        <div key={series} className={cl.seriesContainer}>
          <h1>{series}</h1>
          <div className={cl.productContainer}>
            {groupedProducts[series].map(el => (
              <div key={el.id} className={cl.productCard}>
                <Link to={`/products/${el.id}`}>
                  <div className={cl.imgCard}>
                    <img src={el.imageUrl} alt={el.title} className={cl.productImage} />
                  </div>
                  <div className={cl.downBlockCard}>
                    <div className={cl.productTitle}>{el.title}</div>
                    <div className={cl.blockContainer}>
                      <div className={cl.productPrice}>{el.price} Р</div>
                      <div className={cl.typePc}>{el.typePc}</div>
                    </div>
                    {el.CP && <div className={cl.productDetails}>Процессор: {el.CP}</div>}
                    {el.VP && <div className={cl.productDetails}>Видеокарта: {el.VP}</div>}
                    {el.RAM && <div className={cl.productDetails}>Оперативная память: {el.RAM}</div>}
                    {el.MatherBoard && <div className={cl.productDetails}>Материнская плата: {el.MatherBoard}</div>}
                    {el.SDD && <div className={cl.productDetails}>Накопитель: {el.SDD}</div>}
                    {el.powerBlock && <div className={cl.productDetails}>Блок питания: {el.powerBlock}</div>}
                    {el.Cooling && <div className={cl.productDetails}>Охлаждение: {el.Cooling}</div>}
                  </div>
                </Link>
                <Button
                  sx={{ width: '100%' }}
                  aria-label="add to shopping cart"
                  onClick={() => addToCart(el)}
                  variant="outlined"
                >
                  В корзину
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
