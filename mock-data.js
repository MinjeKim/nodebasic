const request = async (url, method = 'GET', body) => {
  const options = {
    method, 
    // body: JSON.stringify(body),
    headers: { "Content-Type": "application/json; charset=utf-8" }
  };
  if (method === 'POST') 
    options.body = JSON.stringify(body);
  const response = await fetch(`http://localhost:5001${url}`, options);
  return await response.json();
}

const setEmps = async () => {
  const emps = await request('/emps');
  console.log('emps :>> ', emps);

  const $emps = document.getElementById('emps');
  console.log('$emps :>> ', $emps);
  emps.forEach(emp => {
    const $li = document.createElement('li');
    $li.innerHTML = emp;
  })
};

setEmps(); // 서버에서 Emps 결과를 화면에 li로 박아줄거임