import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { selectFilter } from "@/app/features/filter/FilterSelector";
import { useSelector } from "react-redux";
import { selectItems } from "@/app/features/items/itemsSelectors"
import { addSelectFilters , deleteSelectFilters , clearSelectFilters , setOrderPrice } from "@/app/features/selectedFilter/selectedFilterSlice" 
import { selectedFiltersG , selectHasFilters } from "@/app/features/selectedFilter/selectedFilterSelector"
import { useDispatch } from "react-redux";
import Select from "react-select"


type MoldeProps = {

onClose: () => void;
}

type optionsType = {

  value: number,
  label: string

}


export default function FilterBar( { onClose }: MoldeProps  ) {
  const [category, setCategory] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [talla, setTalla] = useState<boolean>(false);
  const [precio, setPrecio] = useState<boolean>(false);
  const totalProductos = useSelector(selectItems);
  const SelectedFilters = useSelector( selectedFiltersG )  ;
  const HadFilters = useSelector( selectHasFilters )  ;
  const dispatch = useDispatch();
  const [pmin,setPmin] = useState<string>("")
  const [pmax,setPmax] = useState<string>("")
  const Filtros = useSelector(selectFilter);



  const options = [
    { value: 0, label: '-' },
    { value: 1, label: 'Menor Precio' },
    { value: 2, label: 'Mayor Precio' },
  ]


  useEffect( ( ) => {   
  if( SelectedFilters.preciomin !== 0 ) { setPmin( SelectedFilters.preciomin.toString())   }
  if( SelectedFilters.preciomax !== 1000 ) { setPmax( SelectedFilters.preciomax.toString())   }
  },[SelectedFilters])
  
  const handerOrder = (seleted: optionsType | null) => {

    if(seleted) dispatch( setOrderPrice ( {valor: seleted?.value} ))
    onClose()
   

  }



  return (
    <div> 

      {HadFilters && <button 
      className= "p-2 mb-4 ml-auto bg-white text-black rounded"
      onClick={() => {dispatch( clearSelectFilters(), setPmin(""), setPmax("")); onClose()} }
      > Limpiar Filtros  
      
      
      </button> }


      <div className="flex flex-wrap justify-between mb-4 border-b-2 pb-2 mx-4">
        
        <div className="flex flex-warp gap-2 items-center justify-between mb-8 w-full text-l">
        <label>
            Ordenar precios:

               </label>
        <Select options={options}
          className="text-black ml-auto w-[200px]"
          placeholder="Ordenar por:"
          styles={{
                control: (baseStyles, state) => ({
                ...baseStyles,
                background: "#ffebf5", 
                color: "#ffebf5"
                }),
          }}
          defaultValue={SelectedFilters.orderPrice===null ? null : options[SelectedFilters.orderPrice]}
          onChange={ handerOrder} />

        
  

     </div>
        
        <div className="flex flex-wrap w-full items-center justify-between " onClick={() => setCategory(!category)}>
          <h1 className="font-bold text-xl mb-4">Categorias</h1>
          {category ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />} 
        </div>

     

        {category && (
          <div className="flex flex-col justify-start w-full mb-4">
            {Filtros.category.map((product) => (
              
              <label  key={product.name} htmlFor={product.name}>
              <div
               
                className="flex flex-wrap justify-between items-center p-2 pl-2 border-b-[1px] border-gray-400"
              >
                {product.name } ({product.cant})
                <input
                    id={product.name} 
                    name={product.name} 
                    type="checkbox" 
                    className="h-4 w-4"
                    checked={ SelectedFilters.category.includes ( product.name )  } 
                    onChange={e => {dispatch( e.target.checked ? addSelectFilters({category: product.name}) :  deleteSelectFilters ({name: "category", value: product.name}) , onClose() );  window.scrollTo(0, 0) }} />
              </div>
              </label>
            ))}
          </div>
        )}

        </div>

        
               
      <div className="flex flex-wrap justify-between mb-4 border-b-2 pb-2 mx-4">
        <div className="flex flex-wrap w-full items-center justify-between " onClick={() => setColor(!color)}>
          <h1 className="font-bold text-xl mb-4">Colores</h1>
          {color ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />} 
        </div>

        {color && (
          <div className="flex flex-col justify-start w-full mb-4 mt-4">
            {Filtros.color.map((product) => (
              <div
                key={product.name}
                className="flex flex-wrap justify-between items-center p-2 pl-2 border-b-[1px] border-gray-400"
              >
                
                {product.name} ({product.cant})
                <input 
                name={product.name}
                type="checkbox" 
                className="h-4 w-4" 
                checked={ SelectedFilters.color.includes ( product.name)  } 
                onChange={e => dispatch( e.target.checked ? addSelectFilters({color: product.name}) :  deleteSelectFilters ({name: "color", value: product.name})  ,onClose() )}/>
              </div>
            ))}
          </div>
        )}
      
    </div>


      <div className="flex flex-wrap justify-between mb-4 border-b-2 pb-2 mx-4">
        <div className="flex flex-wrap w-full items-center justify-between  " onClick={() => setTalla(!talla)}>
          <h1 className="font-bold text-xl mb-4">Tallas</h1>
          {talla ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />} 
        </div>

        {talla && (
          <div className="flex flex-col justify-start w-full mb-4 mt-4">
            {Filtros.talla.map((product) => (
              <div
                key={product.name}
                className="flex flex-wrap justify-between items-center p-2 pl-2 border-b-[1px] border-gray-400"
              >
                {product.name} ({product.cant})
                <input 
                name={product.name} 
                type="checkbox" 
                className="h-4 w-4" 
                checked={ SelectedFilters.talla.includes ( product.name )  } 
                onChange={e => dispatch( e.target.checked ? addSelectFilters({talla: product.name }) :  deleteSelectFilters ({name: "talla", value: product.name}) , onClose()  )}
                 />
              </div>
            ))}
          </div>
        )}
        </div>



      <div className="flex flex-wrap justify-between mb-4 border-b-2 pb-2 mx-4">
        <div className="flex flex-wrap w-full items-center justify-between  " onClick={() => setPrecio(!precio)}>
          <h1 className="font-bold text-xl mb-4">Precio</h1>
          {precio ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />} 
        </div>

        {precio && (
          <div className="flex flex-wrap justify-center gap-4 w-full mt-4">

           
           
                <div className="flex flex-wrap gap-2"><span>Min: </span>
                  <input type="text" value={pmin} onChange={e => setPmin(e.target.value)}  className="border-2 w-[60px] text-center"/>
                  <button onClick={ ()=> dispatch(addSelectFilters({preciomin: Number(pmin)})) }> ✔️​</button>
                </div>

                <div className="flex flex-wrap gap-2"><span>Max: </span>
                  <input type="text" value={pmax} onChange={e => setPmax(e.target.value)} className="border-2 w-[60px] text-center"/>
                  <button onClick={ ()=> dispatch(addSelectFilters({preciomax: Number(pmax)})) }> ✔️​</button>
                </div>
            
          
          </div>
        )}
        </div>



      <div className="bg-white text-black rounded p-4 flex flex-col items-center justify-center mt-20">   
        
        Total:  {totalProductos} 
        
    </div>


    </div>
  );
}
