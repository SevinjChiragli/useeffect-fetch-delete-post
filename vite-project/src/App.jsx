import { useEffect, useState,useRef } from "react";
import "./App.css";

function App() {
  const [goods, setgoods] = useState([]);
  const productNameRef = useRef(null);
  const productDescriptionRef = useRef(null);
  const productPriceRef = useRef(null);

  useEffect(() => {
    async function getFetch() {
      try {
        let res = await fetch(`http://localhost:3000/goods`);
        let data = await res.json();
        setgoods(data);
      } catch (err) {
        console.log(err);
      }
    }
    getFetch();
  }, [goods]);

  const deleteProduct=(itemId)=>{
    const index=goods.findIndex((item)=>item.id===itemId)
    const newGoods=[...goods]
    newGoods.splice(index,1)
    setgoods(newGoods)
   }

  async function deleteFetch(id) {
    try {
      let res = await fetch(`http://localhost:3000/delete-admin/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        let data = await res.json();
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function addFetch() {
    try{
      const productName = productNameRef.current.value;
      const productDescription = productDescriptionRef.current.value;
      const productPrice = productPriceRef.current.value;
      let res=await fetch(`http://localhost:3000/add-admin`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
          product_name:productName,
          product_description:productDescription,
          product_price:productPrice
        })
      })
      if(res.ok){
        let data = await res.json()
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <ol>
        {goods.map((item) => {
          return (
            <li>
              <p>{item.product_name}</p>
              <p>{item.product_description}</p>
              <p>{item.product_price}</p>
              <p>{item.store_name}</p>
              <p>{item.store_address}</p>
              <div>
                <button onClick={() => deleteFetch(item.id)}>DELETE from back</button>
                <button onClick={()=>deleteProduct(item.id)}>УДАЛИТЬ с фронта</button>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="addNewProduct">
        <input type="text" name="product_name"   ref={productNameRef} />
        <input type="text" name="product_description"  ref={productDescriptionRef}  />
        <input type="text" name="product_price" ref={productPriceRef}/>
        <button onClick={addFetch}>ADD</button>
      </div>
    </>
  );
}

export default App;
