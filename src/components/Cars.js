import "./Cars.css";
import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllCarsAsync,
  fetchCarsByFiltersAsync,
  selectAllCars,
  selectTotalCars,
  updatePage,
} from "../feature/CarsSlice";
import Pagination from "./Pagination";
import { ITEMS_PER_PAGE } from "../const/const";
import Nav from "./Nav";

export default function Cars() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const totalCars = useSelector(selectTotalCars);

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(updatePage(page));
    navigate(`/cars/${page}`);
  }, [page]);

  useEffect(() => {
    dispatch(fetchAllCarsAsync());
  }, []);

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchCarsByFiltersAsync({ pagination }));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(1);
  }, [totalCars]);
  return (
    <>
      <div className="container p-6 mr-0 ml-8">
        <Nav></Nav>
        <div className="flex flex-wrap -mx-1 lg:-mx-4 m-2 ">
          {cars.map((car) => (
            <div
              className="px-1 m-0 w-auto h-auto md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              key={car.id}
            >
              <article className="overflow-hidden rounded-lg shadow-lg bg-blue-100">
                <a>
                  <img
                    alt={car.title}
                    className="block h-80 w-full p-2 rounded-3xl"
                    src={car.image}
                  />
                </a>
                <header className="flex items-center justify-between leading-tight p-1 m-2">
                  <h1 className="text-lg">
                    <h4 className="no-underline text-black">{car.title}</h4>
                  </h1>
                  <p className="year text-sm font-semibold px-3 border-2 border-dashed border-blue-400 rounded-2xl text-gray-900">
                    {car.start_production}
                  </p>
                </header>
                <ul class="grid grid-cols-2 gap-4 p-1 m-2">
                  <li class="card-list-item flex text-blue-500 font-medium mr-2">
                    <ion-icon name="people-outline"></ion-icon>
                    <span class="card-item-text text-sm text-gray-900 ml-1">
                      4 People
                    </span>
                  </li>
                  <li class="card-list-item flex text-blue-500 font-medium mr-2">
                    <ion-icon name="nuclear-outline"></ion-icon>
                    <span class="card-item-text text-sm text-gray-950 ml-1">
                      {car.class}
                    </span>
                  </li>

                  <li class="card-list-item flex text-blue-500 font-medium mr-2">
                    <ion-icon name="speedometer-outline"></ion-icon>
                    <span class="card-item-text text-sm text-gray-900 ml-1">
                      {car.combination_mpg}km/1-litre
                    </span>
                  </li>

                  <li class="card-list-item flex text-blue-500 font-medium mr-2">
                    <ion-icon name="hardware-chip-outline"></ion-icon>
                    <span class="card-item-text text-sm text-gray-900 ml-1">
                      Automatic
                    </span>
                  </li>
                </ul>
                <hr></hr>
                <div className="flex justify-between items-center p-0">
                  <p className="card-price ml-4 text-sm text-gray-900 p-0">
                    <strong className="text-2xl">$440</strong> / month
                  </p>
                  <p className="flex justify-between items-center">
                    <button className="fav-btn bg-blue-200 pt-1 p-2 pb-0 rounded-2xl text-3xl text-blue-600">
                      <ion-icon name="heart-outline"></ion-icon>
                    </button>
                    <button className="btn text-white w-full bg-blue-400 rounded-2xl p-2 m-4 pb-3">
                      Rent now
                    </button>
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalCars={totalCars}
        ></Pagination>
      </div>
    </>
  );
}
