export async function wait(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
}

export async function fetchServer(body) {
  let response = await fetch(`${location.origin}/data`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  response = await response.json();
  return response;
}
