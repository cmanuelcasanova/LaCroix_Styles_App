import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { selectFilter } from "@/app/features/filter/FilterSelector";
import { useSelector } from "react-redux";
import { COLOR_PALETTE } from "@/app/components/params"
import { selectItems } from "@/app/features/items/itemsSelectors"
import { addSelectFilters , deleteSelectFilters , clearSelectFilters } from "@/app/features/selectedFilter/selectedFilterSlice" 
import { selectedFiltersG } from "@/app/features/selectedFilter/selectedFilterSelector"

import { useDispatch } from "react-redux";


export default function FilterBar() {
  const [category, setCategory] = useState<boolean>(false);
  const [color, setColor] = useState<boolean>(false);
  const [talla, setTalla] = useState<boolean>(false);
  const [precio, setPrecio] = useState<boolean>(false);
  const [ applyFilter , setApplyFilter] = useState<boolean>(false)
   const totalProductos = useSelector(selectItems);
    const SelectedFilters = useSelector( selectedFiltersG )  ;
   const dispatch = useDispatch();
  

  const Filtros = useSelector(selectFilter);

  return (
    <div>

      {(SelectedFilters.category.length>0 || SelectedFilters.color.length>0 || SelectedFilters.talla.length>0) && <button 
      className= "p-2 mb-4 ml-auto bg-white text-black rounded"
      onClick={() => dispatch( clearSelectFilters()) }
      > Limpiar Filtros  
      
      
      </button> }


      <div className="flex flex-wrap justify-between mb-4 border-b-2 pb-2 mx-4">
        <div className="flex flex-wrap w-full items-center justify-between " onClick={() => setCategory(!category)}>
          <h1 className="font-bold text-xl mb-4">Categorias</h1>
          {category ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />} 
        </div>

        {category && (
          <div className="flex flex-col justify-start w-full mb-4">
            {Filtros.category.map((product) => (
              <div
                key={product.name}
                className="flex flex-wrap justify-between items-center p-2 pl-2 border-b-[1px] border-gray-400"
              >
                {product.name } ({product.cant})
                <input 
                    name={product.name} 
                    type="checkbox" 
                    className="h-4 w-4"
                    checked={ SelectedFilters.category.includes ( product.name )  } 
                    onChange={e => dispatch( e.target.checked ? addSelectFilters({category: product.name}) :  deleteSelectFilters ({name: "category", value: product.name})   )} />
              </div>
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
                onChange={e => dispatch( e.target.checked ? addSelectFilters({color: product.name}) :  deleteSelectFilters ({name: "color", value: product.name})   )}/>
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
                onChange={e => dispatch( e.target.checked ? addSelectFilters({talla: product.name }) :  deleteSelectFilters ({name: "talla", value: product.name})   )}
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

           
           
                <><span>Min: </span><input type="text" className="border-2 w-[70px]"/></>
                <><span>Max: </span><input type="text" className="border-2 w-[70px]"/></>
            
          
          </div>
        )}
        </div>



      <div className="bg-white text-black rounded p-4 flex flex-col items-center justify-center mt-20">   
        
        Total:  {totalProductos} 
        
    </div>


    </div>
  );
}
