const baseUrl = "http://localhost:4000/api";

export async function postData(url = "", data = {}) {
  try {
    const response = await fetch(baseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getData(url = "") {
  try {
    const response = await fetch(baseUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + window.localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
}
