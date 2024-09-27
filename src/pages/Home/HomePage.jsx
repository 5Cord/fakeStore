import React from 'react'
import cl from "../../App.module.css"
import ImageSlider from '../../widgets/ImageSlider'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Grid } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <ImageSlider />

      <div className={cl.container}>
        <Grid sx={{ marginBottom: "3%" }} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className={cl.containerBlockGrid}>
              <h2>Удобная доставка</h2>
              <p>Доставляем курьерами по Санкт-Петербургу и ЛО. Отправляем транспортной компанией по РФ и СНГ.</p>
              <img src="https://boiling-machine.ru/wp-content/uploads/about-image-5.webp" alt="car" />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={cl.containerBlockGrid}>
              <h2>Проекты для блогеров</h2>
              <p>Необычные ПК в кастомном корпусе. Создаем уникальные дизайнерские решения для лидеров мнений.</p>
              <img src="https://boiling-machine.ru/wp-content/uploads/about-image-6.webp" alt="pc machine" />
            </div>
          </Grid>
        </Grid>
        <div className={cl.baner}>
          <h2>Шоурум PC Store</h2>
          <p>Протестируйте вживую лучшие игровые места, мощные ПК и профессиональные мониторы.</p>
          <div className={cl.addressShowRooom}>
            <PlaceOutlinedIcon />
            Адрес шоурума<br></br>
            г. Москва, ул. Вавилова, д.5, к.3, 5 этаж, офис 501
          </div>
        </div>
      </div>
    </>
  )
}
