export function fetchAllCars() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:9090/cars");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCarsByFilters(pagination) {
  // pagination = {_page:1,_limit=6}
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:9090/cars?" + queryString);
    const data = await response.json();
    const totalCars = await response.headers.get("X-Total-Count");
    resolve({ data: { cars: data, totalCars: +totalCars } });
  });
}
