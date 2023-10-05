import { Disclosure } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCars, updateCars, selectCars } from "../feature/CarsSlice";
import { useEffect, useState } from "react";

export default function Nav() {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const data = useSelector(selectCars);
  const [products, setProducts] = useState(cars);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    if (searchQuery === 0) {
      setProducts(cars);
      return;
    }
    const filterBySearch = cars.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProducts(filterBySearch);
    dispatch(updateCars(filterBySearch));
  };
  useEffect(() => {
    if (searchQuery.length === 0) {
      dispatch(updateCars(data));
    }
  }, [searchQuery]);

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-blue-100 rounded-lg m-0 w-auto shadow-lg"
      >
        <>
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className=" flex justify-start items-center py-7 relative">
                  <input
                    className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-96 border rounded-full border-gray-300  outline-none"
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute right-3 z-10 cursor-pointer"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleSearchClick}
                  >
                    <path
                      d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                      stroke="#4B5563"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 21L15 15"
                      stroke="#4B5563"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="lg:flex">
                  <div className="m-10 flex space-x-4">
                    <select
                      id="Relevance"
                      class="bg-blue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>Relevance</option>
                    </select>
                    <select
                      id="allbrands"
                      class="bg-blue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected>All brands</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Disclosure>
    </>
  );
}
