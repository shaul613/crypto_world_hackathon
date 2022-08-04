
async function func(){
  const res = await fetch(`http/localhost:5000/home:id=1`);
  const data = await res.json();
  console.log(data);
}

func();
