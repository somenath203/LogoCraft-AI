import { useState } from "react";
import color_pallete_data from "../_data/color_pallete_data";
import pages_data from "../_data/pages_data";
import HeadingDescComponent from "./HeadingDescComponent";


const LogoColorPalette = ({ onHandleInputChange, allFormData }) => {


  const [ colorPalleteSelectedByUser, setColorPalleteSelectedByUser ] = useState(allFormData?.logocolorpalette);


  return (
    <div className="my-5">

      <HeadingDescComponent 
        title={pages_data.LogoColorPaletteTitle} 
        description={pages_data.LogoColorPaletteDesc}
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
      
        {color_pallete_data.map((pallete, index) => (

          <div key={index} className={`flex p-1 ${colorPalleteSelectedByUser === pallete.name && 'border-2 rounded-lg border-primary'}`}>

            {pallete.colors.map((color, index) => (

              <div 
                key={index} 
                className="h-24 w-full cursor-pointer" 
                style={{ backgroundColor: color }}
                onClick={() => {
                  setColorPalleteSelectedByUser(pallete.name);
                  onHandleInputChange(pallete.name)
                }}
              ></div>

            ))}

          </div>

        ))}
      </div>

    </div>
  )
}

export default LogoColorPalette;