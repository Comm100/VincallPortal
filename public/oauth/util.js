function getSearch() {
  var search = decodeURIComponent(location.href).split("?")[1] || "",
    searchList = search.split("&").map((item) => item.split("=")) || [],
    searchObject = searchList.reduce((pre, current) => {
      pre[current[0]] = current[1];
      return pre;
    }, {});
  return searchObject;
}

function onlogin(search) {
  localStorage.setItem("userName", search.userName);
  localStorage.setItem("userId", search.userId);
  localStorage.setItem("vincallRole", search.role);
  localStorage.setItem("userAccount", search.userAccount);
}

window.__server_url =
  location.host === "www.vincall.net"
    ? "https://api.vincall.net"
    : location.host === "wwwtest.vincall.net"
    ? "https://apitest.vincall.net"
    : "https://apivincall.comm100dev.io";
