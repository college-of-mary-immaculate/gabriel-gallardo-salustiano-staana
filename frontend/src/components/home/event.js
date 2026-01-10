export default async function Events() {
  window.addEventListener("load", async function () {
    console.log('Home Page Event')
  });
  
  const socket = io();
  console.log(socket);
}
